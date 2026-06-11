import type { LucideIcon } from "lucide-react";

const toneClass = {
  blue: "text-[#075fb6]",
  green: "text-[#157347]",
  orange: "text-[#a15c07]",
  purple: "text-[#6045a8]",
};

type DashboardCardProps = {
  label: string;
  value: string;
  change: string;
  tone: keyof typeof toneClass;
  icon: LucideIcon;
};

export default function DashboardCard({
  label,
  value,
  change,
  tone,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <article className="rounded-xl border border-[#dce7f5] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-black text-[#17243a]">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce7f5] bg-[#fbfdff]">
          <Icon size={18} strokeWidth={1.85} className={toneClass[tone]} />
        </span>
      </div>
      <p className="mt-5 text-4xl font-black tracking-tight text-[#111827]">{value}</p>
      <p className="mt-3 text-sm font-bold text-[#16a34a]">{change}</p>
    </article>
  );
}
