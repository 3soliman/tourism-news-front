export default function SidebarSkeleton() {
  return (
    <aside
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-start"
      aria-hidden
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-sm bg-white shadow-sm ring-1 ring-border/80"
        />
      ))}
    </aside>
  );
}
