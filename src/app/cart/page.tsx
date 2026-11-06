'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/cart/cart-item';

export default function CartPage() {
  const { items, getSubtotal, getShippingFee, getTotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground stroke-1" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto mb-8">
          You haven&apos;t added any deadstock kicks to your bag yet. Check out the latest releases.
        </p>
        <Button size="lg" asChild className="uppercase tracking-wider font-bold">
          <Link href="/products">Explore Footwear</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
          Shopping Bag ({items.length})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-muted-foreground hover:text-destructive font-semibold uppercase tracking-wider"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Item List */}
        <div className="lg:col-span-7 divide-y divide-border/60 rounded-2xl border border-border/80 bg-card p-6">
          {items.map((item) => (
            <CartItem key={item.variantId} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 rounded-2xl border border-border/80 bg-card p-6 space-y-6">
          <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Items Subtotal</span>
              <span className="font-mono font-bold text-foreground">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Shipping</span>
              <span className="font-mono font-bold text-foreground">
                {shipping === 0 ? (
                  <span className="text-emerald-500 uppercase text-xs">Free</span>
                ) : (
                  formatCurrency(shipping)
                )}
              </span>
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Sales Tax</span>
              <span className="font-mono font-bold text-foreground">
                Calculated at checkout
              </span>
            </div>

            <div className="border-t border-border/80 pt-4 flex justify-between items-baseline text-lg font-black text-foreground">
              <span>Estimated Total</span>
              <span className="font-mono text-primary text-2xl">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            asChild
            className="w-full h-14 text-sm uppercase tracking-wider font-extrabold shadow-xl shadow-primary/25"
          >
            <Link href="/checkout" className="flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <div className="pt-4 border-t border-border/60 space-y-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Guaranteed Authentic Sneakers
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Double-boxed premium shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
