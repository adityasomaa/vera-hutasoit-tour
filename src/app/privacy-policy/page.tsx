import type { Metadata } from "next";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Vera Bali Tour collects, why we collect it, how long we keep it and how to ask us to delete it. Plain language, no legal fog.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalView kind="privacy" />;
}
