import { createClient } from "@supabase/supabase-js";

let _admin = null;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required.");

  if (_admin) return _admin;

  _admin = createClient(url, key, {
    auth: { persistSession: false },
  });

  return _admin;
}
