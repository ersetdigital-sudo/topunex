export function CTABanner() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[28px] p-10 sm:p-14 text-center"
          style={{ background: "#FF6A00", color: "#FFFFFF" }}
        >
          <h2 className="relative text-3xl sm:text-5xl font-bold leading-tight">
            Isi diamond.
            <br className="hidden sm:block" /> Langsung main.
          </h2>
          <p className="relative mt-4 text-white/85 font-medium max-w-lg mx-auto">
            Pilih game, masukkan User ID, bayar. Sisanya urusan kami.
          </p>
          <a
            href="#game"
            className="relative mt-8 inline-flex rounded-2xl bg-[#0A0A0A] text-white px-8 py-4 text-sm font-bold hover:bg-black transition"
          >
            Top Up Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
