"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  return (
    <div className="min-h-dvh grid place-items-center p-[var(--gap)] bg-[var(--canvas)]">
      <div className="w-full max-w-[440px] bg-[var(--bg)] rounded-[var(--r-panel)] p-3">
        <div className="rounded-[16px] bg-[var(--apricot)] px-6 pt-6 pb-16">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 110 58" className="h-[24px] w-[46px]" aria-hidden="true">
              <ellipse cx="50" cy="28" rx="44" ry="21" fill="none" stroke="#111" strokeWidth="7" />
              <path d="M21 15.5 L104 53" fill="none" stroke="#111" strokeWidth="7" strokeLinecap="round" />
            </svg>
            <span className="display font-bold text-[20px] tracking-[-0.04em]">crm x</span>
            <span className="h-2 w-2 rounded-full bg-[var(--orange)] self-start mt-1" />
          </div>
          <h1 className="page-title mt-8 mb-1">Вход в CRM X</h1>
          <p className="text-sm text-[var(--ink-2)] m-0">Часть Quicky. Логин — ваше имя, пароль выдаёт Owner.</p>
        </div>
        <form
          className="-mt-10 mx-3 mb-3 flex flex-col gap-3 bg-white rounded-[16px] border-[1.5px] border-[var(--hair)] p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr("");
            const r = await login(email, password);
            if (r === true) router.push("/home");
            else setErr(r);
          }}
        >
          <label className="label" htmlFor="login-name">Логин</label>
          <input id="login-name" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="например, Armen" autoComplete="username" />
          <label className="label mt-1" htmlFor="login-pass">Пароль</label>
          <input id="login-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="пароль" autoComplete="current-password" />
          {err && <p role="alert" className="text-[var(--red)] text-sm m-0">{err}</p>}
          <button className="pill bg-black text-white h-12 mt-1 uppercase text-[13px] tracking-[0.06em]">Войти</button>
        </form>
      </div>
    </div>
  );
}
