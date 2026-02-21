import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

// Returns image URLs from public/formations/ that are not yet in the DB.
export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "formations");
    const files = await readdir(dir);

    const existing = await prisma.formation.findMany({ select: { imageUrl: true } });
    const existingUrls = new Set(existing.map((f) => f.imageUrl));

    const available = files
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      .sort()
      .map((f) => `/formations/${f}`)
      .filter((url) => !existingUrls.has(url));

    return NextResponse.json(available);
  } catch (error) {
    console.error("GET /api/formations/images error:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}
