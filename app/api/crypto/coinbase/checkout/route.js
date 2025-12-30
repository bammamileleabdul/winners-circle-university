export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, currency = "GBP", user_id, email } = body || {};

    if (!amount || Number(amount) <= 0) {
      return Response.json({ error: "amount required" }, { status: 400 });
    }

    const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!apiKey) {
      return Response.json({ error: "Missing COINBASE_COMMERCE_API_KEY" }, { status: 500 });
    }

    // Create a Coinbase Commerce "charge" (hosted checkout URL returned)
    const payload = {
      name: "Winners Circle University",
      description: "Client access / weekly profit commission payments",
      pricing_type: "fixed_price",
      local_price: { amount: String(amount), currency },
      metadata: {
        user_id: user_id || null,
        email: email || null,
        purpose: "membership_or_commission",
      },
      redirect_url: siteUrl ? `${siteUrl}/client-portal` : undefined,
      cancel_url: siteUrl ? `${siteUrl}/client-portal` : undefined,
    };

    const r = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": apiKey,
        "X-CC-Version": "2018-03-22",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();

    if (!r.ok) {
      return Response.json(
        { error: "Coinbase charge failed", details: data },
        { status: 400 }
      );
    }

    // hosted_url is where we redirect the client to pay
    return Response.json({
      ok: true,
      hosted_url: data?.data?.hosted_url,
      charge_id: data?.data?.id,
      code: data?.data?.code,
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
