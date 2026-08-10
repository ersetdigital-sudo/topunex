import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Game } from "@/lib/types";
import { PAYMENT_METHODS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { GameCatalog } from "@/components/landing/GameCatalog";
import { WhySection } from "@/components/landing/WhySection";
import { StepsSection } from "@/components/landing/StepsSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTABanner } from "@/components/landing/CTABanner";
import { StickyCTA } from "@/components/layout/StickyCTA";

// Always fetch fresh data from Supabase (no cache)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: games } = await supabase
    .from("games")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  const gamesList = (games || []) as Game[];

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <GameCatalog games={gamesList} />
      <WhySection />
      <StepsSection />
      <SecuritySection />
      <FAQSection />
      <CTABanner />
      <Footer games={gamesList} />
      <StickyCTA />
    </>
  );
}
