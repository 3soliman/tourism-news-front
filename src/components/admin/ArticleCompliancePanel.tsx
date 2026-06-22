"use client";

import { AlertTriangle, CheckCircle2, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { admin } from "@/components/admin/admin-ui";
import type { ArticleComplianceReport, ComplianceCheck } from "@/lib/api/admin-news-compliance";

const levelStyles = {
  pass: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
  error: "border-rose-200 bg-rose-50 text-rose-800",
} as const;

const levelIcons = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  error: XCircle,
} as const;

type ArticleCompliancePanelProps = {
  report: ArticleComplianceReport | null;
  loading?: boolean;
  publishing?: boolean;
};

function CheckRow({ check }: { check: ComplianceCheck }) {
  const Icon = levelIcons[check.level];

  return (
    <div className={`rounded-md border px-3 py-2.5 text-sm ${levelStyles[check.level]}`}>
      <div className="flex items-start gap-2">
        <Icon size={16} className="mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-bold">{check.message}</p>
          {check.matches.length > 0 ? (
            <ul className="mt-2 space-y-1 text-xs">
              {check.matches.map((match) => (
                <li key={`${check.key}-${match.id}`}>
                  <a
                    href={match.url}
                    target="_blank"
                    className="font-bold underline underline-offset-2"
                  >
                    {match.title}
                  </a>
                  <span className="opacity-80">
                    {" "}
                    — تشابه {match.similarity}%
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ArticleCompliancePanel({
  report,
  loading = false,
  publishing = false,
}: ArticleCompliancePanelProps) {
  const score = report?.score ?? 0;
  const scoreColor =
    score >= 80 ? "text-emerald-700" : score >= 55 ? "text-amber-700" : "text-rose-700";

  return (
    <section className={`${admin.card} max-h-[420px] overflow-y-auto xl:max-h-[calc(100vh-7rem)]`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-sky-600" />
            <h3 className="text-sm font-black text-slate-800">جاهزية Google</h3>
          </div>
          <p className="mt-1 text-xs leading-6 text-slate-500">
            فحص تكرار العنوان والمحتوى ومتطلبات النشر.
          </p>
        </div>
        {loading ? (
          <Loader2 size={18} className="animate-spin text-slate-400" />
        ) : (
          <div className={`text-2xl font-black ${scoreColor}`}>{score}</div>
        )}
      </div>

      {report ? (
        <div className="space-y-3">
          <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
            {report.summary}
          </p>

          {publishing && !report.can_publish ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
              لا يمكن النشر حتى تُصلَح المشاكل الحمراء.
            </p>
          ) : null}

          <div className="grid gap-2">
            {report.checks.map((check) => (
              <CheckRow key={check.key} check={check} />
            ))}
          </div>

          {report.word_count > 0 ? (
            <p className="text-[11px] text-slate-500">
              عدد كلمات المحتوى: {report.word_count}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-xs text-slate-500">أدخل العنوان والمحتوى لبدء الفحص.</p>
      )}
    </section>
  );
}
