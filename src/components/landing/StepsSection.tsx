const steps = [
  {
    num: "01",
    title: "Pilih game",
    desc: "Pilih game yang ingin kamu top up dari katalog.",
  },
  {
    num: "02",
    title: "Masukkan User ID",
    desc: "Masukkan User ID. Tambahkan Zone ID jika diperlukan.",
  },
  {
    num: "03",
    title: "Pilih nominal",
    desc: "Pilih Diamond, UC, CP, atau item yang kamu butuhkan. Harga langsung terlihat.",
  },
  {
    num: "04",
    title: "Bayar & selesai",
    desc: "Selesaikan pembayaran. Pesanan langsung diproses secara otomatis.",
  },
];

export function StepsSection() {
  return (
    <section id="cara" className="py-20 sm:py-28 relative">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#FF6A00]">
            CARA TOP UP
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Empat langkah. Selesai dalam hitungan detik.
          </h2>
          <p className="mt-3 text-[#9C9791]">
            Alurnya sama di semua game. Sekali paham, berikutnya tinggal ulang.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="glass card-hover rounded-2xl p-6">
              <span className="font-['Archivo'] text-sm font-bold text-[#FF6A00]">
                {s.num}
              </span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-[#9C9791]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
