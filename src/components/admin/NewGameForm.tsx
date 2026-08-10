"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewGameForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [iconUrl, setIconUrl] = useState("/images/d0ad9f14-8bcf-43d9-8f02-ea7a4ecf5706.png");
  const [userIdLabel, setUserIdLabel] = useState("User ID");
  const [userIdPlaceholder, setUserIdPlaceholder] = useState("12345678");
  const [serverIdLabel, setServerIdLabel] = useState("Zone ID");
  const [serverIdPlaceholder, setServerIdPlaceholder] = useState("");
  const [serverIdRequired, setServerIdRequired] = useState(false);
  const [hideServerId, setHideServerId] = useState(true);

  const handleCreate = async () => {
    if (!name || !slug) {
      setMsg("Nama dan slug wajib diisi.");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        icon_url: iconUrl,
        user_id_label: userIdLabel,
        user_id_placeholder: userIdPlaceholder,
        server_id_label: serverIdLabel,
        server_id_placeholder: serverIdPlaceholder,
        server_id_required: serverIdRequired,
        hide_server_id: hideServerId,
        sort_order: 99,
      }),
    });
    setSaving(false);
    if (res.ok) {
      router.push(`/admin/games/${slug}`);
    } else {
      const data = await res.json();
      setMsg(data.error || "Gagal membuat game.");
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111] max-w-xl">
      <h2 className="font-['Archivo'] text-xl font-bold mb-5">Game Baru</h2>
      {msg && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {msg}
        </div>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Nama Game *
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
              }}
              placeholder="Mobile Legends"
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Slug *
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="mobile-legends"
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
            Icon URL
          </label>
          <input
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              User ID Label
            </label>
            <input
              value={userIdLabel}
              onChange={(e) => setUserIdLabel(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              User ID Placeholder
            </label>
            <input
              value={userIdPlaceholder}
              onChange={(e) => setUserIdPlaceholder(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={serverIdRequired}
              onChange={(e) => setServerIdRequired(e.target.checked)}
              className="accent-[#FF6A00]"
            />
            Server ID Required
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hideServerId}
              onChange={(e) => setHideServerId(e.target.checked)}
              className="accent-[#FF6A00]"
            />
            Hide Server ID
          </label>
        </div>
      </div>
      <button
        onClick={handleCreate}
        disabled={saving || !name || !slug}
        className="mt-6 bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-6 py-2.5 text-sm transition disabled:opacity-50"
      >
        {saving ? "Membuat..." : "Buat Game"}
      </button>
    </div>
  );
}
