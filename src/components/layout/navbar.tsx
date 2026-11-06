'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, ShieldCheck, Flame } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { toggleCart, getTotalCount } = useCartStore();
  const totalCount = getTotalCount();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white text-[11px] font-mono tracking-wider py-1.5 px-4 text-center flex items-center justify-center gap-4 uppercase">
        <span className="flex items-center gap-1.5 text-brand-volt">
          <Flame className="h-3.5 w-3.5 animate-pulse" />
          Limited Drops: Spring 2025 Edition
        </span>
        <span className="hidden sm:inline text-neutral-400">|</span>
        <span className="hidden sm:flex items-center gap-1 text-neutral-300">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          100% Verified Authentic Sneakers
        </span>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black tracking-tighter text-lg shadow-sm group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="text-xl font-black uppercase tracking-tighter text-foreground">
              VAULT<span className="text-primary">.KICKS</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              All Drops
            </Link>
            <Link
              href="/products?brand=Jordan"
              className="hover:text-foreground transition-colors"
            >
              Jordan
            </Link>
            <Link
              href="/products?brand=Nike"
              className="hover:text-foreground transition-colors"
            >
              Nike
            </Link>
            <Link
              href="/products?brand=New+Balance"
              className="hover:text-foreground transition-colors"
            >
              New Balance
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-xs font-mono uppercase bg-muted/50 hover:bg-muted text-muted-foreground px-3 py-2 rounded-full border border-border/80 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search Kicks...</span>
          </Link>

          {/* User Account / Dashboard */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-foreground hover:bg-muted"
            asChild
          >
            <Link href="/dashboard" aria-label="User Account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Cart Drawer Trigger */}
          <Button
            variant="outline"
            size="default"
            onClick={toggleCart}
            className="relative flex items-center gap-2 rounded-full border-foreground/20 hover:border-foreground/50 transition-all font-mono"
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs font-bold font-sans hidden sm:inline uppercase">
              Bag
            </span>
            {totalCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[11px] font-bold font-mono">
                {totalCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
