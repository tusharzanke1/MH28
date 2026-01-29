# MH28 Storefront

Premium, Myntra-inspired storefront for a small Indian clothing shop.

## Folder structure
```
app/
  (store)/
    page.tsx
    category/[slug]/page.tsx
    product/[slug]/page.tsx
    search/page.tsx
    cart/page.tsx
    checkout/page.tsx
    account/page.tsx
  admin/
    page.tsx
    products/page.tsx
    orders/page.tsx
    customers/page.tsx
    coupons/page.tsx
    content/page.tsx
  api/
    auth/[...nextauth]/route.ts
    razorpay/route.ts
    shipping/route.ts
    webhooks/razorpay/route.ts
components/
  admin/
  store/
  ui/
lib/
  auth/
  payments/
  shipping/
  prisma.ts
prisma/
  schema.prisma
  seed.ts
```

## Setup
```bash
# If pnpm is not available, enable it via Corepack (Node 16+)
corepack enable
corepack prepare pnpm@latest --activate

pnpm install
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

### npm fallback (if pnpm is unavailable)
```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Env vars
See `.env.example` for all required variables.

- `DATABASE_URL`: PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Auth secret for NextAuth.
- `NEXTAUTH_URL`: Base URL for NextAuth.
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`: Razorpay credentials (optional; fallback mock mode).
- `RAZORPAY_WEBHOOK_SECRET`: Razorpay webhook secret for signature verification.
- `SHIPROCKET_TOKEN`: Shiprocket API token (optional; fallback mock mode).
- `RESEND_API_KEY`: Email provider (optional, logs in dev).
- `EMAIL_FROM`: Sender email.
- `S3_*`: Optional storage adapter placeholders.

## Deployment
1. Configure `.env` in your hosting environment.
2. Run `pnpm build`.
3. Start with `pnpm start`.
