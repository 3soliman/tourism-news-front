import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import { loadAdminOverview } from "@/lib/api/admin";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

type AdminHomePageProps = {
  searchParams: Promise<{ denied?: string }>;
};

export default async function AdminHomePage({ searchParams }: AdminHomePageProps) {
  const params = await searchParams;
  const [overview, user] = await Promise.all([
    loadAdminOverview(),
    verifyAdminSession(),
  ]);

  if (overview.status === "offline") {
    return <AdminOfflineMessage />;
  }

  if (!user) {
    return null;
  }

  return (
    <AdminDataState result={overview}>
      {(data) => (
        <AdminDashboard
          data={data}
          user={user}
          accessDenied={params.denied === "1"}
        />
      )}
    </AdminDataState>
  );
}
