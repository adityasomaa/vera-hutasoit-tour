import Image from "next/image";
import { PHOTOS, pexelsUrl, type PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * A photograph filling its (positioned) parent. The average colour sits
 * underneath so there is no white flash before the image decodes.
 */
export function Photo({
  name,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className,
}: {
  name: PhotoKey;
  /** Empty string when the image only repeats an adjacent heading. */
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const photo = PHOTOS[name];
  return (
    <Image
      src={pexelsUrl(photo.id, 1600)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("object-cover", className)}
      style={{ backgroundColor: photo.bg }}
    />
  );
}
