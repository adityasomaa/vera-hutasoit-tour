import type { Metadata } from "next";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to an actual person. WhatsApp replies in about fifteen minutes, 08.00–22.00 Bali time. Office in Ubud, Gianyar.",
};

export default function Page() {
  return <ContactView />;
}
