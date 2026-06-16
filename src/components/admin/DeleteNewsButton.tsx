"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteAdminNews } from "@/lib/api/admin-news";

type DeleteNewsButtonProps = {
  articleId: number;
  title: string;
};

export default function DeleteNewsButton({ articleId, title }: DeleteNewsButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`هل تريد حذف الخبر: ${title}؟`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteAdminNews(articleId);
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
      className="grid h-8 w-8 place-items-center rounded-md border border-[#f1c7c7] text-[#b42318] hover:bg-[#fff7f7] disabled:opacity-60"
      aria-label="حذف الخبر"
    >
      <Trash2 size={16} strokeWidth={1.85} />
    </button>
  );
}
