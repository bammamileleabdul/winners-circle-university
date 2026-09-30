"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";
import AuthCard from "../../components/AuthCard";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [adult, setAdult] = useState(false);
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
    if (password.length < 8) return setMsg("Password must be at least 8 characters.");
    if (password !== confirm) return setMsg("Passwords do not match.");
    if (!adult) return setMsg("Confirm you are 18 or older to create an account.");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
      if (error) throw error;
      if (!data?.session) {
        setMsg("Account created. Check your email to confirm, then login.");
        return;
      }
      router.push("/client-portal");
    } catch (err) {
      setMsg(err?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Members"
      title="Create account"
      lead="A members account gives you the strategy dashboard, fee maths and lessons. Your trading stays in your Exness account."
      footer={
        <>
          <span>Already have an account?</span>
          <a href="/login">Login</a>
        </>
      }
    >
      <form className="auth-form" onSubmit={onSubmit}>
        <div>
          <label className="fx-label" htmlFor="su-email">Email</label>
          <input id="su-email" className="fx-input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="fx-label" htmlFor="su-pass">Password</label>
          <input id="su-pass" className="fx-input" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="fx-label" htmlFor="su-confirm">Confirm password</label>
          <input id="su-confirm" className="fx-input" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <label className="su-check" htmlFor="su-adult">
          <input id="su-adult" type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} />
          I’m 18 or older and understand trading carries a real risk of losing money.
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </button>
        {msg && <p className="auth-msg" role="status">{msg}</p>}
      </form>
      <style jsx>{`
        .su-check {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 14px;
          line-height: 1.5;
          color: #d9d1bd;
        }
        .su-check input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          flex: none;
          accent-color: var(--gold);
        }
      `}</style>
    </AuthCard>
  );
}
