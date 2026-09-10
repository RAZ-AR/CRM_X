"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/kanban");
  }, [router]);
  return null;
}
