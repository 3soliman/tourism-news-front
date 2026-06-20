"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteAdminRedirect } from "@/lib/api/admin-redirects";

type DeleteRedirectButtonProps = {
  redirectId: number;
  fromPath: string;
};

export default function DeleteRedirectButton({
  redirectId,
  fromPath,
}: DeleteRedirectButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`هل تريد حذف التحويل: ${fromPath}؟`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteAdminRedirect(redirectId);
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
      className="grid h-8 w-8 place-items-center rounded-md border border-[#f1c7c7] text-[#b42318] hover:bg-[#fff7f7] disabled:opacity-40"
      aria-label="حذف التحويل"
      title="حذف التحويل"
    >
      <Trash2 size={16} strokeWidth={1.85} />
    </button>
  );
}
