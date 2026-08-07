import type { Metadata } from "next";
import { TourView } from "@/views/TourView";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Private, sharing and fully customized Bali tours. Flat pricing, licensed local guides, routes that bend around you. Compare all three formats.",
};

export default function Page() {
  return <TourView />;
}
