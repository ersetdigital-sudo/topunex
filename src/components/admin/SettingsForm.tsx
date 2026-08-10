"use client";

import { useState, useEffect, useRef } from "react";
import type { Setting } from "@/lib/types";

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [items, setItems] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => (map[s.key] = s.value));
    setItems(map);
  }, [settings]);

  const handleSave = async (key: string) => {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: items[key] || "" }),
    });
    setSaving(false);
    if (res.ok) setMsg(`${key} tersimpan!`);
    else setMsg("Gagal menyimpan.");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMsg("");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      setItems((prev) => ({ ...prev, qris_image_url: data.url }));
      setMsg("QRIS berhasil diupload!");
    } else {
      setMsg(data.error || "Gagal upload.");
    }
  };

  return (
    <div className="space-y-6">
      {msg && (
        <div className="rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 px-4 py-3 text-sm text-[#FF6A00]">
          {msg}
        </div>
      )}

      {/* QRIS Image */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <label className="text-xs font-bold tracking-widest text-[#9C9791] block mb-3">
          QRIS IMAGE
        </label>

        {/* Upload area */}
        <div
          onClick={() => fileRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            uploading
              ? "border-[#FF6A00]/30 bg-[#FF6A00]/5"
              : "border-white/10 hover:border-[#FF6A00]/50 hover:bg-white/[0.02]"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 border-2 border-[#FF6A00] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#9C9791]">Mengupload ke Cloudinary...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/5 grid place-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9C9791" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Klik untuk upload gambar QRIS</p>
                <p className="text-xs text-[#9C9791] mt-1">PNG, JPG, atau SVG. Max 5MB.</p>
              </div>
            </div>
          )}
        </div>

        {/* Current image preview */}
        {items.qris_image_url && !uploading && (
          <div className="mt-4">
            <p className="text-xs text-[#9C9791] mb-2">Current:</p>
            <div className="relative inline-block">
              <img
                src={items.qris_image_url}
                alt="QRIS"
                className="max-h-48 rounded-xl border border-white/10"
              />
              <button
                onClick={() => {
                  setItems((prev) => ({ ...prev, qris_image_url: "" }));
                  handleSave("qris_image_url");
                }}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-red-500/80 hover:bg-red-500 grid place-items-center text-white text-xs transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Manual URL input */}
        <div className="mt-4">
          <p className="text-xs text-[#9C9791] mb-1.5">Atau paste URL manual:</p>
          <div className="flex items-center gap-3">
            <input
              value={items.qris_image_url || ""}
              onChange={(e) =>
                setItems({ ...items, qris_image_url: e.target.value })
              }
              className="flex-1 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
              placeholder="https://..."
            />
            <button
              onClick={() => handleSave("qris_image_url")}
              disabled={saving}
              className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-2.5 text-sm transition disabled:opacity-50"
            >
              {saving ? "..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Number */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <label className="text-xs font-bold tracking-widest text-[#9C9791] block mb-3">
          WHATSAPP NUMBER
        </label>
        <div className="flex items-center gap-3">
          <input
            value={items.wa_number || ""}
            onChange={(e) => setItems({ ...items, wa_number: e.target.value })}
            className="flex-1 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
            placeholder="6281234567890"
          />
          <button
            onClick={() => handleSave("wa_number")}
            disabled={saving}
            className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-3 text-sm transition disabled:opacity-50"
          >
            {saving ? "..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
