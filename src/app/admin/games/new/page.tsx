import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { NewGameForm } from "@/components/admin/NewGameForm";

export const metadata = {
  title: "Tambah Game — Admin",
  robots: { index: false, follow: false },
};

export default function NewGamePage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Games", href: "/admin" },
          { label: "Tambah Baru" },
        ]}
        className="mb-6"
      />
      <NewGameForm />
    </div>
  );
}
