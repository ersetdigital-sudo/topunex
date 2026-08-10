import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Game, Pricing } from "@/lib/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GameEditForm } from "@/components/admin/GameEditForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: "Edit Game — Admin",
  robots: { index: false, follow: false },
};

export default async function EditGamePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!game) notFound();

  const { data: pricing } = await supabase
    .from("pricing")
    .select("*")
    .eq("game_id", game.id)
    .order("sort_order");

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Games", href: "/admin" },
          { label: game.name },
        ]}
        className="mb-6"
      />
      <GameEditForm game={game as Game} pricing={(pricing || []) as Pricing[]} />
    </div>
  );
}
