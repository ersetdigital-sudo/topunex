import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-['Archivo'] text-8xl font-bold text-[#FF6A00]">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-[#9C9791]">
          Halaman yang kamu cari nggak ada atau sudah dipindahkan.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex btn-primary rounded-xl px-6 py-3 text-sm font-bold"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
