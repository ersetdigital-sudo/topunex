import Link from "next/link";
import type { Game } from "@/lib/types";

export function GameCatalog({ games }: { games: Game[] }) {
  const ml = games.find((g) => g.slug === "mobile-legends");
  const others = games.filter((g) => g.slug !== "mobile-legends");

  return (
    <section id="game" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#FF6A00]">
              KATALOG
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
              Lima game. Satu alur.
            </h2>
            <p className="mt-3 text-[#9C9791] max-w-xl">
              Kami nggak mengejar jumlah. Kami fokus pada game yang paling
              banyak dimainkan di Indonesia — supaya harga tetap kompetitif dan
              proses tetap cepat.
            </p>
          </div>
          <a
            href="#cara"
            className="text-sm font-semibold text-[#FF6A00] hover:underline"
          >
            Lihat cara top up &rarr;
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mobile Legends — featured */}
          {ml && (
            <Link
              href={`/top-up/${ml.slug}`}
              className="card-hover glass rounded-3xl p-6 sm:row-span-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-2.5 py-1 text-[11px] font-bold text-white bg-[#FF6A00]">
                    PALING DICARI
                  </span>
                  <span className="text-xs text-[#9C9791]">Diamond</span>
                </div>
                <img
                  src={ml.icon_url}
                  alt={ml.name}
                  className="mt-6 h-24 w-24 rounded-2xl object-cover"
                />
                <h3 className="mt-5 text-2xl font-bold">{ml.name}</h3>
                <p className="mt-2.5 text-sm text-[#9C9791] leading-relaxed">
                  Top up langsung ke akun. Cukup masukkan User ID dan Zone ID,
                  pilih nominal, lalu bayar.
                </p>
              </div>
              <span className="mt-7 btn-primary inline-flex w-max items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold">
                Top Up {ml.name} <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          )}

          {/* Other games */}
          {others.map((game) => (
            <Link
              key={game.id}
              href={`/top-up/${game.slug}`}
              className="card-hover glass rounded-3xl p-6 block"
            >
              <div className="flex items-center gap-4">
                <img
                  src={game.icon_url}
                  alt={game.name}
                  className={`h-14 w-14 rounded-xl object-cover ${
                    game.slug === "call-of-duty-mobile"
                      ? "shrink-0 object-contain logo-plate"
                      : ""
                  }`}
                />
                <div>
                  <h3 className="text-lg font-bold">{game.name}</h3>
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
              </div>
              <p className="mt-4 text-sm text-[#9C9791]">
                {game.slug === "free-fire"
                  ? "Masukkan User ID, pilih nominal Diamond, dan selesaikan pembayaran."
                  : game.slug === "pubg-mobile"
                    ? "Isi UC untuk Royale Pass, crate, dan kebutuhan in-game lainnya. Tanpa login ke akun."
                    : game.slug === "call-of-duty-mobile"
                      ? "Top up CP untuk kebutuhan in-game dengan proses cepat dan praktis."
                      : "Pilih nominal Diamond, masukkan User ID, lalu bayar. Selesai tanpa ribet."}
              </p>
              <span className="card-cta mt-5 inline-flex items-center gap-1.5 text-[#FF6A00] font-bold text-sm transition-all duration-180">
                Top Up {game.name} <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
