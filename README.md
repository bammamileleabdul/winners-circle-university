# winners-circle-university
Official website for Winners Circle University.

Clients copy the Winners Circle strategy through **Exness Social Trading**. Exness holds client funds and
collects the performance fee; this site is the brand, education and members area.

## Settings to fill in
Edit `lib/site.js`:
- `exnessSignupUrl` – your Exness partner sign-up link
- `strategyUrl` – the public link to the Winners Circle strategy in Exness Social Trading
- `performanceFeePct`, `minInvestmentUsd` – match what you set on the strategy
- `WEEKLY_RETURNS` – replace the sample numbers with your verified weekly results, then set `RETURNS_ARE_SAMPLE = false`

## Environment variables (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` – members login
