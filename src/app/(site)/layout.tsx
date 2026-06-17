import PublicLayout from "@/components/layout/PublicLayout";

export const revalidate = 60;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicLayout>{children}</PublicLayout>;
}
