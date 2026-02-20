import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Orders() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  // Fetch user orders
  const { data: orders, isLoading } = trpc.orders.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 style={{ fontFamily: "var(--font-family-serif)" }} className="text-2xl font-bold mb-2">
              Sign In to View Orders
            </h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your order history and track your purchases.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <h1 style={{ fontFamily: "var(--font-family-serif)" }} className="text-2xl font-bold text-primary">
            My Orders
          </h1>
        </div>
      </header>

      <div className="container py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 style={{ fontFamily: "var(--font-family-serif)" }} className="text-xl font-bold mb-2">
              No Orders Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate("/products")}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle style={{ fontFamily: "var(--font-family-serif)" }}>
                        Order #{order.id}
                      </CardTitle>
                      <CardDescription>
                        Placed on {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Order Total</p>
                      <p className="text-xl font-bold text-primary">
                        ${(order.totalAmount / 100).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shipping Address</p>
                      <p className="text-sm">
                        {order.shippingCity}, {order.shippingCountry}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contact Email</p>
                      <p className="text-sm">{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contact Phone</p>
                      <p className="text-sm">{order.customerPhone}</p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Track Shipment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
