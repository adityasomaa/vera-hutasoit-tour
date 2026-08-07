import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/tour", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/testimonial", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-use", priority: 0.3 },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: new Date("2026-08-07"),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
