import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only image files (JPG, PNG, GIF, WEBP, SVG) are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename — strip spaces/special chars, keep extension
    const ext = path.extname(file.name).toLowerCase();
    const safeName = `formation_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "formations");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    const imageUrl = `/formations/${safeName}`;
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    console.error("POST /api/formations/upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
