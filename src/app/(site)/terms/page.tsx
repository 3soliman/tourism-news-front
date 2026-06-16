import TrustPageView, { generateTrustPageMetadata } from "@/components/TrustPageView";

export const dynamic = "force-dynamic";

export const generateMetadata = () => generateTrustPageMetadata("terms-of-use");

export default function TermsPage() {
  return <TrustPageView slug="terms-of-use" />;
}
