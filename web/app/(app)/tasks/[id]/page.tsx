"use client";

import { useParams, useRouter } from "next/navigation";
import { TaskSheet } from "@/components/TaskSheet";

export default function TaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  return (
    <div className="max-w-xl mx-auto">
      <TaskSheet taskId={id} onClose={() => router.push("/kanban")} />
    </div>
  );
}
