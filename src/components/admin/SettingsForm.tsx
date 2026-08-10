"use client";

import { useState, useEffect } from "react";
import type { Setting } from "@/lib/types";

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [items, setItems] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

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

  const fields = [
    { key: "qris_image_url", label: "QRIS Image URL", type: "text" },
    { key: "wa_number", label: "WhatsApp Number", type: "text" },
  ];

  return (
    <div className="space-y-6">
      {msg && (
        <div className="rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 px-4 py-3 text-sm text-[#FF6A00]">
          {msg}
        </div>
      )}

      {fields.map((f) => (
        <div key={f.key} className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
          <label className="text-xs font-bold tracking-widest text-[#9C9791] block mb-3">
            {f.label}
          </label>
          <div className="flex items-center gap-3">
            <input
              type={f.type}
              value={items[f.key] || ""}
              onChange={(e) =>
                setItems({ ...items, [f.key]: e.target.value })
              }
              className="flex-1 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
              placeholder={f.key}
            />
            <button
              onClick={() => handleSave(f.key)}
              disabled={saving}
              className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-3 text-sm transition disabled:opacity-50"
            >
              {saving ? "..." : "Save"}
            </button>
          </div>
          {f.key === "qris_image_url" && items[f.key] && (
            <div className="mt-4">
              <p className="text-xs text-[#9C9791] mb-2">Preview:</p>
              <img
                src={items[f.key]}
                alt="QRIS"
                className="max-h-48 rounded-xl border border-white/10"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
