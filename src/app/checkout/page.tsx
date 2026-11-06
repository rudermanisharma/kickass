'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShippingFee, getTotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getTotal();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate a mock or real order reference
      const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();

      // Store temporary order receipt in sessionStorage for success confirmation
      sessionStorage.setItem(
        'latest_order',
        JSON.stringify({
          orderId,
          items,
          total,
          shipping,
          subtotal,
          shippingDetails: formData,
          date: new Date().toISOString(),
        })
      );

      // Clear the Zustand cart
      clearCart();

      // Redirect to confirmation page
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight">
          Your bag is empty
        </h2>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Add pairs to your bag before checking out.
        </p>
        <Button asChild>
          <Link href="/products">Shop Kicks</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Bag
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground flex items-center gap-3">
          <Lock className="h-7 w-7 text-primary" /> Secure Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact & Shipping */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-mono">
                1
              </span>
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name
                </label>
                <Input
                  required
                  name="fullName"
                  placeholder="Michael Jordan"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </label>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="mj@chicago.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  required
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Street Address
                </label>
                <Input
                  required
                  name="address"
                  placeholder="1901 W Madison St"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  City
                </label>
                <Input
                  required
                  name="city"
                  placeholder="Chicago"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    State
                  </label>
                  <Input
                    required
                    name="state"
                    placeholder="IL"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    ZIP
                  </label>
                  <Input
                    required
                    name="postalCode"
                    placeholder="60612"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Payment Gateway Method (Stripe preparation) */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-mono">
                  2
                </span>
                Payment Method
              </h2>
              <span className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                <ShieldCheck className="h-4 w-4" /> 256-bit Encrypted
              </span>
            </div>

            <div className="border border-primary/40 bg-primary/5 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background border border-border text-foreground">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Direct Card Checkout (Stripe Enabled)
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Demo Mode: Simulated instant authorized capture
                  </p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Card Number
                </label>
                <Input placeholder="•••• •••• •••• 4242" defaultValue="4242 •••• •••• 4242" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Expires (MM/YY)
                </label>
                <Input placeholder="12/28" defaultValue="12/28" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  CVC / CVV
                </label>
                <Input placeholder="•••" defaultValue="888" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
              Order Breakdown
            </h2>

            {/* Items Mini List */}
            <div className="divide-y divide-border/60 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3 py-3 items-center">
                  <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-foreground">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {item.size}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground truncate">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Details */}
            <div className="border-t border-border/80 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-foreground">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-mono font-semibold text-foreground">
                  {shipping === 0 ? (
                    <span className="text-emerald-500 uppercase text-xs">Free</span>
                  ) : (
                    formatCurrency(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Authentication & Double Boxing</span>
                <span className="font-mono text-xs uppercase text-emerald-500 font-bold">
                  Included
                </span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between items-baseline text-lg font-black text-foreground">
                <span>Total Due</span>
                <span className="font-mono text-primary text-2xl">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full h-14 text-sm uppercase tracking-wider font-extrabold shadow-xl shadow-primary/25"
            >
              {isLoading ? (
                <span>Authorizing Order...</span>
              ) : (
                <span>Confirm & Pay {formatCurrency(total)}</span>
              )}
            </Button>

            <p className="text-[11px] text-center text-muted-foreground">
              By placing your order, you agree to our Terms of Sale and Authenticity Guarantee.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
