"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";
import AuthCard from "../../components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) router.push("/client-portal");
    })();
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      router.push("/client-portal");
    } catch (err) {
      setMsg(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Members"
      title="Login"
      lead="Sign in to the Winners Circle members area."
      footer={
        <>
          <span>No account?</span>
          <a href="/signup">Create one</a>
        </>
      }
    >
      <form className="auth-form" onSubmit={onSubmit}>
        <div>
          <label className="fx-label" htmlFor="login-email">Email</label>
          <input id="login-email" className="fx-input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="fx-label" htmlFor="login-pass">Password</label>
          <input id="login-pass" className="fx-input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Login"}
        </button>
        {msg && <p className="auth-msg" role="status">{msg}</p>}
      </form>
    </AuthCard>
  );
}
