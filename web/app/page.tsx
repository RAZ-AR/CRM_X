"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

/** conflict-free gate: logged-in users live on /home */
export default function Gate() {
  const { current } = useStore();
  const router = useRouter();
  useEffect(() => {
    router.replace(current ? "/home" : "/login");
  }, [current, router]);
  return null;
}
