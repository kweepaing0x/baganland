import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, ShoppingCart, Heart } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Map<number, number>>(new Map());

  // Fetch all products
  const { data: allProducts, isLoading } = trpc.products.list.useQuery();

  // Filter products based on category and search
  const filteredProducts = allProducts?.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  // Get unique categories
  const categories = Array.from(new Set(allProducts?.map((p) => p.category).filter(Boolean) || []));

  const handleAddToCart = (productId: number) => {
    const newCart = new Map(cart);
    newCart.set(productId, (newCart.get(productId) || 0) + 1);
    setCart(newCart);
  };

  const cartTotal = Array.from(cart.entries()).reduce((total, [productId, quantity]) => {
    const product = allProducts?.find((p) => p.id === productId);
    return total + (product?.price || 0) * quantity;
  }, 0);

  const cartItemCount = Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <h1 style={{ fontFamily: "var(--font-family-serif)" }} className="text-2xl font-bold text-primary">
            BaganLand Products
          </h1>
          <Button variant="outline" className="relative">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cartItemCount})
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Search */}
              <div>
                <h3 style={{ fontFamily: "var(--font-family-serif)" }} className="font-semibold mb-3">
                  Search
                </h3>
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 style={{ fontFamily: "var(--font-family-serif)" }} className="font-semibold mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Products
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              {cartItemCount > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 style={{ fontFamily: "var(--font-family-serif)" }} className="font-semibold mb-2">
                    Cart Summary
                  </h4>
                  <div className="text-sm text-muted-foreground mb-3">
                    <p>Items: {cartItemCount}</p>
                    <p className="font-semibold text-foreground mt-1">
                      Total: ${(cartTotal / 100).toFixed(2)}
                    </p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found</p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle style={{ fontFamily: "var(--font-family-serif)" }} className="text-lg">
                        {product.name}
                      </CardTitle>
                      {product.category && (
                        <CardDescription className="text-xs">{product.category}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            ${(product.price / 100).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Stock: {product.stock}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
