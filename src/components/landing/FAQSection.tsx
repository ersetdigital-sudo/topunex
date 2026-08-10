"use client";

const faqs = [
  {
    q: "Bagaimana cara top up di Topunex?",
    a: "Pilih game, masukkan User ID (dan Zone ID bila diperlukan), pilih nominal, lalu lanjutkan ke pembayaran.",
  },
  {
    q: "Apakah perlu password akun game?",
    a: "Tidak pernah. Topunex tidak meminta password, OTP, PIN, maupun akses login ke akun game kamu.",
  },
  {
    q: "Di mana saya menemukan User ID?",
    a: "Buka menu profil atau akun di dalam game, lalu salin angka ID yang tertera. Untuk ML dan Magic Chess, Zone ID ada di dalam tanda kurung setelah User ID.",
  },
  {
    q: "Berapa lama prosesnya?",
    a: "Otomatis, biasanya hitungan detik setelah pembayaran terkonfirmasi. Bila ada antrean dari sisi penyedia, prosesnya bisa sedikit lebih lama.",
  },
  {
    q: "Kalau salah memasukkan User ID?",
    a: "Hubungi support secepatnya dengan bukti pesanan. Item yang sudah masuk ke ID lain tidak bisa ditarik kembali, jadi pastikan ID benar sebelum bayar.",
  },
  {
    q: "Metode pembayaran apa saja yang didukung?",
    a: "QRIS, e-wallet (GoPay, OVO, DANA, ShopeePay), dan transfer bank.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#FF6A00]">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Yang paling sering ditanya.
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="glass rounded-2xl p-5 group"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {faq.q}
                <span className="chev text-[#FF6A00] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[#9C9791]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
