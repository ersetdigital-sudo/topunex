import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  const { data: pricing } = await supabase
    .from("pricing")
    .select("*")
    .eq("game_id", game.id)
    .order("sort_order");

  return NextResponse.json({ game, pricing: pricing || [] });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const { data: game } = await supabase
    .from("games")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("games")
    .update({
      name: body.name,
      icon_url: body.icon_url,
      is_active: body.is_active,
      sort_order: body.sort_order,
      range_label: body.range_label,
      user_id_label: body.user_id_label,
      user_id_placeholder: body.user_id_placeholder,
      server_id_label: body.server_id_label,
      server_id_placeholder: body.server_id_placeholder,
      server_id_required: body.server_id_required,
      hide_server_id: body.hide_server_id,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { error } = await supabase.from("games").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
