import TrustPageView, { generateTrustPageMetadata } from "@/components/TrustPageView";

export const dynamic = "force-dynamic";

export const generateMetadata = () => generateTrustPageMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <TrustPageView slug="privacy-policy" />;
}
