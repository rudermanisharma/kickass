import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getProductBySlug, MOCK_PRODUCTS } from '@/data/mock-products';
import { PDPClient } from '@/components/product/pdp-client';
import { ProductCard } from '@/components/product/product-card';
import { ProductDetailSkeleton } from '@/components/product/product-skeletons';

interface PDPPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PDPPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Sneaker Not Found | VAULT.KICKS',
    };
  }

  return {
    title: `${product.name} | VAULT.KICKS`,
    description: product.description || `Buy 100% verified authentic ${product.name} at VAULT.KICKS.`,
  };
}

export default function ProductDetailPage({ params }: PDPPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Related sneakers from same brand or category
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
  ).slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <PDPClient product={product} />
      </Suspense>

      {/* Related Drops */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-border/80">
          <div className="space-y-1 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Related Rotation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              You Might Also Like
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
