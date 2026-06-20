export default function SidebarSkeleton() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-white p-4 ring-1 ring-border/50">
        <div className="mb-3 h-4 w-28 rounded-lg bg-border/60" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-3 flex gap-3">
            <div className="h-7 w-7 shrink-0 rounded-lg bg-border/60" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-3 w-full rounded bg-border/50" />
              <div className="h-3 w-2/3 rounded bg-border/40" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-48 rounded-xl bg-gradient-to-br from-border/40 to-border/20" />
    </div>
  );
}
