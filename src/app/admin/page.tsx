import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Game, Pricing } from "@/lib/types";

export const metadata = {
  title: "Dashboard — Topunex Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: games } = await supabase
    .from("games")
    .select("*")
    .order("sort_order");

  const { data: pricing } = await supabase
    .from("pricing")
    .select("*, games(name, slug)")
    .order("sort_order");

  const gamesList = (games || []) as Game[];
  const pricingList = (pricing || []) as Pricing[];

  const getPricingForGame = (gameId: string) =>
    pricingList.filter((p) => p.game_id === gameId);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-['Archivo'] text-3xl font-bold">Games</h1>
          <p className="mt-1 text-sm text-[#9C9791]">
            Kelola game, nominal, dan harga.
          </p>
        </div>
        <Link
          href="/admin/games/new"
          className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-all duration-180 hover:-translate-y-0.5"
        >
          + Tambah Game
        </Link>
      </div>

      <div className="space-y-4">
        {gamesList.map((game) => {
          const gamePricing = getPricingForGame(game.id);
          return (
            <div
              key={game.id}
              className="glass rounded-2xl p-6 border border-white/10 bg-[#111]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={game.icon_url}
                    alt={game.name}
                    className="h-14 w-14 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{game.name}</h2>
                    <p className="text-xs text-[#9C9791]">
                      {gamePricing.length} nominal · {game.range_label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      game.is_active
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {game.is_active ? "Active" : "Inactive"}
                  </span>
                  <Link
                    href={`/admin/games/${game.slug}`}
                    className="text-sm text-[#FF6A00] hover:text-[#FF8A2B] font-semibold transition"
                  >
                    Edit →
                  </Link>
                </div>
              </div>

              {/* Pricing Preview */}
              <div className="mt-4 flex flex-wrap gap-2">
                {gamePricing.slice(0, 6).map((p) => (
                  <span
                    key={p.id}
                    className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[#9C9791]"
                  >
                    {p.nominal_label}{" "}
                    <span className="text-[#FF6A00] font-semibold">
                      Rp{p.price.toLocaleString("id-ID")}
                    </span>
                  </span>
                ))}
                {gamePricing.length > 6 && (
                  <span className="text-xs text-[#9C9791] px-3 py-1.5">
                    +{gamePricing.length - 6} lainnya
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
