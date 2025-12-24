import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    vercelEnv: process.env.VERCEL_ENV || null,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasIngestSecret: !!process.env.WCU_INGEST_SECRET,
  });
}
