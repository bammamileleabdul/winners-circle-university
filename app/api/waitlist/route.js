import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // IMPORTANT: do NOT throw during build
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase env vars missing at runtime");
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey
    );

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API crash:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
