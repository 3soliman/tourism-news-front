"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  countryHasRelations,
  deleteAdminCountry,
  type AdminCountryRecord,
} from "@/lib/api/admin-countries";

type DeleteCountryButtonProps = {
  country: AdminCountryRecord;
};

export default function DeleteCountryButton({ country }: DeleteCountryButtonProps) {
  const [loading, setLoading] = useState(false);
  const blocked = countryHasRelations(country);

  const handleDelete = async () => {
    if (blocked) {
      window.alert("لا يمكن حذف دولة مرتبطة بأخبار أو وجهات.");
      return;
    }

    const confirmed = window.confirm(`هل تريد حذف الدولة: ${country.name}؟`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteAdminCountry(country.id);
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
      disabled={loading || blocked}
      className="grid h-8 w-8 place-items-center rounded-md border border-[#f1c7c7] text-[#b42318] hover:bg-[#fff7f7] disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="حذف الدولة"
      title={blocked ? "لا يمكن الحذف — مرتبطة بمحتوى" : "حذف الدولة"}
    >
      <Trash2 size={16} strokeWidth={1.85} />
    </button>
  );
}
