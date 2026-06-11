import type { Metadata } from "next";
import "./globals.css";
import AppChrome from "@/components/layout/AppChrome";

export const metadata: Metadata = {
  title: {
    default: "أخبار السياحة | بوابة السياحة والسفر",
    template: "%s | أخبار السياحة",
  },
  description:
    "موقع عربي متخصص في أخبار السياحة والسفر، الوجهات السياحية، الفنادق، التأشيرات، العروض، ونصائح المسافرين.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-page-bg text-text-dark antialiased">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
