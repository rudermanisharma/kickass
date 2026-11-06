# VAULT.KICKS - Footwear E-Commerce Platform

A modern, high-performance footwear and sneaker marketplace built with Next.js App Router, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL with RLS), and Zustand persistent state management.

---

## 👟 Architecture & Features

1. **Authentication Flow**:
   - Supabase Auth with email/password and Google OAuth.
   - Server-side session verification and route protection via Next.js middleware (`src/middleware.ts`).
   - Automatic user profile sync to `public.profiles` using a PostgreSQL database trigger on `auth.users`.

2. **Footwear Inventory Schema**:
   - High-level models stored in `products`.
   - Granular footwear stock (sizes e.g. US 8 to 12, colorways, SKUs, and stock quantities) in `product_variants`.
   - Complete Row Level Security (RLS) policies protecting customer data while enabling public storefront discovery.
   - The complete SQL migration script is stored in [`supabase/schema.sql`](file:///home/rd/Desktop/Practice/supabase/schema.sql).

3. **Product Discovery & Catalog**:
   - Filter by Brand (Jordan, Nike, New Balance, Adidas), Size (US 8 - 11), Style/Category, and Price.
   - Sort by Newest Drops, Price (Low to High), and Price (High to Low).
   - Real-time URL query parameter synchronization and React Suspense skeleton loaders.

4. **Product Detail Page (PDP)**:
   - Dynamic interactive shoe gallery with thumbnail selection and colorway switching.
   - Smart size selector that prevents out-of-stock selection, crosses out sold-out sizes, and shows low-stock indicators.
   - Dynamic variant pricing and instant add-to-bag with slide-out drawer trigger.

5. **Persistent Cart & Checkout**:
   - Slide-out cart drawer built with Radix Sheet.
   - Real-time free shipping threshold progress bar ($150 cutoff).
   - Quantity adjustment, removal, and persistent state stored via Zustand's `persist` middleware.
   - Structured checkout flow with address validation and card payment simulation.

6. **Customer Dashboard**:
   - Order history with tracking references, timestamps, and order status badges (`paid`, `shipped`, `delivered`).
   - Saved shipping addresses.

---

## 🚀 Running the App

```bash
# Run local development server
npm run dev

# Or build and launch the production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Configuration

1. In your [Supabase Dashboard](https://supabase.com), go to the **SQL Editor**.
2. Run the SQL script found in [`supabase/schema.sql`](file:///home/rd/Desktop/Practice/supabase/schema.sql).
3. Update `.env.local` with your actual Supabase URL and Anon Key:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
*(Note: A high-fidelity local sneaker dataset is built-in so the entire application, PDP, cart, filtering, and checkout run immediately even prior to database connection).*
