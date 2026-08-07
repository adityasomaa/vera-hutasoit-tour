"use client";

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { TourModalProvider } from "@/components/providers/TourModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ConsentProvider>
        <TransitionProvider>
          <TourModalProvider>{children}</TourModalProvider>
        </TransitionProvider>
      </ConsentProvider>
    </LanguageProvider>
  );
}
