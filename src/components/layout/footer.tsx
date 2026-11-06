'use client';

import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-neutral-950 text-neutral-300 pt-16 pb-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-14 border-b border-neutral-800">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-sm tracking-wide">
                100% Verified Authentic
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Every sneaker is rigorously inspected by our authentication team before shipping.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-sm tracking-wide">
                Global Express Delivery
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Double-boxed worldwide shipping with real-time tracking on all orders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-primary">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-sm tracking-wide">
                Seamless 14-Day Returns
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Hassle-free return policy for unworn sneakers with security tags intact.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-sm tracking-wide">
                Encrypted Checkout
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                256-bit SSL encrypted transactions powered by enterprise payment gateways.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center font-black tracking-tighter text-base">
                V
              </div>
              <span className="text-lg font-black uppercase tracking-tighter text-white">
                VAULT<span className="text-primary">.KICKS</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The premier marketplace for high-performance athletic footwear, vintage Grails, and limited streetwear drops.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Explore Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/products?brand=Jordan" className="hover:text-white transition-colors">
                  Air Jordan Retro
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Nike" className="hover:text-white transition-colors">
                  Nike Dunk & Air Max
                </Link>
              </li>
              <li>
                <Link href="/products?brand=New+Balance" className="hover:text-white transition-colors">
                  New Balance 99X & 9060
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Adidas" className="hover:text-white transition-colors">
                  Adidas & Yeezy Archive
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Footwear Size Guide
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shipping Policies
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Authentication Standard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Join the Drop List
            </h5>
            <p className="text-xs text-neutral-400 mb-3">
              Be the first to access shock drops, restocks, and exclusive raffles.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="bg-neutral-900 border border-neutral-800 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-primary flex-1"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors uppercase tracking-wider"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-neutral-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} VAULT.KICKS Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
