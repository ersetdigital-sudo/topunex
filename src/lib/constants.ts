export const SITE = {
  name: "topunex.com",
  title: "Topunex — Top Up Game Instan, Aman, Tanpa Ribet",
  description:
    "Topunex: top up Mobile Legends, Free Fire, PUBG Mobile, COD Mobile, dan Magic Chess Go Go. Cukup User ID, tanpa password, tanpa OTP. Proses otomatis, harga transparan, bayar pakai QRIS & e-wallet.",
  url: "http://topunex.com",
} as const;

export const COLORS = {
  brand: "#FF6A00",
  brandHover: "#FF8A2B",
  ink: "#0A0A0A",
  ink2: "#141414",
  text: "#F5F3F0",
  muted: "#9C9791",
  line: "rgba(255,255,255,0.10)",
} as const;

export const PAYMENT_METHODS = [
  "QRIS",
  "GoPay",
  "OVO / DANA",
  "Transfer Bank",
] as const;
