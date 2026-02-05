import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Get the max position for the board
  const maxPosition = await prisma.column.findFirst({
    where: { boardId: body.boardId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const column = await prisma.column.create({
    data: {
      name: body.name,
      position: (maxPosition?.position ?? -1) + 1,
      color: body.color || "#6B7280",
      boardId: body.boardId,
    },
    include: { cards: true },
  });
  return NextResponse.json(column);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const column = await prisma.column.update({
    where: { id: body.id },
    data: {
      name: body.name,
      position: body.position,
      color: body.color,
    },
  });
  return NextResponse.json(column);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.column.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
