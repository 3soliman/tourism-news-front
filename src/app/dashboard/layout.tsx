import type { Metadata } from "next";
import AdminShell from "@/components/dashboard/AdminShell";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
