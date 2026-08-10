import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("games")
    .insert({
      name: body.name,
      slug: body.slug,
      icon_url: body.icon_url || "/images/d0ad9f14-8bcf-43d9-8f02-ea7a4ecf5706.png",
      is_active: body.is_active ?? true,
      sort_order: body.sort_order ?? 0,
      range_label: body.range_label || "",
      icon_width: body.icon_width ?? 512,
      icon_height: body.icon_height ?? 512,
      user_id_label: body.user_id_label || "User ID",
      user_id_placeholder: body.user_id_placeholder || "12345678",
      server_id_label: body.server_id_label || "Zone ID",
      server_id_placeholder: body.server_id_placeholder || "",
      server_id_required: body.server_id_required ?? false,
      hide_server_id: body.hide_server_id ?? false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
