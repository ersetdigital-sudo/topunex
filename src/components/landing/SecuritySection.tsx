import Link from "next/link";

export function SecuritySection() {
  return (
    <section
      id="aman"
      className="py-20 sm:py-24 border-y border-white/10 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#FF6A00]">
            KEAMANAN
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Kami nggak perlu akses ke akunmu.
          </h2>
          <p className="mt-4 text-[#9C9791] leading-relaxed">
            Top up di Topunex cukup pakai User ID. Kami nggak butuh password,
            OTP, PIN, atau akses login ke akun game kamu.
          </p>
          <a
            href="#game"
            className="mt-7 btn-primary cta-glow inline-flex rounded-2xl px-6 py-3.5 text-sm font-bold"
          >
            Top Up Sekarang
          </a>
          <p className="mt-6 tick rounded-2xl px-4 py-3.5 text-sm text-[#9C9791] leading-relaxed">
            <span className="font-bold text-white">
              Catatan keamanan:
            </span>{" "}
            Kalau ada yang mengatasnamakan Topunex dan meminta password, OTP,
            atau kode verifikasi, jangan berikan. Kami tidak pernah memintanya.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass card-hover rounded-2xl p-5">
            <p className="font-['Archivo'] text-xl font-bold text-[#FF6A00]">
              USER ID
            </p>
            <h3 className="mt-3 font-bold">Cukup User ID</h3>
            <p className="mt-1.5 text-sm text-[#9C9791]">
              Masukkan ID game yang diperlukan untuk proses top up.
            </p>
          </div>
          <div className="glass card-hover rounded-2xl p-5">
            <p className="font-['Archivo'] text-xl font-bold text-[#FF6A00]">
              OTP
            </p>
            <h3 className="mt-3 font-bold">Nggak perlu OTP</h3>
            <p className="mt-1.5 text-sm text-[#9C9791]">
              Kami tidak pernah meminta kode OTP atau kode verifikasi.
            </p>
          </div>
          <div className="glass card-hover rounded-2xl p-5">
            <p className="font-['Archivo'] text-xl font-bold text-[#FF6A00]">
              LOGIN
            </p>
            <h3 className="mt-3 font-bold">Tanpa login</h3>
            <p className="mt-1.5 text-sm text-[#9C9791]">
              Akun game kamu tetap sepenuhnya kamu yang pegang.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
