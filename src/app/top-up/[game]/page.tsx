import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Game, Pricing } from "@/lib/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TopUpClient } from "@/components/topup/TopUpClient";

interface Props {
  params: Promise<{ game: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("games")
    .select("name")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Not Found" };

  return {
    title: `Top Up ${data.name} Murah & Instan`,
    description: `Top up ${data.name} di Topunex. Cukup User ID, tanpa password dan OTP. Harga transparan, proses otomatis, bayar pakai QRIS atau e-wallet.`,
  };
}

export default async function TopUpPage({ params }: Props) {
  const { game: slug } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!game) notFound();

  const { data: pricing } = await supabase
    .from("pricing")
    .select("*")
    .eq("game_id", game.id)
    .order("sort_order");

  const { data: allGames } = await supabase
    .from("games")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  const { data: settings } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "qris_image_url")
    .single();

  const gameData = game as Game;
  const pricingList = (pricing || []) as Pricing[];
  const otherGames = ((allGames || []) as Game[]).filter(
    (g) => g.id !== gameData.id
  );
  const qrisUrl = settings?.value || "";

  return (
    <>
      <Navbar />
      <div className="pt-20 sm:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Top Up", href: "/#game" },
              { label: gameData.name },
            ]}
            className="py-4"
          />
        </div>
      </div>
      <TopUpClient game={gameData} pricing={pricingList} qrisUrl={qrisUrl} />
      <div className="hidden sm:block">
        <Footer games={otherGames} />
      </div>
    </>
  );
}
