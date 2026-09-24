import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest" });

export const metadata: Metadata = {
  title: "CRM X — Mission Control",
  description: "Запуск пространства: задачи, зоны, готовность",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} h-full antialiased`}>
      <body className="min-h-full">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
