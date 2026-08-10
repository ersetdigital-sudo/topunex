"use client";

import { useState, useEffect } from "react";
import type { Game, Pricing } from "@/lib/types";
import { PAYMENT_METHODS } from "@/lib/constants";
import { OtherGames } from "./OtherGames";

interface Props {
  game: Game;
  pricing: Pricing[];
}

export function TopUpClient({ game, pricing }: Props) {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selected, setSelected] = useState<Pricing | null>(
    pricing.find((p) => p.badge) || pricing[0] || null
  );
  const [note, setNote] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const [showBottomBar, setShowBottomBar] = useState(false);

  const currencyLabel = game.slug.includes("pubg")
    ? "UC"
    : game.slug.includes("call-of-duty")
      ? "CP"
      : game.slug.includes("magic-chess")
        ? "Diamond / Pass"
        : "Diamond";

  const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

  // Show bottom bar after scrolling past the nominal section
  useEffect(() => {
    const handleScroll = () => {
      setShowBottomBar(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const description =
    game.slug === "mobile-legends"
      ? "Diamond dikirim langsung ke User ID + Zone ID kamu. Buat kejar skin baru, Starlight, atau isi cepat sebelum ranked malam ini."
      : game.slug === "free-fire"
        ? "Cukup User ID. Diamond masuk otomatis begitu pembayaran terkonfirmasi — buat Elite Pass, bundle, atau spin."
        : game.slug === "pubg-mobile"
          ? "UC untuk Royale Pass, crate opening, dan skin senjata. Tanpa login ke akun kamu."
          : game.slug === "call-of-duty-mobile"
            ? "CP untuk Battle Pass, crate, dan senjata favorit. Proses langsung ke User ID kamu."
            : "Diamond atau Magic Pass, dikirim ke User ID + Zone ID kamu. Alurnya persis Mobile Legends.";

  const idGuide =
    game.slug === "mobile-legends" || game.slug === "magic-chess-go-go"
      ? `Buka Profil di pojok kiri atas lobi. ${game.user_id_label} dan ${game.server_id_label} tertulis di bawah nama kamu.`
      : game.slug === "free-fire"
        ? "Ketuk foto profil di pojok kiri atas lobi. User ID berupa angka yang tampil di bawah nickname kamu."
        : game.slug === "pubg-mobile"
          ? "Buka menu Inventory → Profil. Angka Character ID di bawah nickname itulah User ID kamu."
          : "Buka Profil di lobi, lalu lihat baris UID di bawah nickname. Salin angkanya.";

  return (
    <>
      {/* Mobile: Hot-Pot Product Detail Style */}
      <div className="lg:hidden">
        {/* Hero Image */}
        <div className="relative bg-gradient-to-b from-[#111] to-[#0A0A0A] border-b border-white/10">
          <div className="flex items-center justify-center py-10">
            <img
              src={game.icon_url}
              alt={game.name}
              className={`h-32 w-32 rounded-3xl object-cover border border-white/10 shadow-2xl ${
                game.slug === "call-of-duty-mobile"
                  ? "object-contain logo-plate"
                  : ""
              }`}
            />
          </div>
        </div>

        {/* Game Info */}
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#FF6A00] tracking-wider">
              {currencyLabel.toUpperCase()}
            </span>
            <div className="flex gap-1.5 text-[10px] text-[#9C9791]">
              <span className="flex items-center gap-1">
                <span className="text-[#FF6A00]">&#10003;</span> Otomatis
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <span className="text-[#FF6A00]">&#10003;</span> Tanpa OTP
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold font-['Archivo']">{game.name}</h1>
          <p className="mt-2 text-sm text-[#9C9791] leading-relaxed">
            {description}
          </p>
        </div>

        {/* User ID Input */}
        <div className="px-4 mt-2">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-bold tracking-widest text-[#9C9791] mb-3">
              LANGKAH 1 — MASUKKAN ID
            </p>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="uid-mobile"
                  className="text-[11px] font-semibold text-[#9C9791] block mb-1.5"
                >
                  {game.user_id_label}
                </label>
                <input
                  id="uid-mobile"
                  inputMode="numeric"
                  placeholder={game.user_id_placeholder}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                />
              </div>
              {!game.hide_server_id && (
                <div>
                  <label
                    htmlFor="zone-mobile"
                    className="text-[11px] font-semibold text-[#9C9791] block mb-1.5"
                  >
                    {game.server_id_label}
                  </label>
                  <input
                    id="zone-mobile"
                    inputMode="numeric"
                    placeholder={game.server_id_placeholder}
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                  />
                </div>
              )}
            </div>
            <p className="mt-3 text-[11px] text-[#9C9791] leading-relaxed">
              {idGuide}
            </p>
          </div>
        </div>

        {/* Nominal Picker */}
        <div className="px-4 mt-4">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-bold tracking-widest text-[#9C9791] mb-3">
              LANGKAH 2 — PILIH NOMINAL
            </p>
            <div className="grid grid-cols-3 gap-2">
              {pricing.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`relative rounded-xl p-3 text-center border transition-all duration-150 ${
                    selected?.id === p.id
                      ? "border-[#FF6A00] bg-[#FF6A00]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  {p.badge && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-[#FF6A00] px-2 py-0.5 text-[8px] font-bold text-black whitespace-nowrap">
                      {p.badge === "terlaris" ? "POPULER" : p.badge.toUpperCase()}
                    </span>
                  )}
                  <p className="text-xs font-bold leading-tight">
                    {p.nominal_label}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold text-[#FF6A00]">
                    {fmt(p.price)}
                  </p>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#9C9791] text-center">
              Harga sudah final. Tanpa biaya admin tambahan.
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="px-4 mt-4 pb-28">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-bold tracking-widest text-[#9C9791] mb-3">
              LANGKAH 3 — BAYAR
            </p>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map((m) => (
                <div
                  key={m}
                  className="rounded-xl border border-white/10 px-3 py-2.5 text-center text-xs font-semibold"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
          {note && (
            <p
              className="mt-3 text-xs text-center px-4"
              style={{ color: noteColor || "#9C9791" }}
            >
              {note}
            </p>
          )}
        </div>

        {/* Fixed Bottom Bar (mobile) */}
        <div
          className={`fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-[#111]/95 backdrop-blur-lg transition-all duration-300 ${
            showBottomBar
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#9C9791]">Total</p>
              <p className="font-['Archivo'] text-lg font-bold text-[#FF6A00] truncate">
                {selected ? fmt(selected.price) : "Rp0"}
              </p>
            </div>
            <button
              onClick={handleBuy}
              className="btn-primary rounded-xl px-6 py-3 text-sm font-bold whitespace-nowrap"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Original Layout */}
      <div className="hidden lg:block">
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          {/* Hero Banner */}
          <div className="glass rounded-3xl p-8 flex items-center gap-8">
            <img
              src={game.icon_url}
              alt={game.name}
              className={`h-24 w-24 rounded-2xl object-cover border border-white/10 ${
                game.slug === "call-of-duty-mobile"
                  ? "shrink-0 object-contain logo-plate"
                  : ""
              }`}
            />
            <div>
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold tracking-widest text-[#9C9791]">
                {currencyLabel.toUpperCase()}
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-bold font-['Archivo']">
                Top Up {game.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[#9C9791] leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9C9791]">
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
        </section>

        {/* Desktop Order Grid */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
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
                    htmlFor="uid-desktop"
                    className="text-xs font-semibold tracking-widest text-[#9C9791]"
                  >
                    {game.user_id_label.toUpperCase()}
                  </label>
                  <input
                    id="uid-desktop"
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
                      htmlFor="zone-desktop"
                      className="text-xs font-semibold tracking-widest text-[#9C9791]"
                    >
                      {game.server_id_label.toUpperCase()}
                    </label>
                    <input
                      id="zone-desktop"
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
                {idGuide}
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
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`relative text-left rounded-2xl px-4 py-4 border transition-all duration-150 ${
                      selected?.id === p.id
                        ? "border-[#FF6A00] bg-[#FF6A00]/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-2 right-3 rounded-full bg-[#FF6A00] px-2 py-0.5 text-[10px] font-bold text-black">
                        {p.badge === "terlaris"
                          ? "POPULER"
                          : p.badge.toUpperCase()}
                      </span>
                    )}
                    <p className="font-['Archivo'] text-base font-bold">
                      {p.nominal_label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#FF6A00]">
                      {fmt(p.price)}
                    </p>
                  </button>
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

          {/* Desktop Summary Sidebar */}
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
                <p className="text-xs text-[#9C9791]">{currencyLabel}</p>
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
              onClick={handleBuy}
              className="btn-primary mt-5 w-full rounded-2xl py-3.5 text-sm font-bold"
            >
              Lanjut ke Pembayaran
            </button>
            {note && (
              <p
                className="mt-3 text-xs text-center"
                style={{ color: noteColor || "#9C9791" }}
              >
                {note}
              </p>
            )}
          </aside>
        </section>
      </div>
    </>
  );
}
