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
            <svg viewBox="-27 -700 940 1009" className="h-[26px] w-[25px]" aria-hidden="true">
              <path fill="#111" d="M515 0Q504 0 494.0 8.5Q484 17 482 28Q480 39 487.5 47.0Q495 55 506 55H794L754 309H559L374 88L388 0H-27L83 -700H913L803 0ZM504 -573Q506 -585 499.0 -593.0Q492 -601 480 -601Q469 -601 459.5 -592.5Q450 -584 448 -573L378 -127Q376 -116 382.5 -107.5Q389 -99 400 -99Q412 -99 422.0 -107.0Q432 -115 434 -127Z" />
            </svg>
            <span className="wordmark text-[20px]">crm x</span>
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
            if (r === true) {
              // ?next=/quicky/… — вернуться туда, откуда пришли (только свои пути).
              const next = new URLSearchParams(window.location.search).get("next") || "";
              if (next.startsWith("/quicky/")) window.location.href = next;
              else router.push("/home");
            }
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
