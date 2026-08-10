import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  // Login page handles its own layout
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-xl grid place-items-center bg-[#FF6A00]">
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
                topunex<span className="text-[#FF6A00]">.</span>
                <span className="text-[#9C9791] text-sm ml-2">Admin</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-5 text-sm text-[#9C9791]">
              <Link href="/admin" className="hover:text-white transition">
                Games
              </Link>
              <Link
                href="/admin/settings"
                className="hover:text-white transition"
              >
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-[#9C9791] hover:text-white transition"
            >
              View Site ↗
            </a>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm text-[#9C9791] hover:text-white transition"
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
