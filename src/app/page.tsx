import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/product-card';
import { MOCK_PRODUCTS } from '@/data/mock-products';

export default function HomePage() {
  const featuredKicks = MOCK_PRODUCTS.slice(0, 3);
  const trendingKicks = MOCK_PRODUCTS.slice(3, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 text-white py-20 sm:py-28">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-widest text-primary">
                <Flame className="h-4 w-4 text-brand-orange animate-bounce" />
                <span>Spring 2025 Heat Check</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
                UNLOCKED FROM <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-300">
                  THE VAULT.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The world’s most coveted deadstock sneakers, authenticated by experts. Secure your grail before sizes disappear.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto h-14 px-8 text-sm uppercase tracking-wider font-extrabold shadow-lg shadow-primary/25"
                >
                  <Link href="/products" className="flex items-center gap-2">
                    Shop All Drops <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto h-14 px-8 text-sm uppercase tracking-wider font-bold border-white/20 text-white hover:bg-white/10"
                >
                  <Link href="/products?brand=Jordan">Air Jordan Grails</Link>
                </Button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 font-mono">
                <div>
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-neutral-400 uppercase">Verified Real</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">48hr</p>
                  <p className="text-xs text-neutral-400 uppercase">Dispatch</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">25k+</p>
                  <p className="text-xs text-neutral-400 uppercase">Sneakerheads</p>
                </div>
              </div>
            </div>

            {/* Hero Shoe Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
                  alt="Air Jordan 1 Lost & Found"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-primary font-bold">
                      Drop of the Week
                    </span>
                    <p className="text-sm font-black uppercase text-white">
                      Air Jordan 1 Chicago
                    </p>
                  </div>
                  <Badge variant="default" className="text-xs font-mono font-bold">
                    $210.00
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drops Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Handpicked Rotation</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
              Featured Releases
            </h2>
          </div>

          <Button variant="ghost" asChild className="group text-xs uppercase font-bold tracking-wider">
            <Link href="/products" className="flex items-center gap-1.5">
              View All 20+ Models <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredKicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Spotlight */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 overflow-hidden relative">
          <div className="relative z-10 max-w-xl space-y-4">
            <Badge variant="outline" className="border-white/30 text-white font-mono text-xs">
              Brand Archive
            </Badge>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Curated by the Biggest Names in the Game
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              From hardwood legends to futuristic chunky silhouettes, find your signature aesthetic.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="outline" size="sm" asChild className="rounded-full border-white/20 text-white hover:bg-white/10">
                <Link href="/products?brand=Jordan">Air Jordan</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="rounded-full border-white/20 text-white hover:bg-white/10">
                <Link href="/products?brand=Nike">Nike Dunk</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="rounded-full border-white/20 text-white hover:bg-white/10">
                <Link href="/products?brand=New+Balance">New Balance 9060</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="rounded-full border-white/20 text-white hover:bg-white/10">
                <Link href="/products?brand=Adidas">Yeezy & Originals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Rotation */}
      <section className="container mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold mb-1">
          <TrendingUp className="h-4 w-4" />
          <span>Streetwear Favorites</span>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-foreground mb-8">
          Trending Silhouette Drops
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trendingKicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
