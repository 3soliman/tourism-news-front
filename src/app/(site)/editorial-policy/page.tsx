import TrustPageView, { generateTrustPageMetadata } from "@/components/TrustPageView";

export const dynamic = "force-dynamic";

export const generateMetadata = () => generateTrustPageMetadata("editorial-policy");

export default function EditorialPolicyPage() {
  return <TrustPageView slug="editorial-policy" />;
}
