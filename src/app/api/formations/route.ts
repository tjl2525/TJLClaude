import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const formations = await prisma.formation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(formations);
  } catch (error) {
    console.error("GET /api/formations error:", error);
    return NextResponse.json({ error: "Failed to fetch formations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, imageUrl, category, notes } = body;

    if (!name || !imageUrl) {
      return NextResponse.json({ error: "name and imageUrl are required" }, { status: 400 });
    }

    const formation = await prisma.formation.create({
      data: { name: name.trim(), imageUrl, category: category?.trim() || null, notes: notes?.trim() || null },
    });
    return NextResponse.json(formation, { status: 201 });
  } catch (error) {
    console.error("POST /api/formations error:", error);
    return NextResponse.json({ error: "Failed to create formation" }, { status: 500 });
  }
}
