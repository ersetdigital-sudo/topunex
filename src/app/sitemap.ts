import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: games } = await supabase
    .from("games")
    .select("slug, updated_at")
    .eq("is_active", true);

  const base = "http://topunex.com";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
  ];

  const gamePages = (games || []).map((g) => ({
    url: `${base}/top-up/${g.slug}`,
    lastModified: new Date(g.updated_at),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...gamePages];
}
