import { Suspense } from 'react';
import { ProductCard } from '@/components/product/product-card';
import { ProductFilters } from '@/components/product/product-filters';
import { ProductGridSkeleton } from '@/components/product/product-skeletons';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { ProductWithVariants } from '@/types/database';

interface ProductsPageProps {
  searchParams: {
    brand?: string;
    category?: string;
    size?: string;
    sort?: string;
  };
}

async function FilteredProductGrid({ searchParams }: ProductsPageProps) {
  // Simulate database fetching delay to demonstrate Suspense boundary
  await new Promise((resolve) => setTimeout(resolve, 150));

  let products: ProductWithVariants[] = [...MOCK_PRODUCTS];

  // Brand Filter
  if (searchParams.brand && searchParams.brand !== 'All') {
    products = products.filter(
      (p) => p.brand.toLowerCase() === searchParams.brand?.toLowerCase()
    );
  }

  // Category Filter
  if (searchParams.category && searchParams.category !== 'All') {
    products = products.filter(
      (p) => p.category?.toLowerCase() === searchParams.category?.toLowerCase()
    );
  }

  // Size Filter
  if (searchParams.size && searchParams.size !== 'All') {
    products = products.filter((p) =>
      p.variants.some(
        (v) => v.size === searchParams.size && v.stock_quantity > 0
      )
    );
  }

  // Sorting
  if (searchParams.sort === 'price_asc') {
    products.sort((a, b) => a.base_price - b.base_price);
  } else if (searchParams.sort === 'price_desc') {
    products.sort((a, b) => b.base_price - a.base_price);
  } else {
    // Default newest
    products.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24 rounded-3xl border border-dashed border-border bg-card/50">
        <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
          No Kicks Matched Your Search
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
          Try adjusting your brand, size, or style filters to explore available deadstock pairs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
          Footwear Collection
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Browse authentic high-performance and streetwear sneakers. Filter by your exact size and favorite label.
        </p>
      </div>

      <Suspense fallback={<div className="h-28 bg-muted/40 animate-pulse rounded-2xl" />}>
        <ProductFilters />
      </Suspense>

      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <FilteredProductGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
