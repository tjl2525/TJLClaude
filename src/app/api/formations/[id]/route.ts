import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formation = await prisma.formation.findUnique({ where: { id } });
    if (!formation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete the image file from disk
    try {
      const filePath = path.join(process.cwd(), "public", formation.imageUrl);
      await unlink(filePath);
    } catch {
      // File may already be gone — continue with DB delete
    }

    await prisma.formation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/formations/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete formation" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, category, notes } = body;

    const formation = await prisma.formation.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(category !== undefined && { category: category?.trim() || null }),
        ...(notes !== undefined && { notes: notes?.trim() || null }),
      },
    });
    return NextResponse.json(formation);
  } catch (error) {
    console.error("PATCH /api/formations/[id] error:", error);
    return NextResponse.json({ error: "Failed to update formation" }, { status: 500 });
  }
}
