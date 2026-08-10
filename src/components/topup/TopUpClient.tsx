"use client";

import { useState, useEffect } from "react";
import type { Game, Pricing } from "@/lib/types";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop; // null = SSR, true/false = client
}

interface Props {
  game: Game;
  pricing: Pricing[];
  qrisUrl: string;
  waNumber: string;
}

export function TopUpClient({ game, pricing, qrisUrl, waNumber }: Props) {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selected, setSelected] = useState<Pricing | null>(
    pricing.find((p) => p.badge) || pricing[0] || null
  );
  const [note, setNote] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const isDesktop = useIsDesktop();

  const currencyLabel = game.slug.includes("pubg")
    ? "UC"
    : game.slug.includes("call-of-duty")
      ? "CP"
      : game.slug.includes("magic-chess")
        ? "Diamond / Pass"
        : "Diamond";

  const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

  useEffect(() => {
    const handleScroll = () => setShowBottomBar(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (showQris) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showQris]);

  const handlePay = () => {
    if (!userId.trim()) {
      setNote("User ID wajib diisi.");
      setNoteColor("#FF6A00");
      return;
    }
    if (!game.hide_server_id && !serverId.trim()) {
      setNote(`${game.server_id_label} wajib diisi.`);
      setNoteColor("#FF6A00");
      return;
    }
    setShowQris(true);
  };

  const handleWhatsApp = () => {
    if (!waNumber) return;
    const msg = encodeURIComponent(
      `Halo, saya ingin konfirmasi pembayaran top up ${game.name}.\n\nUser ID: ${userId}${!game.hide_server_id ? `\n${game.server_id_label}: ${serverId}` : ""}\nNominal: ${selected?.nominal_label || "-"}\nTotal: ${selected ? fmt(selected.price) : "Rp0"}`
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
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
      {/* ===== QRIS MODAL ===== */}
      {showQris && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowQris(false)}
          />

          {isDesktop ? (
            /* Desktop: Centered Modal */
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-[#111] rounded-3xl border border-white/10 overflow-hidden">
                <div className="relative px-6 pt-8 pb-4 text-center">
                  <button
                    onClick={() => setShowQris(false)}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 grid place-items-center text-[#9C9791] hover:text-white transition"
                  >
                    ✕
                  </button>
                  <div className="h-12 w-12 rounded-2xl bg-green-500/15 border border-green-500/30 grid place-items-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <h2 className="font-['Archivo'] text-xl font-bold">Pembayaran QRIS</h2>
                  <p className="mt-1.5 text-sm text-[#9C9791]">Scan kode QR untuk menyelesaikan pembayaran</p>
                </div>
                <div className="px-6 pb-4">
                  <div className="bg-white rounded-2xl p-4 flex items-center justify-center">
                    {qrisUrl ? (
                      <img src={qrisUrl} alt="QRIS" className="w-full max-h-72 object-contain" />
                    ) : (
                      <div className="w-full h-64 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">QRIS belum diupload</div>
                    )}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-2.5">
                    <div className="flex justify-between text-sm"><span className="text-[#9C9791]">Game</span><span className="font-semibold">{game.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-[#9C9791]">{game.user_id_label}</span><span className="font-semibold">{userId || "\u2014"}</span></div>
                    {!game.hide_server_id && <div className="flex justify-between text-sm"><span className="text-[#9C9791]">{game.server_id_label}</span><span className="font-semibold">{serverId || "\u2014"}</span></div>}
                    <div className="flex justify-between text-sm"><span className="text-[#9C9791]">Nominal</span><span className="font-semibold">{selected?.nominal_label || "\u2014"}</span></div>
                    <div className="flex justify-between text-sm pt-2.5 border-t border-white/10"><span className="text-[#9C9791]">Total Bayar</span><span className="font-['Archivo'] text-lg font-bold text-[#FF6A00]">{selected ? fmt(selected.price) : "Rp0"}</span></div>
                  </div>
                  <p className="mt-4 text-xs text-[#9C9791] text-center leading-relaxed">Setelah transfer, pesanan diproses otomatis. Simpan bukti transfer.</p>
                  {waNumber && (
                    <button onClick={handleWhatsApp} className="mt-4 w-full rounded-2xl bg-green-600 hover:bg-green-500 text-white py-3 text-sm font-bold transition flex items-center justify-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Konfirmasi via WhatsApp
                    </button>
                  )}
                  <button onClick={() => setShowQris(false)} className="mt-3 w-full rounded-2xl border border-white/10 py-3 text-sm font-semibold text-[#9C9791] hover:text-white hover:border-white/20 transition">Tutup</button>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile: Bottom Sheet */
            <div className="absolute bottom-0 inset-x-0 bg-[#111] rounded-t-3xl border-t border-white/10 max-h-[92vh] overflow-y-auto">
              <div className="flex justify-center pt-3 pb-1"><div className="h-1 w-10 rounded-full bg-white/20" /></div>
              <div className="px-5 pt-2 pb-3 flex items-center justify-between">
                <div><h2 className="font-['Archivo'] text-lg font-bold">Pembayaran QRIS</h2><p className="text-xs text-[#9C9791]">Scan untuk bayar</p></div>
                <button onClick={() => setShowQris(false)} className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 grid place-items-center text-[#9C9791] hover:text-white transition">✕</button>
              </div>
              <div className="px-5">
                <div className="bg-white rounded-2xl p-3 flex items-center justify-center">
                  {qrisUrl ? <img src={qrisUrl} alt="QRIS" className="w-full max-h-64 object-contain" /> : <div className="w-full h-48 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">QRIS belum diupload</div>}
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-[#9C9791]">Game</span><span className="font-semibold">{game.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#9C9791]">{game.user_id_label}</span><span className="font-semibold">{userId || "\u2014"}</span></div>
                  {!game.hide_server_id && <div className="flex justify-between text-sm"><span className="text-[#9C9791]">{game.server_id_label}</span><span className="font-semibold">{serverId || "\u2014"}</span></div>}
                  <div className="flex justify-between text-sm"><span className="text-[#9C9791]">Nominal</span><span className="font-semibold">{selected?.nominal_label || "\u2014"}</span></div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/10"><span className="text-[#9C9791]">Total Bayar</span><span className="font-['Archivo'] text-lg font-bold text-[#FF6A00]">{selected ? fmt(selected.price) : "Rp0"}</span></div>
                </div>
                <p className="mt-3 text-[11px] text-[#9C9791] text-center leading-relaxed">Setelah transfer, pesanan diproses otomatis. Simpan bukti transfer.</p>
                {waNumber && (
                  <button onClick={handleWhatsApp} className="mt-3 w-full rounded-2xl bg-green-600 hover:bg-green-500 text-white py-3 text-sm font-bold transition flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Konfirmasi via WhatsApp
                  </button>
                )}
                <button onClick={() => setShowQris(false)} className="mt-3 w-full rounded-2xl border border-white/10 py-3 text-sm font-semibold text-[#9C9791] hover:text-white hover:border-white/20 transition">Tutup</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== MOBILE: Hot-Pot Product Detail ===== */}
      {isDesktop === false && (<>
        {/* Hero Image */}
        <div className="relative bg-gradient-to-b from-[#111] to-[#0A0A0A] border-b border-white/10">
          <div className="flex items-center justify-center py-10">
            <img
              src={game.icon_url}
              alt={game.name}
              className={`h-32 w-32 rounded-3xl object-cover border border-white/10 shadow-2xl ${
                game.slug === "call-of-duty-mobile" ? "object-contain logo-plate" : ""
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
          <p className="mt-2 text-sm text-[#9C9791] leading-relaxed">{description}</p>
        </div>

        {/* User ID Input */}
        <div className="px-4 mt-2">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-bold tracking-widest text-[#9C9791] mb-3">
              LANGKAH 1 — MASUKKAN ID
            </p>
            <div className="space-y-3">
              <div>
                <label htmlFor="uid-m" className="text-[11px] font-semibold text-[#9C9791] block mb-1.5">
                  {game.user_id_label}
                </label>
                <input
                  id="uid-m"
                  inputMode="numeric"
                  placeholder={game.user_id_placeholder}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                />
              </div>
              {!game.hide_server_id && (
                <div>
                  <label htmlFor="zone-m" className="text-[11px] font-semibold text-[#9C9791] block mb-1.5">
                    {game.server_id_label}
                  </label>
                  <input
                    id="zone-m"
                    inputMode="numeric"
                    placeholder={game.server_id_placeholder}
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                  />
                </div>
              )}
            </div>
            <p className="mt-3 text-[11px] text-[#9C9791] leading-relaxed">{idGuide}</p>
          </div>
        </div>

        {/* Nominal Picker */}
        <div className="px-4 mt-4 pb-32">
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
                  <p className="text-xs font-bold leading-tight">{p.nominal_label}</p>
                  <p className="mt-1.5 text-[11px] font-semibold text-[#FF6A00]">{fmt(p.price)}</p>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#9C9791] text-center">
              Harga sudah final. Tanpa biaya admin tambahan.
            </p>
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div
          className={`fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-[#111]/95 backdrop-blur-lg transition-all duration-300 ${
            showBottomBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
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
              onClick={handlePay}
              className="btn-primary rounded-xl px-6 py-3 text-sm font-bold whitespace-nowrap"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </>)}

      {/* ===== DESKTOP ===== */}
      {isDesktop === true && (<>
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="glass rounded-3xl p-8 flex items-center gap-8">
            <img
              src={game.icon_url}
              alt={game.name}
              className={`h-24 w-24 rounded-2xl object-cover border border-white/10 ${
                game.slug === "call-of-duty-mobile" ? "shrink-0 object-contain logo-plate" : ""
              }`}
            />
            <div>
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold tracking-widest text-[#9C9791]">
                {currencyLabel.toUpperCase()}
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-bold font-['Archivo']">
                Top Up {game.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[#9C9791] leading-relaxed">{description}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9C9791]">
            <span><span className="text-[#FF6A00] font-bold">&#10003;</span> Proses otomatis 24/7</span>
            <span><span className="text-[#FF6A00] font-bold">&#10003;</span> Tanpa password &amp; OTP</span>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            {/* Step 1 */}
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-[#FF6A00] text-white grid place-items-center text-xs font-bold">1</span>
                <h2 className="text-lg font-bold">
                  Masukkan {game.user_id_label}
                  {!game.hide_server_id && ` & ${game.server_id_label}`}
                </h2>
              </div>
              <div className={`mt-5 grid gap-4 ${game.hide_server_id ? "" : "sm:grid-cols-2"}`}>
                <div>
                  <label htmlFor="uid-d" className="text-xs font-semibold tracking-widest text-[#9C9791]">
                    {game.user_id_label.toUpperCase()}
                  </label>
                  <input
                    id="uid-d"
                    inputMode="numeric"
                    placeholder={game.user_id_placeholder}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                  />
                </div>
                {!game.hide_server_id && (
                  <div>
                    <label htmlFor="zone-d" className="text-xs font-semibold tracking-widest text-[#9C9791]">
                      {game.server_id_label.toUpperCase()}
                    </label>
                    <input
                      id="zone-d"
                      inputMode="numeric"
                      placeholder={game.server_id_placeholder}
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
                    />
                  </div>
                )}
              </div>
              <p className="mt-4 text-xs text-[#9C9791] leading-relaxed">{idGuide}</p>
            </div>

            {/* Step 2 */}
            <div className="glass rounded-3xl p-6 mt-5">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-[#FF6A00] text-white grid place-items-center text-xs font-bold">2</span>
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
                        {p.badge === "terlaris" ? "POPULER" : p.badge.toUpperCase()}
                      </span>
                    )}
                    <p className="font-['Archivo'] text-base font-bold">{p.nominal_label}</p>
                    <p className="mt-2 text-sm font-semibold text-[#FF6A00]">{fmt(p.price)}</p>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#9C9791]">Harga sudah final. Tidak ada biaya admin tambahan di akhir.</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="glass rounded-3xl p-6 lg:sticky lg:top-24">
            <p className="text-xs font-bold tracking-widest text-[#9C9791]">RINGKASAN PESANAN</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={game.icon_url}
                alt={game.name}
                className={`h-11 w-11 rounded-lg object-cover ${
                  game.slug === "call-of-duty-mobile" ? "shrink-0 object-contain logo-plate" : ""
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
                <dd className="font-semibold text-right">{userId.trim() || "\u2014"}</dd>
              </div>
              {!game.hide_server_id && (
                <div className="flex justify-between gap-3">
                  <dt className="text-[#9C9791]">{game.server_id_label}</dt>
                  <dd className="font-semibold text-right">{serverId.trim() || "\u2014"}</dd>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <dt className="text-[#9C9791]">Nominal</dt>
                <dd className="font-semibold text-right">{selected?.nominal_label || "\u2014"}</dd>
              </div>
            </dl>
            <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between">
              <span className="text-sm text-[#9C9791]">Total</span>
              <span className="font-['Archivo'] text-2xl font-bold text-[#FF6A00]">
                {selected ? fmt(selected.price) : "Rp0"}
              </span>
            </div>
            <button
              onClick={handlePay}
              className="btn-primary mt-5 w-full rounded-2xl py-3.5 text-sm font-bold relative z-10"
            >
              Bayar Sekarang
            </button>
            {note && (
              <p className="mt-3 text-xs text-center" style={{ color: noteColor || "#9C9791" }}>
                {note}
              </p>
            )}
          </aside>
        </section>
      </>)}
    </>
  );
}
