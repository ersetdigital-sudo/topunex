"use client";

import { useState } from "react";
import type { Game, Pricing } from "@/lib/types";
import { PAYMENT_METHODS } from "@/lib/constants";
import { OrderSummary } from "./OrderSummary";

interface Props {
  game: Game;
  pricing: Pricing[];
}

export function TopUpForm({ game, pricing }: Props) {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selected, setSelected] = useState<Pricing | null>(
    pricing.find((p) => p.badge) || pricing[0] || null
  );
  const [note, setNote] = useState("Pastikan User ID benar sebelum membayar.");
  const [noteColor, setNoteColor] = useState("");

  const handleBuy = () => {
    if (!userId.trim() || (!game.hide_server_id && !serverId.trim())) {
      setNote(
        game.hide_server_id
          ? "Lengkapi User ID dulu ya."
          : "Lengkapi User ID dan Zone ID dulu ya."
      );
      setNoteColor("#FF6A00");
      return;
    }
    setNoteColor("");
    setNote("Pesanan siap. Hubungkan metode pembayaran untuk melanjutkan.");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
      <div>
        {/* Step 1 */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#FF6A00] text-white grid place-items-center text-xs font-bold">
              1
            </span>
            <h2 className="text-lg font-bold">
              Masukkan {game.user_id_label}
              {!game.hide_server_id && ` & ${game.server_id_label}`}
            </h2>
          </div>
          <div
            className={`mt-5 grid gap-4 ${
              game.hide_server_id ? "" : "sm:grid-cols-2"
            }`}
          >
            <div>
              <label
                htmlFor="uid"
                className="text-xs font-semibold tracking-widest text-[#9C9791]"
              >
                {game.user_id_label.toUpperCase()}
              </label>
              <input
                id="uid"
                inputMode="numeric"
                placeholder={game.user_id_placeholder}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
              />
            </div>
            {!game.hide_server_id && (
              <div>
                <label
                  htmlFor="zone"
                  className="text-xs font-semibold tracking-widest text-[#9C9791]"
                >
                  {game.server_id_label.toUpperCase()}
                </label>
                <input
                  id="zone"
                  inputMode="numeric"
                  placeholder={game.server_id_placeholder}
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                />
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-[#9C9791] leading-relaxed">
            {game.slug === "mobile-legends" || game.slug === "magic-chess-go-go"
              ? `Buka Profil di pojok kiri atas lobi. ${game.user_id_label} dan ${game.server_id_label} tertulis di bawah nama kamu.`
              : game.slug === "free-fire"
                ? "Ketuk foto profil di pojok kiri atas lobi. User ID berupa angka yang tampil di bawah nickname kamu."
                : game.slug === "pubg-mobile"
                  ? "Buka menu Inventory → Profil. Angka Character ID di bawah nickname itulah User ID kamu."
                  : "Buka Profil di lobi, lalu lihat baris UID di bawah nickname. Salin angkanya."}
          </p>
        </div>

        {/* Step 2 */}
        <div
          id="nominal"
          className="glass rounded-3xl p-6 mt-5 scroll-mt-24"
        >
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#FF6A00] text-white grid place-items-center text-xs font-bold">
              2
            </span>
            <h2 className="text-lg font-bold">Pilih nominal</h2>
          </div>
          <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3">
            {pricing.map((p) => (
              <label key={p.id} className="denom relative">
                <input
                  type="radio"
                  name="nominal"
                  value={p.nominal_label}
                  checked={selected?.id === p.id}
                  onChange={() => setSelected(p)}
                  className="sr-only"
                />
                <div className="denom-box glass rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
                  {p.badge && (
                    <span className="absolute -top-2 right-3 rounded-full bg-[#FF6A00] px-2 py-0.5 text-[10px] font-bold text-black">
                      {p.badge === "terlaris" ? "POPULER" : p.badge.toUpperCase()}
                    </span>
                  )}
                  <p className="font-['Archivo'] text-base font-bold">
                    {p.nominal_label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#FF6A00]">
                    Rp{p.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#9C9791]">
            Harga sudah final. Tidak ada biaya admin tambahan di akhir.
          </p>
        </div>

        {/* Step 3 */}
        <div className="glass rounded-3xl p-6 mt-5">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#FF6A00] text-white grid place-items-center text-xs font-bold">
              3
            </span>
            <h2 className="text-lg font-bold">Metode pembayaran</h2>
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-semibold">
            {PAYMENT_METHODS.map((m) => (
              <div
                key={m}
                className="rounded-xl border border-white/10 px-3 py-3 text-center"
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <OrderSummary
        game={game}
        userId={userId}
        serverId={serverId}
        selected={selected}
        note={note}
        noteColor={noteColor}
        onBuy={handleBuy}
      />
    </section>
  );
}
