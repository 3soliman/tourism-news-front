"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteAdminCategory } from "@/lib/api/admin-categories";

type DeleteCategoryButtonProps = {
  categoryId: number;
  label: string;
  articlesCount?: number;
};

export default function DeleteCategoryButton({
  categoryId,
  label,
  articlesCount = 0,
}: DeleteCategoryButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (articlesCount > 0) {
      window.alert("لا يمكن حذف تصنيف مرتبط بأخبار.");
      return;
    }

    const confirmed = window.confirm(`هل تريد حذف التصنيف: ${label}؟`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteAdminCategory(categoryId);
    setLoading(false);

    if (!result.ok) {
      window.alert(result.message);
      return;
    }

    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading || articlesCount > 0}
      className="grid h-8 w-8 place-items-center rounded-md border border-[#f1c7c7] text-[#b42318] hover:bg-[#fff7f7] disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="حذف التصنيف"
      title={articlesCount > 0 ? "لا يمكن الحذف — مرتبط بأخبار" : "حذف التصنيف"}
    >
      <Trash2 size={16} strokeWidth={1.85} />
    </button>
  );
}
