"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-[1050px] min-h-[700px] bg-[#111] rounded-[2.5rem] overflow-hidden flex relative border border-white/10">
        {/* Left Panel — Slanted Image */}
        <div className="hidden lg:block w-[56%] relative">
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
            }}
          >
            <img
              src="https://needmcp.com/storage/gallery/01KY35JRWBCQKEMR7SY6ZXY0BT.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          </div>

          {/* Brand overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl grid place-items-center bg-[#FF6A00]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#0A0A0A"
                  >
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                  </svg>
                </span>
                <span className="font-['Archivo'] text-xl font-bold text-white tracking-tight">
                  topunex<span className="text-[#FF6A00]">.</span>
                </span>
              </div>
              <div className="flex gap-5 text-sm text-white/70">
                <span className="text-white font-semibold cursor-pointer">
                  Admin
                </span>
                <a href="/" className="hover:text-white transition cursor-pointer">
                  Public Site
                </a>
              </div>
            </div>

            <div className="max-w-[85%]">
              <p className="text-sm text-white/50 font-semibold tracking-widest uppercase mb-3">
                Admin Panel
              </p>
              <h2 className="font-['Archivo'] text-4xl font-bold text-white leading-tight tracking-tight">
                Kelola harga,
                <br />
                pantau pesanan.
              </h2>
              <p className="mt-4 text-white/60 text-sm leading-relaxed">
                Dashboard untuk mengelola game, nominal, harga, dan gambar QRIS.
                Akses terbatas untuk admin terdaftar.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-white/50">topunex@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full lg:w-[44%] flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-[340px]">
            {/* Mobile brand */}
            <div className="flex items-center gap-2.5 mb-10 lg:hidden">
              <span className="h-9 w-9 rounded-xl grid place-items-center bg-[#FF6A00]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#0A0A0A"
                >
                  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
              </span>
              <span className="font-['Archivo'] text-xl font-bold text-white tracking-tight">
                topunex<span className="text-[#FF6A00]">.</span>
              </span>
            </div>

            <p className="text-xs font-bold tracking-widest text-[#FF6A00] uppercase mb-2">
              ADMIN ACCESS
            </p>
            <h1 className="font-['Archivo'] text-3xl font-bold text-white tracking-tight">
              Hi, Admin
            </h1>
            <p className="mt-2 text-sm text-[#9C9791]">
              Masuk ke dashboard Topunex.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold tracking-widest text-[#9C9791] block mb-2"
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="topunex@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00] transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold tracking-widest text-[#9C9791]"
                  >
                    PASSWORD
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00] transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-6 py-3.5 text-sm transition-all duration-180 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? "Masuk..." : "Login"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-[#9C9791]">
              <a href="/" className="hover:text-white transition">
                ← Kembali ke situs utama
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
