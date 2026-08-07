"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Resize through Pexels rather than Vercel's image optimizer.
 *
 * Pexels already serves compressed, arbitrarily-sized renditions from its own
 * CDN, so routing through /_next/image would add a second hop and burn the
 * project's optimization quota (which returns 402 once exhausted, breaking
 * every image on the site). Next still builds a responsive srcSet — it just
 * asks this loader for each width.
 */
export default function pexelsLoader({ src, width, quality }: ImageLoaderProps) {
  try {
    const url = new URL(src);
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(Math.min(width, 1920)));
    url.searchParams.delete("h");
    if (quality) url.searchParams.set("q", String(quality));
    return url.toString();
  } catch {
    return src;
  }
}
