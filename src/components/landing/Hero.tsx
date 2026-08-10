export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="aurora"
        style={{
          width: 620,
          height: 620,
          background: "#FF6A00",
          top: -260,
          left: -160,
          opacity: 0.3,
        }}
      />
      <div
        className="aurora"
        style={{
          width: 480,
          height: 480,
          background: "#FF8A2B",
          top: -120,
          right: -180,
          opacity: 0.2,
          animationDelay: "-6s",
        }}
      />
      <div className="grain" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="tick inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#9C9791] backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
              </span>
              Top up cepat &middot; Proses otomatis 24/7
            </span>
            <h1 className="font-['Archivo'] mt-6 font-extrabold h1-xl">
              Isi diamond,
              <br />
              <span className="text-[#FF6A00]">langsung main.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#9C9791] max-w-lg leading-relaxed">
              Top up game favoritmu dengan cepat, aman, dan tanpa ribet. Pilih
              game, masukkan User ID, pilih nominal, bayar.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#game"
                className="btn-primary cta-glow rounded-2xl px-7 py-4 text-sm font-bold text-center"
              >
                Top Up Sekarang
              </a>
              <a
                href="#cara"
                className="tick rounded-2xl px-7 py-4 text-sm font-bold text-center hover:border-white/30 hover:bg-white/[0.06] transition"
              >
                Cara Top Up
              </a>
            </div>
            <div className="mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-y-3 gap-x-6 text-sm text-[#9C9791]">
              <span className="flex items-center gap-2">
                <span className="text-[#FF6A00]">&#9889;</span> Proses cepat
                &amp; otomatis
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#FF6A00]">&#10003;</span> QRIS &amp;
                E-Wallet
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#FF6A00]">&#10003;</span> Tanpa login
              </span>
            </div>
          </div>

          {/* Mock widget */}
          <div className="panel orbit rounded-[28px] p-5 sm:p-6 relative">
            <div
              className="absolute -top-3 right-5 rounded-full px-3 py-1 text-[11px] font-bold text-black"
              style={{ background: "#FF6A00" }}
            >
              ALUR 3 LANGKAH
            </div>
            <p className="text-xs font-semibold tracking-widest text-[#9C9791]">
              LANGKAH 1 — PILIH GAME
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              <div
                className="rounded-xl p-2.5 text-center border"
                style={{
                  borderColor: "#FF6A00",
                  background: "rgba(255,106,0,0.12)",
                }}
              >
                <img
                  src="/images/d0ad9f14-8bcf-43d9-8f02-ea7a4ecf5706.png"
                  alt="Mobile Legends"
                  className="h-10 w-10 mx-auto rounded-lg object-cover"
                />
                <p className="mt-1.5 text-[10px] font-semibold leading-tight">
                  Mobile Legends
                </p>
              </div>
              <div className="rounded-xl p-2.5 text-center border border-white/10">
                <img
                  src="/images/9ca3ceec-e601-4b89-b20f-688b3d305414.png"
                  alt="Free Fire"
                  className="h-10 w-10 mx-auto rounded-lg object-cover"
                />
                <p className="mt-1.5 text-[10px] font-semibold leading-tight">
                  Free Fire
                </p>
              </div>
              <div className="rounded-xl p-2.5 text-center border border-white/10">
                <img
                  src="/images/bc9cc3e4-6f35-4dfd-b2e7-6e8c8495a857.jpg"
                  alt="PUBG Mobile"
                  className="h-10 w-10 mx-auto rounded-lg object-cover"
                />
                <p className="mt-1.5 text-[10px] font-semibold leading-tight">
                  PUBG Mobile
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs font-semibold tracking-widest text-[#9C9791]">
              LANGKAH 2 — USER ID
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5">
                <p className="text-[10px] text-[#9C9791]">User ID</p>
                <p className="text-sm font-semibold">12345678</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5">
                <p className="text-[10px] text-[#9C9791]">Zone ID</p>
                <p className="text-sm font-semibold">2201</p>
              </div>
            </div>
            <p className="mt-5 text-xs font-semibold tracking-widest text-[#9C9791]">
              LANGKAH 3 — NOMINAL
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-xl border border-white/10 px-2 py-2.5">
                <p className="text-sm font-bold">
                  86{" "}
                  <span className="text-[10px] font-medium text-[#9C9791]">
                    DM
                  </span>
                </p>
              </div>
              <div
                className="rounded-xl px-2 py-2.5 border"
                style={{
                  borderColor: "#FF6A00",
                  background: "rgba(255,106,0,0.12)",
                }}
              >
                <p className="text-sm font-bold">
                  172{" "}
                  <span className="text-[10px] font-medium text-[#9C9791]">
                    DM
                  </span>
                </p>
              </div>
              <div className="rounded-xl border border-white/10 px-2 py-2.5">
                <p className="text-sm font-bold">
                  257{" "}
                  <span className="text-[10px] font-medium text-[#9C9791]">
                    DM
                  </span>
                </p>
              </div>
            </div>
            <div
              className="mt-5 flex items-center justify-between rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255,106,0,0.12)",
                border: "1px solid rgba(255,106,0,0.35)",
              }}
            >
              <span className="text-xs text-[#9C9791]">Total dibayar</span>
              <span className="font-['Archivo'] text-base font-bold">
                Harga final
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#9C9791]">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF6A00"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Tanpa password, tanpa OTP, tanpa akses login.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
