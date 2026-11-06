'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active image when image set changes (e.g. user toggles colorway)
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const currentImage =
    images[activeIndex] ||
    images[0] ||
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
          {images.map((img, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-muted/30 transition-all duration-200',
                  isActive
                    ? 'border-primary ring-2 ring-primary/20 scale-95'
                    : 'border-transparent hover:border-border opacity-70 hover:opacity-100'
                )}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted/20 border border-border/80 shadow-inner">
        <Image
          src={currentImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Sneakerhead Verified Authenticity watermark */}
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border/60 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Verified Pair
        </div>
      </div>
    </div>
  );
}
