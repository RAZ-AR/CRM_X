"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { isCpo } from "@/lib/access";
import { zoneReadiness } from "@/lib/readiness";

export default function ZonesPage() {
  const { current, zones } = useStore();
  if (!current) return null;
  if (!isCpo(current)) return <div className="card p-6">Полный список зон только у CPO.</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {zones.map((z) => (
        <Link key={z.slug} href={`/zones/${z.slug}`} className="card p-6" style={{ background: z.color }}>
          <div className="text-2xl">{z.emoji}</div>
          <div className="text-xl font-semibold mt-2">{z.name}</div>
          <div className="text-3xl font-semibold mt-4">{zoneReadiness(z)}%</div>
        </Link>
      ))}
    </div>
  );
}
