import Link from 'next/link';
import Image from 'next/image';
import { ProductWithVariants } from '@/types/database';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: ProductWithVariants;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryVariant = product.variants[0];
  const primaryImage =
    primaryVariant?.image_urls[0] ||
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80';

  const uniqueColors = Array.from(
    new Set(product.variants.map((v) => v.color))
  );

  const availableSizes = Array.from(
    new Set(
      product.variants
        .filter((v) => v.stock_quantity > 0)
        .map((v) => v.size)
    )
  );

  const hasStock = availableSizes.length > 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/60 hover:border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/40">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Brand & Stock Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <Badge variant="sneaker">
            {product.brand}
          </Badge>
          {!hasStock && (
            <Badge variant="destructive" className="text-[10px] uppercase font-bold tracking-wider">
              Sold Out
            </Badge>
          )}
        </div>

        {/* Colorway Count */}
        <div className="absolute bottom-3 right-3">
          <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-foreground font-semibold shadow-xs">
            {uniqueColors.length} {uniqueColors.length === 1 ? 'Color' : 'Colors'}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {product.category || 'Footwear'}
            </span>
          </div>

          <h3 className="font-bold text-base text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {primaryVariant?.color}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-muted-foreground block">
              Retail
            </span>
            <span className="text-base font-black text-foreground font-mono">
              {formatCurrency(product.base_price)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-muted-foreground font-mono">
              {hasStock ? `${availableSizes.length} sizes in stock` : 'Waitlist only'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
