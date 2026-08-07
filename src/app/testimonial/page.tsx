import type { Metadata } from "next";
import { TestimonialView } from "@/views/TestimonialView";

export const metadata: Metadata = {
  title: "Testimonial",
  description:
    "Honest feedback from 12,400+ guests across 41 countries — the good and the awkward. Read what travellers say about Vera Bali Tour.",
};

export default function Page() {
  return <TestimonialView />;
}
