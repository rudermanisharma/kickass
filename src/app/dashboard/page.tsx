'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  MapPin,
  Clock,
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MockOrder {
  id: string;
  date: string;
  status: 'paid' | 'shipped' | 'delivered';
  total: number;
  items: Array<{
    name: string;
    size: string;
    color: string;
    image: string;
    quantity: number;
    price: number;
  }>;
}

const SAMPLE_ORDERS: MockOrder[] = [
  {
    id: 'ORD-984210',
    date: '2024-03-24',
    status: 'shipped',
    total: 225.00,
    items: [
      {
        name: 'Air Jordan 1 Retro High OG',
        size: 'US 9',
        color: 'Lost & Found Chicago',
        image:
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
        quantity: 1,
        price: 210.00,
      },
    ],
  },
  {
    id: 'ORD-771923',
    date: '2024-02-18',
    status: 'delivered',
    total: 130.00,
    items: [
      {
        name: 'Nike Dunk Low Retro',
        size: 'US 9.5',
        color: 'Coast Blue',
        image:
          'https://images.unsplash.com/photo-1512374382149-233c42b661ac?auto=format&fit=crop&w=400&q=80',
        quantity: 1,
        price: 130.00,
      },
    ],
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Profile Header */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative h-20 w-20 rounded-full overflow-hidden bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-black text-2xl font-mono">
            VK
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
                Sneakerhead Collector
              </h1>
              <Badge variant="sneaker">VIP Member</Badge>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              collector@vaultkicks.com • Joined January 2024
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="text-xs font-bold uppercase tracking-wider">
            <Link href="/login">
              <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/80 gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Order History ({SAMPLE_ORDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'addresses'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>Saved Addresses (1)</span>
        </button>
      </div>

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {SAMPLE_ORDERS.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-foreground">
                      {order.id}
                    </span>
                    <Badge
                      variant={
                        order.status === 'delivered'
                          ? 'success'
                          : order.status === 'shipped'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-[10px] uppercase font-mono tracking-wider"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Placed on {order.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                      Total Amount
                    </span>
                    <span className="text-sm font-mono font-bold text-foreground">
                      {formatCurrency(order.total)}
                    </span>
                  </div>

                  <Button variant="outline" size="sm" className="text-xs">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Track
                  </Button>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="font-mono">{item.size}</span>
                          <span>•</span>
                          <span>{item.color}</span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-foreground">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 relative">
            <div className="flex justify-between items-start">
              <Badge variant="outline">Default Shipping</Badge>
              <span className="text-xs text-primary font-bold cursor-pointer hover:underline">
                Edit
              </span>
            </div>
            <h3 className="font-bold text-sm text-foreground">Michael Jordan</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              1901 W Madison St<br />
              Chicago, IL 60612<br />
              United States<br />
              Phone: +1 (555) 019-2834
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-border/80 p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-muted/30 transition-colors">
            <MapPin className="h-8 w-8 text-muted-foreground stroke-1" />
            <h4 className="font-bold text-sm uppercase tracking-wide">
              Add New Address
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Add a secondary residential or office shipping destination.
            </p>
          </div>
        </div>
      )}

      {/* Quick Action to browse catalog */}
      <div className="rounded-2xl bg-muted/40 border border-border/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-black uppercase tracking-tight text-foreground text-base">
            Ready to expand your sneaker rotation?
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Discover restocked silhouettes and new vintage arrivals.
          </p>
        </div>
        <Button asChild size="sm" className="uppercase font-bold text-xs tracking-wider">
          <Link href="/products" className="flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4" /> Browse Catalog <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
