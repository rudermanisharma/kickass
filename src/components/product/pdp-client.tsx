'use client';

import { useState } from 'react';
import { ProductWithVariants, ProductVariant } from '@/types/database';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import { ImageGallery } from './image-gallery';
import { SizeSelector } from './size-selector';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap, Check } from 'lucide-react';

interface PDPClientProps {
  product: ProductWithVariants;
}

export function PDPClient({ product }: PDPClientProps) {
  const { addItem } = useCartStore();

  // Find unique colorways
  const colorways = Array.from(
    new Set(product.variants.map((v) => v.color))
  );

  // Active colorway state
  const [selectedColor, setSelectedColor] = useState<string>(
    colorways[0] || ''
  );

  // Filter variants for selected color
  const colorVariants = product.variants.filter(
    (v) => v.color === selectedColor
  );

  // Currently selected size variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () => {
      // Default to first in-stock variant of this colorway
      return colorVariants.find((v) => v.stock_quantity > 0) || colorVariants[0] || null;
    }
  );

  // Handle colorway change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const newColorVariants = product.variants.filter((v) => v.color === color);
    const firstInStock =
      newColorVariants.find((v) => v.stock_quantity > 0) ||
      newColorVariants[0] ||
      null;
    setSelectedVariant(firstInStock);
  };

  // Image list for current colorway
  const currentImages = selectedVariant?.image_urls?.length
    ? selectedVariant.image_urls
    : colorVariants[0]?.image_urls || [];

  // Price calculation
  const currentPrice = selectedVariant?.price_override ?? product.base_price;
  const isOutOfStock = !selectedVariant || selectedVariant.stock_quantity <= 0;

  // Add to cart state
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem(
      {
        variantId: selectedVariant.id,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        size: selectedVariant.size,
        color: selectedVariant.color,
        sku: selectedVariant.sku,
        price: currentPrice,
        image: currentImages[0] || '',
        maxStock: selectedVariant.stock_quantity,
      },
      1
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
      {/* Left Stage: Gallery */}
      <div className="lg:col-span-7">
        <ImageGallery images={currentImages} productName={product.name} />
      </div>

      {/* Right Stage: PDP Specs & Action */}
      <div className="lg:col-span-5 space-y-6">
        {/* Brand & Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="sneaker">{product.brand}</Badge>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground leading-none">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-2xl font-black font-mono text-foreground">
              {formatCurrency(currentPrice)}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Tax included • Free Shipping available
            </span>
          </div>
        </div>

        {/* Colorway Selection */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Colorway: <span className="text-foreground font-black">{selectedColor}</span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {colorways.map((color) => {
              const variantSample = product.variants.find((v) => v.color === color);
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-foreground bg-foreground text-background shadow-sm'
                      : 'border-border bg-background hover:bg-muted text-foreground'
                  }`}
                >
                  {variantSample?.color_hex && (
                    <span
                      className="h-3 w-3 rounded-full border border-black/20"
                      style={{ backgroundColor: variantSample.color_hex }}
                    />
                  )}
                  <span>{color}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Size Selector */}
        <div className="pt-2">
          <SizeSelector
            variants={colorVariants}
            selectedVariantId={selectedVariant?.id || null}
            onSelectVariant={(v) => setSelectedVariant(v)}
          />
        </div>

        {/* Action Button */}
        <div className="space-y-3 pt-4">
          <Button
            size="lg"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`w-full h-14 text-sm uppercase tracking-wider font-extrabold shadow-xl transition-all ${
              isOutOfStock
                ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
                : isAdded
                ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-white shadow-primary/25'
            }`}
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : isAdded ? (
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5" /> Added to Bag
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Add to Bag
              </span>
            )}
          </Button>

          {/* Instant Checkout Button */}
          {!isOutOfStock && (
            <Button
              variant="sneaker"
              size="lg"
              onClick={handleAddToCart}
              className="w-full h-12 text-xs"
            >
              <Zap className="h-4 w-4 mr-1.5 fill-current" /> Instant Checkout
            </Button>
          )}
        </div>

        {/* Guarantees Box */}
        <div className="rounded-2xl border border-border/70 bg-card p-4 space-y-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>
              <strong className="text-foreground">Authentication Guaranteed:</strong> Inspected by our specialist team.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-4 w-4 text-primary shrink-0" />
            <span>
              <strong className="text-foreground">Express Dispatch:</strong> Dispatched in protective double-box packaging.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>
              <strong className="text-foreground">Free 14-Day Returns</strong> on unworn pairs with security tags.
            </span>
          </div>
        </div>

        {/* SKU & Description */}
        <div className="space-y-3 pt-2 border-t border-border/60">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>SKU: {selectedVariant?.sku || 'N/A'}</span>
            <span>Style: {product.category || 'Athletic'}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
