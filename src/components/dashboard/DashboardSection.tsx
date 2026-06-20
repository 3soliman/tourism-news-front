type DashboardSectionProps = {
  title: string;
  description?: string;
  action?: string;
  children: React.ReactNode;
};

export default function DashboardSection({
  title,
  description,
  action,
  children,
}: DashboardSectionProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
          ) : null}
        </div>
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
