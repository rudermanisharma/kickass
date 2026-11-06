'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, PackageCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OrderReceipt {
  orderId: string;
  items: Array<{
    name: string;
    size: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shipping: number;
  subtotal: number;
  shippingDetails: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-984210';
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('latest_order');
    if (saved) {
      try {
        setReceipt(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-12 text-center space-y-6 shadow-xl">
      <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">
          Payment Authorized & Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
          You&apos;re Locked In.
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Order Reference: <strong className="text-foreground">{orderId}</strong>
        </p>
      </div>

      <div className="rounded-2xl bg-muted/40 p-5 text-left space-y-4 border border-border/60">
        <div className="flex items-center gap-3 pb-3 border-b border-border/60">
          <PackageCheck className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">
              Estimated Delivery: 2-3 Business Days
            </p>
            <p className="text-[11px] text-muted-foreground">
              Dispatched with signature confirmation via UPS Express.
            </p>
          </div>
        </div>

        {receipt?.shippingDetails && (
          <div className="text-xs space-y-1 text-muted-foreground">
            <p className="font-bold uppercase tracking-wider text-foreground text-[11px]">
              Shipping Destination:
            </p>
            <p className="text-foreground">{receipt.shippingDetails.fullName}</p>
            <p>{receipt.shippingDetails.address}</p>
            <p>
              {receipt.shippingDetails.city}, {receipt.shippingDetails.state}{' '}
              {receipt.shippingDetails.postalCode}
            </p>
          </div>
        )}

        {receipt?.total && (
          <div className="pt-2 border-t border-border/60 flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Total Paid:</span>
            <span className="text-foreground font-bold font-mono">
              {formatCurrency(receipt.total)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>Every pair undergoes our physical authenticity verification before dispatch.</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button asChild size="lg" className="flex-1 uppercase font-bold text-xs tracking-wider">
          <Link href="/dashboard">View in Dashboard</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="flex-1 uppercase font-bold text-xs tracking-wider"
        >
          <Link href="/products" className="flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-2xl">
      <Suspense fallback={<div className="h-96 rounded-3xl bg-muted/40 animate-pulse" />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
