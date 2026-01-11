export async function GET() {
  const btc =
    process.env.WCU_BTC_ADDRESS || process.env.NEXT_PUBLIC_BTC_ADDRESS || "";
  const usdt =
    process.env.WCU_USDT_TRC20_ADDRESS ||
    process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS ||
    "";

  return Response.json(
    {
      vercelEnv: process.env.VERCEL_ENV || "unknown",
      ok: true,

      // Supabase
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,

      // Existing
      hasIngestSecret: !!process.env.INGEST_SECRET,

      // Crypto
      hasTronscanKey: !!process.env.TRONSCAN_API_KEY,
      hasBtcAddress: !!btc,
      hasUsdtTrc20Address: !!usdt,
    },
    {
      headers: {
        // avoid any caching surprises
        "Cache-Control": "no-store",
      },
    }
  );
}
