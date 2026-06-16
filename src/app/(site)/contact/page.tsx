import TrustPageView, { generateTrustPageMetadata } from "@/components/TrustPageView";

export const dynamic = "force-dynamic";

export const generateMetadata = () => generateTrustPageMetadata("contact");

export default function ContactPage() {
  return <TrustPageView slug="contact" />;
}
