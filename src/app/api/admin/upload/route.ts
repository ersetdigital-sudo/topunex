import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Upload to Cloudinary
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "topunex/qris";

  // Create signature
  const crypto = await import("crypto");
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  const uploadFormData = new FormData();
  uploadFormData.append("file", file);
  uploadFormData.append("folder", folder);
  uploadFormData.append("timestamp", timestamp.toString());
  uploadFormData.append("api_key", apiKey!);
  uploadFormData.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadFormData }
  );

  if (!uploadRes.ok) {
    const err = await uploadRes.json();
    return NextResponse.json({ error: err.error?.message || "Upload failed" }, { status: 500 });
  }

  const uploadData = await uploadRes.json();
  const imageUrl = uploadData.secure_url;

  // Save to settings
  await supabase
    .from("settings")
    .upsert(
      { key: "qris_image_url", value: imageUrl, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

  return NextResponse.json({ url: imageUrl });
}
