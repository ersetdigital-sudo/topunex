import Link from "next/link";
import type { Game } from "@/lib/types";

export function OtherGames({ games }: { games: Game[] }) {
  return (
    <section className="border-t border-white/10 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold">Game lain di Topunex</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/top-up/${game.slug}`}
              className="glass card-hover rounded-2xl p-4 flex items-center gap-3"
            >
              <img
                src={game.icon_url}
                alt={game.name}
                className={`h-11 w-11 rounded-lg object-cover ${
                  game.slug === "call-of-duty-mobile"
                    ? "shrink-0 object-contain logo-plate"
                    : ""
                }`}
              />
              <div>
                <p className="font-bold text-sm">{game.name}</p>
                <p className="text-xs text-[#FF6A00] font-semibold">
                  {game.slug === "magic-chess-go-go"
                    ? "Diamond / Pass"
                    : game.slug === "pubg-mobile"
                      ? "UC"
                      : game.slug === "call-of-duty-mobile"
                        ? "CP"
                        : "Diamond"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
