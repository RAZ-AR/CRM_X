import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest" });
const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700"], variable: "--font-unbounded" });

export const metadata: Metadata = {
  title: "CRM X · Quicky",
  description: "Запуск пространства: задачи, зоны, готовность",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${unbounded.variable} h-full antialiased`}>
      <body className="min-h-full">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
