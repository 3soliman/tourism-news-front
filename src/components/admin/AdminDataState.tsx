import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import type { AdminLoadResult } from "@/lib/api/admin";

type AdminDataStateProps<T> = {
  result: AdminLoadResult<T>;
  children: (data: T) => React.ReactNode;
};

export default function AdminDataState<T>({ result, children }: AdminDataStateProps<T>) {
  if (result.status === "offline") {
    return <AdminOfflineMessage />;
  }

  if (result.status === "error") {
    return (
      <AdminOfflineMessage
        title="تعذر تحميل البيانات"
        description={result.message}
      />
    );
  }

  return <>{children(result.data)}</>;
}
