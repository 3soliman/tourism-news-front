import { permanentRedirect } from "next/navigation";

export default function TermsOfUseRedirectPage() {
  permanentRedirect("/terms");
}
