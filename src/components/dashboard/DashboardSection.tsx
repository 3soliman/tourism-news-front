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
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {action && (
          <button type="button" className="text-xs font-bold text-sky-600">
            {action}
          </button>
        )}
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}
