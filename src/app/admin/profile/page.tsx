import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const metadata = {
  title: "Profile — Admin",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div>
      <Breadcrumb items={[{ label: "Profile" }]} className="mb-6" />
      <h1 className="font-['Archivo'] text-3xl font-bold mb-2">Profile</h1>
      <p className="text-sm text-[#9C9791] mb-8">
        Kelola email dan password akun admin.
      </p>
      <ProfileForm email={user.email || ""} />
    </div>
  );
}
