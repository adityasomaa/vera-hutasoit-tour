import type { Metadata } from "next";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms covering your use of verabalitour.com and any tour you book with us — bookings, cancellations, liability and responsibilities.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalView kind="terms" />;
}
