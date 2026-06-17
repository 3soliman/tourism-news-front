"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeaderSearch from "@/components/layout/HeaderSearch";

function HeaderSearchQuery({ compact = false }: { compact?: boolean }) {
  const currentQuery = useSearchParams().get("q") ?? "";

  return <HeaderSearch currentQuery={currentQuery} compact={compact} />;
}

export default function HeaderSearchSuspense({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Suspense fallback={<HeaderSearch currentQuery="" compact={compact} />}>
      <HeaderSearchQuery compact={compact} />
    </Suspense>
  );
}
