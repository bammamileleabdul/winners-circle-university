// Quick check that the site's settings are present (shows true/false only, never the values).
export async function GET() {
  return Response.json(
    {
      vercelEnv: process.env.VERCEL_ENV || "unknown",
      ok: true,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
