"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-3 sm:mt-4">
        <nav className="glass rounded-2xl bg-black/80 px-4 sm:px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="h-8 w-8 rounded-xl grid place-items-center"
              style={{ background: "#FF6A00" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#0A0A0A"
              >
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
            </span>
            <span className="font-['Archivo'] text-lg font-bold tracking-tight">
              topunex<span className="text-[#FF6A00]">.</span>com
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-[#9C9791]">
            <a href="#game" className="hover:text-white transition">
              Game
            </a>
            <a href="#cara" className="hover:text-white transition">
              Cara Top Up
            </a>
            <a href="#aman" className="hover:text-white transition">
              Keamanan
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </div>
          <a
            href="#game"
            className="btn-primary rounded-xl px-4 py-2 text-sm font-bold"
          >
            Top Up Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
}
