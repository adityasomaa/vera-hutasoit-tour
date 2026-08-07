import type { Metadata } from "next";
import { AboutView } from "@/views/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vera Bali Tour started in 2014 with one car and a very long list of favourite places. Meet the small team behind the trips.",
};

export default function Page() {
  return <AboutView />;
}
