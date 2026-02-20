import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Leaf, Hammer, Truck, RotateCcw, CreditCard, Shield } from "lucide-react";

/**
 * BaganLand Home Page
 * Design Philosophy: Warm Artisan Minimalism
 * - Warm, earthy color palette (cream, forest green, burnt sienna, soft gold)
 * - Asymmetric, breathing layouts with organic composition
 * - Handcrafted typography (Playfair Display for headings, Inter for body)
 * - Subtle, organic dividers and textures
 * - Gentle, meaningful interactions
 */

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-2xl font-bold text-primary">BaganLand</h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Why Us</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            <a href="/products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="/orders" className="text-foreground hover:text-primary transition-colors">Orders</a>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button size="sm" variant="outline" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button size="sm" className="bg-primary hover:bg-primary/90">Sign In</Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Handcrafted Bamboo, <span className="text-primary">Naturally Pure</span>
                </h2>
                <p style={{ fontFamily: 'var(--font-family-accent)' }} className="text-lg text-muted-foreground">
                  We export 100% organic, handmade, and eco-friendly bamboo products to the international market. Healthy for you, healthy for the planet.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explore Products
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Learn More
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <p className="text-sm text-muted-foreground">Organic</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Handmade</div>
                  <p className="text-sm text-muted-foreground">Artisan Crafted</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Global</div>
                  <p className="text-sm text-muted-foreground">Worldwide Shipping</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/pis4GVnm9qAFKJtcfMkBeD/sandbox/YkbJsLj3ttiK9dPY3xDVaz-img-1_1771467471000_na1fn_aGVyby1iYW1ib28tbGFuZHNjYXBl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcGlzNEdWbm05cUFGS0p0Y2ZNa0JlRC9zYW5kYm94L1lrYkpzTGozdHRpSzlkUFkzeERWYXotaW1nLTFfMTc3MTQ2NzQ3MTAwMF9uYTFmbl9hR1Z5YnkxaVlXMWliMjh0YkdGdVpITmpZWEJsLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fFcbghRcCf6PWMoirwyQzOcjpNQo2dDx0G9fBcTt1AZl1DidXEeSgBC-zvmBz9NfXr9DnMMtuyFrB3J6X25fOOmRNCTWDZhK2NQsjoFLqOV5dKkj0cMruiqOlMCiMZOYJGIG8nsszNTuRsF3tmy1GuEp0x1~oO6eV646yRhbl6gcgEXcIs3m9r27ZGKrR87qUUJnbuu5aM8ylkVbKX0zIGsb3xjAjaOGdHgGz-Z9dtjh9uRBUq8yHPRtB9K7vWr7dlEa8P7Kjj1RTyZXnsbu0pHbilqMcYDE0Ny4tOkFM80sr4BmwnjVFPuB-p-AfvgGDQak69Tsakv52dVaJ~lLKQ__"
                alt="Bamboo Grove"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/30 rounded-lg blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic SVG Divider */}
      <svg className="w-full h-24 text-background fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" opacity="0.1"></path>
      </svg>

      {/* Why Choose Us Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-4xl font-bold mb-4">Why Choose BaganLand</h2>
            <p style={{ fontFamily: 'var(--font-family-accent)' }} className="text-muted-foreground max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern sustainability practices to deliver the finest bamboo products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }}>100% Organic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our bamboo products are made from sustainably harvested, certified organic bamboo with no harmful chemicals or treatments.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Hammer className="w-6 h-6 text-primary" />
                </div>
                <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }}>100% Handmade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each piece is carefully crafted by skilled artisans using traditional techniques, ensuring unique quality and character.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }}>Global Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ship worldwide with reliable logistics partners, ensuring your products arrive safely and on time.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <RotateCcw className="w-6 h-6 text-primary" />
                </div>
                <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }}>100% Refund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Not satisfied? We offer a full refund guarantee. Your satisfaction is our priority.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }}>Multiple Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept PayPal, USDT (crypto), and Stripe for your convenience and security.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }}>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our packaging is 100% recyclable and biodegradable, supporting a healthier planet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/pis4GVnm9qAFKJtcfMkBeD/sandbox/YkbJsLj3ttiK9dPY3xDVaz-img-2_1771467469000_na1fn_aGVyby1iYW1ib28tY3JhZnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcGlzNEdWbm05cUFGS0p0Y2ZNa0JlRC9zYW5kYm94L1lrYkpzTGozdHRpSzlkUFkzeERWYXotaW1nLTJfMTc3MTQ2NzQ2OTAwMF9uYTFmbl9hR1Z5YnkxaVlXMWliMjh0WTNKaFpuUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gKznlZG3ncYHfj3RIMLTM6BzDPheQNGaxidShhOiHhhewc166LPinS-f~i4bXybrqZXELhpoZKpFm4Boz2GehohPgOnA6epObKUfDE2Z9~vsj6-Qxa59jSjuypiZGB5-KpAoN389ZtGFjBdGnTNVN-OLO--53GPFRzgiefASIdELVTXHuJ2ymG4UVJqe7sEMnb2eqpnCfkwiqsafh0FAV8t~OXLV4a4CFC4OaOPiVfzDxGsDYa4dgwCPHPIILNlb2IhBhDPIG9y6NQBNxQZtQFhTMitWeQQ3HFH1cDwWHn1i3DiwvPoiCvvsG3E8znzo71YZUqDPLpt96q2Yjl~6XA__"
                alt="Handmade Bamboo Crafts"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 style={{ fontFamily: 'var(--font-family-accent)' }} className="text-sm text-primary uppercase tracking-wider mb-2">Our Craft</h3>
                <h2 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-4xl font-bold mb-4">Artisanal Excellence</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Every product from BaganLand is a testament to the skill and dedication of our artisan craftspeople. We honor traditional Southeast Asian bamboo-working techniques while maintaining the highest standards of quality and sustainability.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Sustainable Sourcing</h4>
                    <p className="text-sm text-muted-foreground">Bamboo harvested from certified sustainable forests</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Traditional Methods</h4>
                    <p className="text-sm text-muted-foreground">Time-honored craftsmanship passed down through generations</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Fair Trade Practices</h4>
                    <p className="text-sm text-muted-foreground">Supporting artisan communities and fair wages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-4xl font-bold text-center mb-16">Get In Touch</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                      <a href="https://wa.me/66943329162" className="text-primary hover:underline">
                        +66 94 332 9162
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <a href="mailto:info@baganland.com" className="text-primary hover:underline">
                        info@baganland.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Location</h4>
                      <p className="text-muted-foreground">Bagan, Myanmar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-family-serif)' }} className="text-2xl font-bold mb-6">Payment Methods</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-border">
                    <CardContent className="pt-6 text-center">
                      <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-sm">PayPal</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="pt-6 text-center">
                      <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-sm">USDT (Crypto)</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border col-span-2">
                    <CardContent className="pt-6 text-center">
                      <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-sm">Stripe</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Shipping Info */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle style={{ fontFamily: 'var(--font-family-serif)' }} className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping & Returns
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><span className="font-semibold">Shipping:</span> We ship globally with reliable logistics partners</p>
                  <p><span className="font-semibold">Refund Policy:</span> 100% refund guarantee if you're not satisfied</p>
                  <p><span className="font-semibold">Eco-Friendly:</span> 100% recyclable and biodegradable packaging</p>
                </CardContent>
              </Card>
            </div>

            {/* Embedded Map */}
            <div className="rounded-lg overflow-hidden shadow-lg h-full min-h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d19035.571312363412!2d94.92668243100816!3d20.95648389184796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDU3JzAyLjYiTiA5NMKwNTUnMjQuOCJF!5e1!3m2!1sen!2sth!4v1771467218507!5m2!1sen!2sth" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-primary" />
                <span style={{ fontFamily: 'var(--font-family-serif)' }} className="font-bold text-primary">BaganLand</span>
              </div>
              <p className="text-sm text-muted-foreground">
                100% organic, handmade bamboo products for a sustainable future.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-serif)' }}>Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Why Us</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-serif)' }}>Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-serif)' }}>Follow Us</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 BaganLand. All rights reserved. Handcrafted with care for a sustainable planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
