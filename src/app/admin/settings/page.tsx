import { createClient } from "@/lib/supabase/server";
import type { Setting } from "@/lib/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata = {
  title: "Settings — Admin",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .order("key");

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Settings" }]}
        className="mb-6"
      />
      <h1 className="font-['Archivo'] text-3xl font-bold mb-2">Settings</h1>
      <p className="text-sm text-[#9C9791] mb-8">
        Kelola QRIS image, WhatsApp number, dan pengaturan lainnya.
      </p>
      <SettingsForm settings={(settings || []) as Setting[]} />
    </div>
  );
}
