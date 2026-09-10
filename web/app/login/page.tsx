"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const ACCOUNTS = [
  ["1111", "Owner", "CPO · всё"],
  ["2222", "Armen", "Product Owner"],
  ["3333", "Маркетолог", "бренд / POSM"],
  ["4444", "Технолог", "вафли · ищем"],
  ["5555", "Кондитер", "окно · с 3 окт"],
  ["6666", "Су-шеф", "кухня · окт"],
  ["7777", "Повар", "универсал ×3"],
  ["8888", "Бармен", "зал · дек"],
  ["9999", "Официант", "зал · дек/янв"],
];

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("1111");
  const [password, setPassword] = useState("1111");
  const [err, setErr] = useState("");

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="bg-white rounded-[30px] w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-1">Norion CRM</h1>
        <p className="text-sm text-[#757575] mb-5">логин = пароль</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (login(email, password)) router.push("/home");
            else setErr("Неверный логин или пароль");
          }}
        >
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="логин" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <button className="pill bg-black text-white py-3 font-medium">Войти</button>
        </form>
        <div className="mt-6 text-sm space-y-1 text-[#555]">
          {ACCOUNTS.map(([id, name, role]) => (
            <button
              key={id}
              type="button"
              className="block w-full text-left hover:underline"
              onClick={() => {
                setEmail(id);
                setPassword(id);
              }}
            >
              <b>{id}</b> — {name} · {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
