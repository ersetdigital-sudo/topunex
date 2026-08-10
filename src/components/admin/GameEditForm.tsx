"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Game, Pricing } from "@/lib/types";

interface Props {
  game: Game;
  pricing: Pricing[];
}

export function GameEditForm({ game, pricing }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Game fields
  const [name, setName] = useState(game.name);
  const [iconUrl, setIconUrl] = useState(game.icon_url);
  const [isActive, setIsActive] = useState(game.is_active);
  const [sortOrder, setSortOrder] = useState(game.sort_order);
  const [rangeLabel, setRangeLabel] = useState(game.range_label);
  const [userIdLabel, setUserIdLabel] = useState(game.user_id_label);
  const [userIdPlaceholder, setUserIdPlaceholder] = useState(game.user_id_placeholder);
  const [serverIdLabel, setServerIdLabel] = useState(game.server_id_label);
  const [serverIdPlaceholder, setServerIdPlaceholder] = useState(game.server_id_placeholder);
  const [serverIdRequired, setServerIdRequired] = useState(game.server_id_required);
  const [hideServerId, setHideServerId] = useState(game.hide_server_id);

  // Pricing
  const [items, setItems] = useState<Pricing[]>(pricing);
  const [newLabel, setNewLabel] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newBadge, setNewBadge] = useState("");

  const handleSaveGame = async () => {
    setSaving(true);
    setMsg("");
    const res = await fetch(`/api/admin/games/${game.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        icon_url: iconUrl,
        is_active: isActive,
        sort_order: sortOrder,
        range_label: rangeLabel,
        user_id_label: userIdLabel,
        user_id_placeholder: userIdPlaceholder,
        server_id_label: serverIdLabel,
        server_id_placeholder: serverIdPlaceholder,
        server_id_required: serverIdRequired,
        hide_server_id: hideServerId,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("Tersimpan!");
      router.refresh();
    } else {
      setMsg("Gagal menyimpan.");
    }
  };

  const handleAddPricing = async () => {
    if (!newLabel || !newPrice) return;
    setSaving(true);
    const res = await fetch("/api/admin/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game_id: game.id,
        nominal_label: newLabel,
        price: parseInt(newPrice),
        badge: newBadge || null,
        sort_order: items.length + 1,
      }),
    });
    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      setItems([...items, data]);
      setNewLabel("");
      setNewPrice("");
      setNewBadge("");
      setMsg("Nominal ditambahkan!");
    }
  };

  const handleDeletePricing = async (id: string) => {
    if (!confirm("Hapus nominal ini?")) return;
    const res = await fetch(`/api/admin/pricing/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter((p) => p.id !== id));
      setMsg("Nominal dihapus.");
    }
  };

  const handleUpdatePricing = async (p: Pricing) => {
    const res = await fetch(`/api/admin/pricing/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nominal_label: p.nominal_label,
        price: p.price,
        badge: p.badge,
        sort_order: p.sort_order,
      }),
    });
    if (res.ok) setMsg("Nominal diperbarui.");
  };

  return (
    <div className="space-y-8">
      {msg && (
        <div className="rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 px-4 py-3 text-sm text-[#FF6A00]">
          {msg}
        </div>
      )}

      {/* Game Info */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <h2 className="font-['Archivo'] text-xl font-bold mb-5">Game Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Nama Game
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
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
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Range Label
            </label>
            <input
              value={rangeLabel}
              onChange={(e) => setRangeLabel(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
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
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Server ID Label
            </label>
            <input
              value={serverIdLabel}
              onChange={(e) => setServerIdLabel(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#9C9791] block mb-1.5">
              Server ID Placeholder
            </label>
            <input
              value={serverIdPlaceholder}
              onChange={(e) => setServerIdPlaceholder(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-[#FF6A00]"
            />
            Active
          </label>
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
        <button
          onClick={handleSaveGame}
          disabled={saving}
          className="mt-5 bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-6 py-2.5 text-sm transition disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan Game"}
        </button>
      </div>

      {/* Pricing */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <h2 className="font-['Archivo'] text-xl font-bold mb-5">
          Nominal & Harga
        </h2>

        {/* Existing pricing */}
        <div className="space-y-2">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3"
            >
              <input
                value={p.nominal_label}
                onChange={(e) => {
                  setItems(
                    items.map((x) =>
                      x.id === p.id ? { ...x, nominal_label: e.target.value } : x
                    )
                  );
                }}
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <input
                type="number"
                value={p.price}
                onChange={(e) => {
                  setItems(
                    items.map((x) =>
                      x.id === p.id ? { ...x, price: parseInt(e.target.value) || 0 } : x
                    )
                  );
                }}
                className="w-28 bg-transparent text-sm text-right outline-none"
              />
              <input
                value={p.badge || ""}
                onChange={(e) => {
                  setItems(
                    items.map((x) =>
                      x.id === p.id ? { ...x, badge: e.target.value || null } : x
                    )
                  );
                }}
                placeholder="badge"
                className="w-20 bg-transparent text-xs text-[#9C9791] outline-none"
              />
              <button
                onClick={() => handleUpdatePricing(p)}
                className="text-xs text-[#FF6A00] hover:text-[#FF8A2B] font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => handleDeletePricing(p.id)}
                className="text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                Del
              </button>
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="mt-4 flex items-center gap-3">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="86 Diamond"
            className="flex-1 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="22000"
            className="w-28 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition"
          />
          <input
            value={newBadge}
            onChange={(e) => setNewBadge(e.target.value)}
            placeholder="terlaris"
            className="w-24 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-2.5 text-xs outline-none focus:border-[#FF6A00] transition"
          />
          <button
            onClick={handleAddPricing}
            disabled={saving || !newLabel || !newPrice}
            className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-4 py-2.5 text-sm transition disabled:opacity-50"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
