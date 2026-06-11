import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Cairo } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import Footer from "@/components/layout/Footer";

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
});

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
      <body
        className={`${ibmPlex.variable} ${cairo.variable} bg-page-bg text-text-dark antialiased`}
      >
        <SiteShell />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
