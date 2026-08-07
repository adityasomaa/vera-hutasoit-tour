import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TOUR_FORMATS, TOURS } from "@/lib/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-07");

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/tour", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/testimonial", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-use", priority: 0.3 },
  ];

  const formatRoutes = TOUR_FORMATS.map((f) => ({
    path: `/tour/${f}`,
    priority: 0.9,
  }));

  const tourRoutes = TOURS.map((t) => ({
    path: `/tour/${t.format}/${t.slug}`,
    priority: 0.85,
  }));

  return [...staticRoutes, ...formatRoutes, ...tourRoutes].map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
