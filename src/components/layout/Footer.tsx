import Link from "next/link";
import type { Game } from "@/lib/types";

export function Footer({ games }: { games: Game[] }) {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="h-8 w-8 rounded-xl grid place-items-center"
              style={{ background: "#FF6A00" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#0A0A0A"
              >
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
            </span>
            <span className="font-['Archivo'] text-lg font-bold">
              topunex<span className="text-[#FF6A00]">.</span>com
            </span>
          </div>
          <p className="mt-3 text-sm text-[#9C9791] max-w-xs">
            Top up game buat pemain Indonesia. Cepat, harganya jujur, dan nggak
            minta data yang nggak perlu.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Game</p>
          <ul className="mt-3 space-y-2 text-[#9C9791]">
            {games.map((game) => (
              <li key={game.id}>
                <Link
                  href={`/top-up/${game.slug}`}
                  className="hover:text-white transition"
                >
                  {game.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-bold">Bantuan</p>
          <ul className="mt-3 space-y-2 text-[#9C9791]">
            <li>
              <a href="#cara" className="hover:text-white transition">
                Cara top up
              </a>
            </li>
            <li>
              <a href="#aman" className="hover:text-white transition">
                Keamanan akun
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 pt-6 border-t border-white/10 text-xs text-[#9C9791]">
        <p>
          &copy; 2026 topunex.com. Seluruh nama dan aset game adalah milik
          penerbit masing-masing. Topunex tidak berafiliasi dengan Moonton,
          Garena, Tencent, atau Activision.
        </p>
      </div>
    </footer>
  );
}
