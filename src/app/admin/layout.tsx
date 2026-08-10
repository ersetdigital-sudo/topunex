import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin — Topunex",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {user && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur">
          <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2.5">
                <span className="h-8 w-8 rounded-xl grid place-items-center bg-[#FF6A00]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A0A0A">
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                  </svg>
                </span>
                <span className="font-['Archivo'] text-lg font-bold tracking-tight">
                  topunex<span className="text-[#FF6A00]">.</span>
                  <span className="text-[#9C9791] text-sm ml-2">Admin</span>
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {[
                  { href: "/admin", label: "Games", icon: "🎮" },
                  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
                  { href: "/admin/profile", label: "Profile", icon: "👤" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-1.5 rounded-lg text-sm text-[#9C9791] hover:text-white hover:bg-white/5 transition"
                  >
                    <span className="mr-1.5">{item.icon}</span>{item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" className="text-sm text-[#9C9791] hover:text-white transition flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                View Site
              </a>
              <div className="h-5 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/30 grid place-items-center text-[10px] font-bold text-[#FF6A00]">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-[#9C9791] hidden sm:block max-w-[120px] truncate">{user.email}</span>
              </div>
              <form action="/api/auth/signout" method="post">
                <button type="submit" className="text-xs text-[#9C9791] hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5">
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
