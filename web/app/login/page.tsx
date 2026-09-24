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
    <div className="min-h-screen grid place-items-center p-6">
      <div className="bg-white rounded-[30px] w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-1">CRM X</h1>
        <p className="text-sm text-[#757575] mb-5">логин — ваше имя, пароль выдаёт Owner</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr("");
            const ok = await login(email, password);
            if (ok) router.push("/home");
            else setErr("Неверный логин или пароль");
          }}
        >
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="логин, например Armen" autoComplete="username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="пароль" autoComplete="current-password" />
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <button className="pill bg-black text-white py-3 font-medium">Войти</button>
        </form>
      </div>
    </div>
  );
}
