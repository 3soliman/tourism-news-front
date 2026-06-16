"use client";

import dynamic from "next/dynamic";

const AdminTinyEditor = dynamic(() => import("@/components/admin/AdminTinyEditor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-500">
      جاري تحميل محرر المحتوى...
    </div>
  ),
});

type AdminContentEditorProps = {
  label?: string;
  value: string;
  onChange: (html: string) => void;
};

export default function AdminContentEditor(props: AdminContentEditorProps) {
  return <AdminTinyEditor {...props} />;
}
