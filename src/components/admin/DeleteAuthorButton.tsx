"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteAdminAuthor,
  type AdminAuthorRecord,
} from "@/lib/api/admin-authors";

type DeleteAuthorButtonProps = {
  author: AdminAuthorRecord;
};

export default function DeleteAuthorButton({ author }: DeleteAuthorButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const blocked = author.articlesCount > 0;

  const handleDelete = async () => {
    if (blocked) {
      window.alert("لا يمكن حذف كاتب مرتبط بأخبار.");
      return;
    }

    const confirmed = window.confirm(`هل تريد حذف الكاتب: ${author.name}؟`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteAdminAuthor(author.id);
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
      disabled={loading || blocked}
      className="grid h-8 w-8 place-items-center rounded-md border border-[#f1c7c7] text-[#b42318] hover:bg-[#fff7f7] disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="حذف الكاتب"
      title={blocked ? "لا يمكن الحذف — مرتبط بأخبار" : "حذف الكاتب"}
    >
      <Trash2 size={16} strokeWidth={1.85} />
    </button>
  );
}
