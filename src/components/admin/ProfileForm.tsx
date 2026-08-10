"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ProfileForm({ email }: { email: string }) {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"ok" | "err">("ok");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleUpdateEmail = async () => {
    if (!newEmail) return;
    setLoading(true);
    setMsg("");
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setLoading(false);
    if (error) {
      setMsg(error.message);
      setMsgType("err");
    } else {
      setMsg("Email updated! Cek inbox untuk verifikasi.");
      setMsgType("ok");
      setNewEmail("");
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) return;
    setLoading(true);
    setMsg("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      setMsg(error.message);
      setMsgType("err");
    } else {
      setMsg("Password berhasil diubah!");
      setMsgType("ok");
      setNewPassword("");
      setCurrentPassword("");
    }
  };

  return (
    <div className="space-y-6">
      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm ${
          msgType === "ok"
            ? "bg-green-500/10 border border-green-500/30 text-green-400"
            : "bg-red-500/10 border border-red-500/30 text-red-400"
        }`}>
          {msg}
        </div>
      )}

      {/* Current Email */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <label className="text-xs font-bold tracking-widest text-[#9C9791] block mb-3">
          EMAIL SEKARANG
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm text-[#9C9791]">
            {email}
          </div>
          <span className="text-xs bg-green-500/15 text-green-400 px-2.5 py-1 rounded-full font-semibold">Active</span>
        </div>
      </div>

      {/* Change Email */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <label className="text-xs font-bold tracking-widest text-[#9C9791] block mb-3">
          UBAH EMAIL
        </label>
        <div className="flex items-center gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="email baru"
            className="flex-1 rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
          />
          <button
            onClick={handleUpdateEmail}
            disabled={loading || !newEmail}
            className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-3 text-sm transition disabled:opacity-50"
          >
            {loading ? "..." : "Update"}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="glass rounded-2xl p-6 border border-white/10 bg-[#111]">
        <label className="text-xs font-bold tracking-widest text-[#9C9791] block mb-3">
          UBAH PASSWORD
        </label>
        <div className="space-y-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="password baru (min 6 karakter)"
            className="w-full rounded-xl border border-white/10 bg-[#0E0E0E] px-4 py-3 text-sm outline-none focus:border-[#FF6A00] transition"
          />
          <button
            onClick={handleUpdatePassword}
            disabled={loading || !newPassword || newPassword.length < 6}
            className="bg-[#FF6A00] hover:bg-[#FF8A2B] text-white font-bold rounded-xl px-5 py-3 text-sm transition disabled:opacity-50"
          >
            {loading ? "..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
