'use client';

import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductVariant } from '@/types/database';

interface SizeSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function SizeSelector({
  variants,
  selectedVariantId,
  onSelectVariant,
}: SizeSelectorProps) {
  // Sort sizes logically (numerical US sizes)
  const sortedVariants = [...variants].sort((a, b) => {
    const numA = parseFloat(a.size.replace(/[^0-9.]/g, '')) || 0;
    const numB = parseFloat(b.size.replace(/[^0-9.]/g, '')) || 0;
    return numA - numB;
  });

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  return (
    <div className="space-y-3">
      {/* Header & Size Guide */}
      <div className="flex items-center justify-between text-sm">
        <label className="font-bold uppercase tracking-wider text-xs text-foreground flex items-center gap-1.5">
          Select Size <span className="font-mono text-muted-foreground">(US Men)</span>
        </label>
        <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">
          Size Chart
        </span>
      </div>

      {/* Size Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {sortedVariants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isOutOfStock = variant.stock_quantity <= 0;
          const isLowStock = variant.stock_quantity > 0 && variant.stock_quantity <= 3;

          return (
            <button
              key={variant.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectVariant(variant)}
              className={cn(
                'relative flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-sm font-bold transition-all duration-200 select-none',
                // Out of stock styling
                isOutOfStock &&
                  'opacity-40 bg-muted/30 border-dashed border-border/80 cursor-not-allowed text-muted-foreground hover:bg-muted/30',
                // Available styling
                !isOutOfStock &&
                  !isSelected &&
                  'border-border hover:border-foreground/60 bg-background text-foreground hover:scale-[1.02]',
                // Selected styling
                isSelected &&
                  'border-primary bg-primary text-white shadow-md shadow-primary/25 scale-[1.03] ring-2 ring-primary/20'
              )}
            >
              {/* Size Label */}
              <span className="font-mono text-sm tracking-tight">{variant.size}</span>

              {/* Status subtext */}
              {isOutOfStock ? (
                <span className="text-[10px] uppercase font-mono font-normal tracking-tighter text-destructive mt-0.5">
                  Sold Out
                </span>
              ) : isLowStock ? (
                <span
                  className={cn(
                    'text-[9px] uppercase font-mono font-medium tracking-tighter mt-0.5',
                    isSelected ? 'text-white/90' : 'text-amber-500'
                  )}
                >
                  {variant.stock_quantity} left
                </span>
              ) : null}

              {/* Diagonal slash for sold out */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[120%] h-[1px] bg-muted-foreground/50 rotate-[-25deg]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Stock Feedback / Alert */}
      {selectedVariant && (
        <div className="pt-1">
          {selectedVariant.stock_quantity > 0 && selectedVariant.stock_quantity <= 3 ? (
            <div className="flex items-center gap-2 text-xs text-amber-500 font-semibold bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Only {selectedVariant.stock_quantity} pairs remaining in this size. Order soon!</span>
            </div>
          ) : selectedVariant.stock_quantity > 3 ? (
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
              <Check className="h-4 w-4 shrink-0" />
              <span>In Stock — Ready to ship within 24 hours</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-destructive font-semibold bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>This size is currently sold out.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
