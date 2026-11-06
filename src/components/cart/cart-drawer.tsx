'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { CartItem } from './cart-item';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    getTotalCount,
    getSubtotal,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const totalCount = getTotalCount();
  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getTotal();
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0 bg-background">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <SheetTitle className="text-xl font-black uppercase tracking-tight">
              Your Bag ({totalCount})
            </SheetTitle>
          </div>
          <SheetDescription className="sr-only">
            Review your selected kicks before proceeding to checkout.
          </SheetDescription>

          {/* Free Shipping Meter */}
          {items.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Truck className="h-3.5 w-3.5" />
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-500 font-bold">
                      Unlocked Free Expedited Shipping!
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="text-foreground">
                        {formatCurrency(freeShippingThreshold - subtotal)}
                      </strong>{' '}
                      for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progressToFreeShipping)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 divide-y divide-border/60">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="h-20 w-20 rounded-full bg-muted/60 flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground stroke-1" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide">
                Your Bag is Empty
              </h3>
              <p className="text-sm text-muted-foreground max-w-[240px] mt-1 mb-6">
                Explore the latest deadstock sneakers and exclusive drops.
              </p>
              <Button
                variant="sneaker"
                onClick={closeCart}
                asChild
              >
                <Link href="/products">Browse Sneakers</Link>
              </Button>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItem key={item.variantId} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border/80 px-6 py-5 bg-card/50 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono text-foreground font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Shipping</span>
                <span className="font-mono text-foreground font-semibold">
                  {shipping === 0 ? (
                    <span className="text-emerald-500 uppercase text-xs font-bold">
                      Free
                    </span>
                  ) : (
                    formatCurrency(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black border-t border-border/60 pt-2 text-foreground">
                <span>Total</span>
                <span className="font-mono text-primary text-lg">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Button
                asChild
                className="w-full h-12 uppercase tracking-wider font-bold text-sm shadow-lg shadow-primary/20"
                onClick={closeCart}
              >
                <Link href="/checkout" className="flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full text-xs uppercase tracking-wider"
                onClick={closeCart}
              >
                <Link href="/cart">View Full Bag</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
