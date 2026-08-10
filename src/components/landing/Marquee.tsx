export function Marquee() {
  const items = [
    "Proses otomatis",
    "Tanpa password & OTP",
    "QRIS \u00B7 GoPay \u00B7 OVO \u00B7 DANA \u00B7 Transfer",
    "5 game populer",
    "Harga transparan",
    "Buka 24 jam",
  ];

  return (
    <div className="border-y border-white/10 py-3.5 overflow-hidden bg-white/[0.02]">
      <div className="marquee flex gap-10 whitespace-nowrap text-sm font-semibold text-[#9C9791] w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
