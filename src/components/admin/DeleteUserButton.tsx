"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteAdminUser,
  type ManagedUserRecord,
} from "@/lib/api/admin-users";

type DeleteUserButtonProps = {
  user: ManagedUserRecord;
};

export default function DeleteUserButton({ user }: DeleteUserButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`هل تريد حذف المستخدم: ${user.name}؟`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteAdminUser(user.id);
    setLoading(false);

    if (!result.ok) {
      window.alert(result.message);
      return;
    }

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="grid h-7 w-7 place-items-center rounded border border-red-100 text-red-600 hover:bg-red-50 disabled:opacity-50"
      aria-label="حذف المستخدم"
      title="حذف المستخدم"
    >
      <Trash2 size={14} strokeWidth={1.85} />
    </button>
  );
}
