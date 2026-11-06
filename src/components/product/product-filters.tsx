'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Filter, X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BRANDS = ['All', 'Jordan', 'Nike', 'New Balance', 'Adidas'];
const CATEGORIES = ['All', 'Lifestyle', 'Retro', 'Running', 'Basketball'];
const SIZES = ['All', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get('brand') || 'All';
  const currentCategory = searchParams.get('category') || 'All';
  const currentSize = searchParams.get('size') || 'All';
  const currentSort = searchParams.get('sort') || 'newest';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'All' || !value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, val: string) => {
    const qs = createQueryString(key, val);
    router.push(`${pathname}?${qs}`, { scroll: false });
  };

  const hasActiveFilters =
    currentBrand !== 'All' || currentCategory !== 'All' || currentSize !== 'All';

  const resetFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="space-y-6 mb-8 rounded-2xl bg-card border border-border/80 p-5 shadow-xs">
      {/* Top Bar with Sort & Clear */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
          <Filter className="h-4 w-4 text-primary" />
          <span>Filter Footwear</span>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors font-semibold"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear All</span>
            </button>
          )}

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={currentSort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="text-xs bg-muted/60 border border-border rounded-lg px-2.5 py-1.5 font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="newest">Sort: Newest Drops</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Brands Filter */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase text-muted-foreground font-bold">
          Brand
        </span>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((brand) => {
            const isSelected = currentBrand === brand;
            return (
              <Button
                key={brand}
                type="button"
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className="text-xs rounded-full font-semibold"
                onClick={() => handleFilterChange('brand', brand)}
              >
                {brand}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase text-muted-foreground font-bold">
          Style / Category
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = currentCategory === category;
            return (
              <Button
                key={category}
                type="button"
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className="text-xs rounded-full font-semibold"
                onClick={() => handleFilterChange('category', category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase text-muted-foreground font-bold">
          Filter by Size (US)
        </span>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const isSelected = currentSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleFilterChange('size', size)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-foreground text-background font-bold border-foreground'
                    : 'bg-background hover:bg-muted border-border text-muted-foreground'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
