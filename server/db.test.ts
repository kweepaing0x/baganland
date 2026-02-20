import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";
import { getDb } from "./db";

describe("Database Queries", () => {
  let database: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    database = await getDb();
  });

  describe("Products", () => {
    it("should retrieve all active products", async () => {
      const products = await db.getAllProducts();
      expect(Array.isArray(products)).toBe(true);
    });

    it("should retrieve a product by ID", async () => {
      // This test assumes at least one product exists
      // In a real scenario, you'd create a test product first
      const product = await db.getProductById(1);
      if (product) {
        expect(product.id).toBe(1);
        expect(product.name).toBeDefined();
      }
    });

    it("should retrieve products by category", async () => {
      const products = await db.getProductsByCategory("Baskets");
      expect(Array.isArray(products)).toBe(true);
    });

    it("should create a product", async () => {
      const newProduct = {
        name: "Test Bamboo Basket",
        description: "A test product",
        price: 2999, // $29.99
        category: "Baskets",
        stock: 10,
        sku: `TEST-${Date.now()}`,
        isActive: 1,
      };

      const result = await db.createProduct(newProduct);
      expect(result).toBeDefined();
    });

    it("should update a product", async () => {
      // This test assumes a product exists
      const result = await db.updateProduct(1, { stock: 5 });
      expect(result).toBeDefined();
    });
  });

  describe("Orders", () => {
    it("should retrieve user orders", async () => {
      const orders = await db.getUserOrders(1);
      expect(Array.isArray(orders)).toBe(true);
    });

    it("should retrieve an order by ID", async () => {
      const order = await db.getOrderById(1);
      if (order) {
        expect(order.id).toBe(1);
        expect(order.userId).toBeDefined();
      }
    });

    it("should create an order", async () => {
      const newOrder = {
        userId: 1,
        status: "pending" as const,
        totalAmount: 5999, // $59.99
        customerEmail: "test@example.com",
        customerPhone: "+66943329162",
        shippingAddress: "123 Test St",
        shippingCity: "Bagan",
        shippingCountry: "Myanmar",
        shippingZip: "12345",
      };

      const result = await db.createOrder(newOrder);
      expect(result).toBeDefined();
    });

    it("should update an order", async () => {
      const result = await db.updateOrder(1, { status: "confirmed" });
      expect(result).toBeDefined();
    });
  });

  describe("Order Items", () => {
    it("should retrieve order items", async () => {
      const items = await db.getOrderItems(1);
      expect(Array.isArray(items)).toBe(true);
    });

    it("should create an order item", async () => {
      const newItem = {
        orderId: 1,
        productId: 1,
        quantity: 2,
        unitPrice: 2999,
        subtotal: 5998,
      };

      const result = await db.createOrderItem(newItem);
      expect(result).toBeDefined();
    });
  });
});
