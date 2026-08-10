"use client";

export function StickyCTA() {
  return (
    <div
      id="stickyCta"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 pb-4 opacity-0 translate-y-full transition-all duration-300 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(10,10,10,0.97), rgba(10,10,10,0.72), transparent)",
      }}
    >
      <a
        href="#game"
        className="btn-primary cta-glow block rounded-2xl px-6 py-4 text-center text-sm font-bold"
      >
        Top Up Sekarang
      </a>
    </div>
  );
}
