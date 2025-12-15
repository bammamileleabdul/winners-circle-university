import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      return new Response("Failed to save email", { status: 500 });
    }

    return new Response("Success", { status: 200 });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}
