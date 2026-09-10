import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "CRM X — Mission Control",
  description: "Запуск пространства: задачи, зоны, готовность",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
