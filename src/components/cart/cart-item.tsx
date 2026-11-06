'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/database';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-border/60 last:border-0 group">
      {/* Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/40">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-xs uppercase font-mono tracking-widest text-muted-foreground">
                {item.brand}
              </p>
              <h4 className="text-sm font-bold text-foreground leading-snug line-clamp-1">
                {item.name}
              </h4>
            </div>
            <button
              onClick={() => removeItem(item.variantId)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <Badge variant="outline" className="text-[11px] px-2 py-0">
              {item.size}
            </Badge>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
              {item.color}
            </span>
          </div>
        </div>

        {/* Quantity Controls & Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-border rounded-lg bg-background shadow-xs">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors rounded-l-md disabled:opacity-40"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-semibold tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors rounded-r-md disabled:opacity-40"
              disabled={item.quantity >= item.maxStock}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-foreground font-mono">
              {formatCurrency(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-[11px] text-muted-foreground font-mono">
                {formatCurrency(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
