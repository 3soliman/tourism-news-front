import type { LucideIcon } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";

type SimpleDashboardPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

export default function SimpleDashboardPage({
  title,
  description,
  icon: Icon,
  items,
}: SimpleDashboardPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[#17243a]">{title}</h1>
        <p className="mt-2 text-[#6e7e99]">{description}</p>
      </div>
      <DashboardSection title={title}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-xl border border-[#edf2f8] bg-[#fbfdff] p-5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce7f5] bg-white text-[#53657f]">
                <Icon size={17} strokeWidth={1.85} />
              </span>
              <div>
                <p className="font-black text-[#17243a]">{item}</p>
                <p className="mt-1 text-sm text-[#6e7e99]">جاهز للربط مع الباك اند لاحقًا</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
