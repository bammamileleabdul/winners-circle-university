"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) router.push("/clientportal");
    })();
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      router.push("/clientportal");
    } catch (err) {
      setMsg(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap">
      <div className="card">
        <a className="back" href="/">← Back</a>
        <h1>Login</h1>
        <p className="lead">Enter your email and password.</p>

        <form className="form" onSubmit={onSubmit}>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

          <button className="goldBtn" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>

          {msg && <div className="msg">{msg}</div>}

          <div className="row">
            <span className="muted">No account?</span>
            <a className="link" href="/signup">Create one</a>
          </div>
        </form>
      </div>

      <style jsx>{`
        .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 16px;background:radial-gradient(circle at top,#1a1408,#000);color:#f7f0da}
        .card{width:100%;max-width:520px;border-radius:26px;border:1px solid rgba(230,195,106,.35);background:radial-gradient(circle at top left,rgba(230,195,106,.14),rgba(0,0,0,.92));padding:22px 18px 18px;box-shadow:0 0 80px rgba(230,195,106,.12)}
        .back{color:#e6c36a;text-decoration:none;font-weight:800;font-size:14px}
        h1{margin:14px 0 8px;color:#e6c36a;font-size:28px}
        .lead{margin:0 0 16px;color:#d8d2b6;line-height:1.7;font-size:14px}
        .form{display:grid;gap:10px}
        .label{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#cbb68a;margin-top:6px}
        .input{padding:12px 14px;border-radius:14px;border:1px solid rgba(230,195,106,.25);background:rgba(0,0,0,.55);color:#fff;outline:none}
        .goldBtn{margin-top:10px;border:none;border-radius:999px;padding:14px 16px;font-weight:900;cursor:pointer;background:linear-gradient(135deg,#e6c36a,#b8963f);color:#000;width:100%}
        .goldBtn:disabled{opacity:.7;cursor:not-allowed}
        .msg{margin-top:10px;padding:12px;border-radius:16px;border:1px solid rgba(255,141,141,.35);background:rgba(0,0,0,.6);color:#ffb3b3;line-height:1.6;font-size:13px}
        .row{margin-top:10px;display:flex;gap:8px;align-items:center;justify-content:center;font-size:13px}
        .muted{color:#cbbfa5}
        .link{color:#e6c36a;font-weight:900;text-decoration:none;border-bottom:1px solid rgba(230,195,106,.35)}
      `}</style>
    </div>
  );
}
