import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Game, Pricing } from "@/lib/types";
import { PAYMENT_METHODS } from "@/lib/constants";
import { TopUpForm } from "@/components/topup/TopUpForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OtherGames } from "@/components/topup/OtherGames";

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

  const gameData = game as Game;
  const pricingList = (pricing || []) as Pricing[];
  const otherGames = ((allGames || []) as Game[]).filter(
    (g) => g.id !== gameData.id
  );

  const currencyLabel = gameData.slug.includes("pubg")
    ? "UC"
    : gameData.slug.includes("call-of-duty")
      ? "CP"
      : gameData.slug.includes("magic-chess")
        ? "Diamond / Pass"
        : "Diamond";

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <nav className="text-xs text-[#9C9791]">
            <a href="/" className="hover:text-white">
              Beranda
            </a>{" "}
            <span className="mx-1.5">/</span>{" "}
            <a href="/#game" className="hover:text-white">
              Top Up
            </a>{" "}
            <span className="mx-1.5">/</span>{" "}
            <span className="text-white">{gameData.name}</span>
          </nav>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              src={gameData.icon_url}
              alt={gameData.name}
              className={`h-24 w-24 rounded-2xl object-cover border border-white/10 ${
                gameData.slug === "call-of-duty-mobile"
                  ? "shrink-0 object-contain logo-plate"
                  : ""
              }`}
            />
            <div>
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold tracking-widest text-[#9C9791]">
                {currencyLabel.toUpperCase()}
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-bold font-['Archivo']">
                Top Up {gameData.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[#9C9791] leading-relaxed">
                {gameData.slug === "mobile-legends"
                  ? "Diamond dikirim langsung ke User ID + Zone ID kamu. Buat kejar skin baru, Starlight, atau isi cepat sebelum ranked malam ini."
                  : gameData.slug === "free-fire"
                    ? "Cukup User ID. Diamond masuk otomatis begitu pembayaran terkonfirmasi — buat Elite Pass, bundle, atau spin."
                    : gameData.slug === "pubg-mobile"
                      ? "UC untuk Royale Pass, crate opening, dan skin senjata. Tanpa login ke akun kamu."
                      : gameData.slug === "call-of-duty-mobile"
                        ? "CP untuk Battle Pass, crate, dan senjata favorit. Proses langsung ke User ID kamu."
                        : "Diamond atau Magic Pass, dikirim ke User ID + Zone ID kamu. Alurnya persis Mobile Legends."}
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9C9791]">
            <span>
              <span className="text-[#FF6A00] font-bold">&#10003;</span> Proses
              otomatis 24/7
            </span>
            <span>
              <span className="text-[#FF6A00] font-bold">&#10003;</span> Tanpa
              password &amp; OTP
            </span>
            <span>
              <span className="text-[#FF6A00] font-bold">&#10003;</span> QRIS,
              e-wallet, transfer bank
            </span>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <TopUpForm game={gameData} pricing={pricingList} />

      {/* Other Games */}
      <OtherGames games={otherGames} />

      <Footer games={otherGames} />
    </>
  );
}
