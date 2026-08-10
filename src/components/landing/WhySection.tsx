const reasons = [
  {
    num: "01",
    title: "Nggak bikin nyasar",
    desc: "Game populer langsung tersedia. Nggak perlu cari-cari di katalog yang panjang.",
  },
  {
    num: "02",
    title: "Nggak minta password",
    desc: "Cukup User ID dan data yang memang diperlukan untuk proses top up.",
  },
  {
    num: "03",
    title: "Harga kelihatan",
    desc: "Nominal dan harga ditampilkan jelas sebelum pembayaran.",
  },
  {
    num: "04",
    title: "Nggak ada biaya mendadak",
    desc: "Cek total pembayaran dulu. Baru bayar.",
  },
];

export function WhySection() {
  return (
    <section className="py-20 sm:py-24 border-t border-white/10 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-[#FF6A00]">
            KENAPA TOPUNEX
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Cepat buat main.
            <br className="hidden sm:block" /> Aman buat transaksi.
          </h2>
          <p className="mt-3 text-[#9C9791]">
            Kami bikin top up sesimpel mungkin: pilih game, masukkan ID, bayar,
            selesai.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.num} className="glass card-hover rounded-2xl p-6">
              <p className="font-['Archivo'] text-3xl font-bold text-[#FF6A00]">
                {r.num}
              </p>
              <h3 className="mt-3 text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-[#9C9791]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
