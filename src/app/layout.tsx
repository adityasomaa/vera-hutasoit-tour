import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/loaders/IntroLoader";
import { PageCurtain } from "@/components/loaders/PageCurtain";
import { CookieConsent } from "@/components/cookie/CookieConsent";
import { TourRequestModal } from "@/components/modals/TourRequestModal";
import {
  BackToTop,
  LanguageSwitch,
  WhatsAppButton,
} from "@/components/floating/FloatingUI";
import { ScrollProgress } from "@/components/layout/Chrome";
import { SITE } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Private, Sharing & Custom Bali Tours`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "A small, licensed Bali tour operator running private, sharing and fully customized day trips since 2014. Flat pricing, real local guides, flexible routes.",
  keywords: [
    "Bali tour",
    "private tour Bali",
    "sharing tour Bali",
    "custom Bali itinerary",
    "Nusa Penida day trip",
    "Mount Batur sunrise",
    "Ubud tour",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — See Bali like a local, not a list`,
    description:
      "Private, sharing and fully customized Bali day trips. Flat pricing, licensed local guides, routes that bend around you.",
    url: SITE.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — See Bali like a local`,
    description:
      "Private, sharing and fully customized Bali day trips since 2014.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06171D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body className="relative min-h-dvh antialiased">
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-sand"
          >
            Skip to content
          </a>

          <ScrollProgress />

          <IntroLoader />
          <PageCurtain />

          <Navbar />
          <main id="content" className="relative z-10">
            {children}
          </main>
          <Footer />

          <WhatsAppButton />
          <LanguageSwitch />
          <BackToTop />

          <CookieConsent />
          <TourRequestModal />
        </Providers>
      </body>
    </html>
  );
}
