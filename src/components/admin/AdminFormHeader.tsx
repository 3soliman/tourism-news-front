import { ArrowRight, Save } from "lucide-react";
import type { ReactNode } from "react";
import { admin } from "@/components/admin/admin-ui";

type AdminFormHeaderProps = {
  backHref: string;
  backLabel: string;
  title: string;
  submitLabel: string;
  submitting?: boolean;
  subtitle?: string;
  extra?: ReactNode;
};

export default function AdminFormHeader({
  backHref,
  backLabel,
  title,
  submitLabel,
  submitting = false,
  subtitle,
  extra,
}: AdminFormHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
      <div>
        <a href={backHref} className={admin.backLink}>
          <ArrowRight size={13} />
          {backLabel}
        </a>
        <h1 className={admin.pageTitle}>{title}</h1>
        {subtitle ? <p className={admin.pageDesc}>{subtitle}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {extra}
        <button type="submit" disabled={submitting} className={admin.btnPrimary}>
          <Save size={14} />
          {submitting ? "جاري الحفظ..." : submitLabel}
        </button>
      </div>
    </div>
  );
}
