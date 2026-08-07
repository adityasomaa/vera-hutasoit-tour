"use client";

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { TourModalProvider } from "@/components/providers/TourModalProvider";
import { HeaderToneProvider } from "@/components/providers/HeaderToneProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ConsentProvider>
        <TransitionProvider>
          <HeaderToneProvider>
            <TourModalProvider>{children}</TourModalProvider>
          </HeaderToneProvider>
        </TransitionProvider>
      </ConsentProvider>
    </LanguageProvider>
  );
}
