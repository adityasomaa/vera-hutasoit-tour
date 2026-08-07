import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourListView } from "@/views/TourListView";
import { TOUR_FORMATS, isTourFormat, toursByFormat } from "@/lib/tours";

type Params = { params: Promise<{ format: string }> };

export function generateStaticParams() {
  return TOUR_FORMATS.map((format) => ({ format }));
}

const COPY = {
  private: {
    title: "Private Tours",
    description:
      "Your own car, driver-guide and pace. Browse our private Bali day tours: Ubud culture, Nusa Penida and the Mount Batur sunrise trek.",
  },
  sharing: {
    title: "Sharing Tours",
    description:
      "Small fixed-departure groups, twelve seats maximum and all entrance tickets included. Browse our shared Bali day tours.",
  },
} as const;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { format } = await params;
  if (!isTourFormat(format)) return {};
  return COPY[format];
}

export default async function Page({ params }: Params) {
  const { format } = await params;
  if (!isTourFormat(format)) notFound();
  if (toursByFormat(format).length === 0) notFound();
  return <TourListView format={format} />;
}
