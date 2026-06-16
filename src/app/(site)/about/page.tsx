import TrustPageView, { generateTrustPageMetadata } from "@/components/TrustPageView";

export const dynamic = "force-dynamic";

export const generateMetadata = () => generateTrustPageMetadata("about");

export default function AboutPage() {
  return <TrustPageView slug="about" />;
}
