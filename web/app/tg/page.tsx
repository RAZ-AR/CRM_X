"use client";

import Script from "next/script";
import { useState } from "react";

type TelegramWebApp = { initData: string; ready: () => void; expand: () => void };

/** Точка входа Mini App: Telegram передаёт подписанные initData, сервер ставит сессию. */
export default function TelegramEntry() {
  const [state, setState] = useState<"loading" | "not_linked" | "error">("loading");

  async function start() {
    const app = (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
    if (!app?.initData) {
      setState("error");
      return;
    }
    app.ready();
    app.expand();
    try {
      const res = await fetch("/api/telegram/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ initData: app.initData }),
      });
      const data = await res.json();
      if (data.ok) window.location.replace("/home");
      else setState(data.error === "not_linked" ? "not_linked" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" onLoad={start} />
      <div className="bg-white rounded-[30px] w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">CRM X</h1>
        {state === "loading" && <p className="text-sm text-[#757575]">Входим через Telegram…</p>}
        {state === "not_linked" && (
          <p className="text-sm text-[#757575]">
            Этот Telegram ещё не привязан. Войдите в CRM по логину и паролю → «Мой профиль» → «Подключить Telegram».
            После этого CRM будет открываться отсюда без пароля.
          </p>
        )}
        {state === "error" && <p className="text-sm text-[#757575]">Не получилось войти через Telegram.</p>}
        {state !== "loading" && (
          <a href="/login" className="inline-block mt-4 pill bg-black text-white px-4 py-2 text-sm">Войти по паролю</a>
        )}
      </div>
    </div>
  );
}
