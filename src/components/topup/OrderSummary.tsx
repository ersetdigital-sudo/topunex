import type { Game, Pricing } from "@/lib/types";

interface Props {
  game: Game;
  userId: string;
  serverId: string;
  selected: Pricing | null;
  note: string;
  noteColor: string;
  onBuy: () => void;
}

export function OrderSummary({
  game,
  userId,
  serverId,
  selected,
  note,
  noteColor,
  onBuy,
}: Props) {
  const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

  return (
    <aside className="glass rounded-3xl p-6 lg:sticky lg:top-24">
      <p className="text-xs font-bold tracking-widest text-[#9C9791]">
        RINGKASAN PESANAN
      </p>
      <div className="mt-4 flex items-center gap-3">
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
          <p className="text-xs text-[#9C9791]">
            {game.slug.includes("pubg")
              ? "UC"
              : game.slug.includes("call-of-duty")
                ? "CP"
                : game.slug.includes("magic-chess")
                  ? "Diamond / Pass"
                  : "Diamond"}
          </p>
        </div>
      </div>
      <dl className="mt-5 space-y-2.5 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-[#9C9791]">{game.user_id_label}</dt>
          <dd className="font-semibold text-right">
            {userId.trim() || "\u2014"}
          </dd>
        </div>
        {!game.hide_server_id && (
          <div className="flex justify-between gap-3">
            <dt className="text-[#9C9791]">{game.server_id_label}</dt>
            <dd className="font-semibold text-right">
              {serverId.trim() || "\u2014"}
            </dd>
          </div>
        )}
        <div className="flex justify-between gap-3">
          <dt className="text-[#9C9791]">Nominal</dt>
          <dd className="font-semibold text-right">
            {selected?.nominal_label || "\u2014"}
          </dd>
        </div>
      </dl>
      <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between">
        <span className="text-sm text-[#9C9791]">Total</span>
        <span className="font-['Archivo'] text-2xl font-bold text-[#FF6A00]">
          {selected ? fmt(selected.price) : "Rp0"}
        </span>
      </div>
      <button
        onClick={onBuy}
        className="btn-primary mt-5 w-full rounded-2xl py-3.5 text-sm font-bold"
      >
        Lanjut ke Pembayaran
      </button>
      <p
        className="mt-3 text-xs text-center"
        style={{ color: noteColor || "#9C9791" }}
      >
        {note}
      </p>
    </aside>
  );
}
