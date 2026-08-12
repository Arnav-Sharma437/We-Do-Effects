# We Do Effects

Creative marketing agency site with a Phase 1 video pricing calculator and booking enquiry flow.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking / Pricing (Phase 1)

- **Pricing calculator:** [/pricing](http://localhost:3000/pricing)
- **Book / enquiry:** [/book](http://localhost:3000/book)
- **Enquiry API:** `POST /api/enquiry`

Customers select a package, optional extras, and reel quantity (where applicable). Totals and deposits update live. The book form accepts file uploads and emails a server-recalculated quote.

Stripe deposit checkout and a live Calendly embed are placeholders until keys/URLs are provided.

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for sending enquiry emails |
| `ENQUIRY_TO_EMAIL` | Studio inbox that receives enquiries |
| `ENQUIRY_FROM_EMAIL` | Verified Resend from address (e.g. `We Do Effects <hello@yourdomain.com>`) |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly or TidyCal URL (optional; shows placeholder when empty) |

If Resend variables are missing, enquiries still succeed in development: the payload is logged to the server console (`[enquiry:dev-fallback]`).

### Deposit rules

- Projects under £500 → 50% deposit (rounded)
- Projects £500 and above → £250 deposit

### Visuals pricing

`Visuals` is configured with `basePrice: null` (TBD / POA) in `src/data/pricing.ts`. It contributes £0 until a real price is set.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
