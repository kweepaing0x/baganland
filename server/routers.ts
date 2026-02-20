import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(async () => {
      return db.getAllProducts();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return db.getProductById(input);
    }),
    getByCategory: publicProcedure.input(z.string()).query(async ({ input }) => {
      return db.getProductsByCategory(input);
    }),
  }),

  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserOrders(ctx.user.id);
    }),
    getById: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      const order = await db.getOrderById(input);
      // Verify user owns this order or is admin
      if (order && order.userId !== ctx.user.id && ctx.user.role !== 'admin') {
        throw new Error("Unauthorized");
      }
      return order;
    }),
  })
});

export type AppRouter = typeof appRouter;
