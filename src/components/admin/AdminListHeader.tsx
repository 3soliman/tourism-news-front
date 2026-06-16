import type { ReactNode } from "react";
import { admin } from "@/components/admin/admin-ui";

type AdminListHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function AdminListHeader({
  title,
  description,
  actions,
}: AdminListHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h1 className={admin.pageTitle}>{title}</h1>
        {description ? <p className={admin.pageDesc}>{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
