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

  const totalNominal = pricingList.length;
  const activeGames = gamesList.filter((g) => g.is_active).length;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Game", value: gamesList.length, color: "#FF6A00" },
          { label: "Active", value: activeGames, color: "#22c55e" },
          { label: "Total Nominal", value: totalNominal, color: "#3b82f6" },
          { label: "Payment", value: "QRIS", color: "#a855f7" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-4 border border-white/10 bg-[#111]">
            <p className="text-xs font-semibold text-[#9C9791]">{stat.label}</p>
            <p className="font-['Archivo'] text-2xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Archivo'] text-3xl font-bold">Games</h1>
          <p className="mt-1 text-sm text-[#9C9791]">Kelola game, nominal, dan harga.</p>
        </div>
        <Link
          href="/admin/games/new"
          className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-all duration-180 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tambah Game
        </Link>
      </div>

      {/* Game Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gamesList.map((game) => {
          const gamePricing = getPricingForGame(game.id);
          return (
            <Link
              key={game.id}
              href={`/admin/games/${game.slug}`}
              className="glass rounded-2xl p-5 border border-white/10 bg-[#111] hover:border-[#FF6A00]/40 hover:bg-[#131313] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={game.icon_url}
                    alt={game.name}
                    className="h-12 w-12 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h2 className="font-bold group-hover:text-[#FF6A00] transition">{game.name}</h2>
                    <p className="text-xs text-[#9C9791]">{gamePricing.length} nominal</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  game.is_active
                    ? "bg-green-500/15 text-green-400"
                    : "bg-red-500/15 text-red-400"
                }`}>
                  {game.is_active ? "ON" : "OFF"}
                </span>
              </div>

              {/* Price Range */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#9C9791]">{game.range_label}</span>
                <span className="text-[#FF6A00] group-hover:translate-x-1 transition-transform">Edit →</span>
              </div>

              {/* Mini Price Preview */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {gamePricing.slice(0, 4).map((p) => (
                  <span key={p.id} className="text-[10px] bg-white/5 border border-white/5 rounded-md px-2 py-0.5 text-[#9C9791]">
                    {p.nominal_label}
                  </span>
                ))}
                {gamePricing.length > 4 && (
                  <span className="text-[10px] text-[#FF6A00] px-2 py-0.5">+{gamePricing.length - 4}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
