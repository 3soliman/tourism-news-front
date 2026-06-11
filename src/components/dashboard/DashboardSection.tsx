type DashboardSectionProps = {
  title: string;
  action?: string;
  children: React.ReactNode;
};

export default function DashboardSection({
  title,
  action,
  children,
}: DashboardSectionProps) {
  return (
    <section className="rounded-xl border border-[#dce7f5] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#dce7f5] px-5 py-4">
        <h2 className="text-lg font-black text-[#17243a]">{title}</h2>
        {action && <button className="text-sm font-black text-[#0677e8]">{action}</button>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
