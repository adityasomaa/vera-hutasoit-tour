import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourDetailView } from "@/views/TourDetailView";
import { TOURS, findTour, isTourFormat } from "@/lib/tours";

type Params = { params: Promise<{ format: string; slug: string }> };

export function generateStaticParams() {
  return TOURS.map((t) => ({ format: t.format, slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { format, slug } = await params;
  const tour = findTour(format, slug);
  if (!tour) return {};
  return {
    title: tour.name.en,
    description: `${tour.tagline.en} ${tour.duration.en}, ${tour.group.en}, from ${tour.price.en}.`,
  };
}

export default async function Page({ params }: Params) {
  const { format, slug } = await params;
  if (!isTourFormat(format)) notFound();
  const tour = findTour(format, slug);
  if (!tour) notFound();
  return <TourDetailView tour={tour} />;
}
