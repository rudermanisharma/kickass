import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';

export const metadata: Metadata = {
  title: 'VAULT.KICKS | Premium Sneaker Marketplace & Limited Drops',
  description:
    'Discover, buy, and sell verified authentic sneakers. Shop limited releases from Jordan, Nike, New Balance, and Adidas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
