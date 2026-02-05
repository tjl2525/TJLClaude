import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const card = await prisma.card.findUnique({
      where: { id },
      include: {
        contact: true,
        labels: true,
        activities: { orderBy: { createdAt: "desc" } },
        column: { include: { board: true } },
      },
    });
    return NextResponse.json(card);
  }

  const cards = await prisma.card.findMany({
    include: { contact: true, labels: true },
    orderBy: { position: "asc" },
  });
  return NextResponse.json(cards);
}

export async function POST(request: Request) {
  const body = await request.json();

  // Get the max position for the column
  const maxPosition = await prisma.card.findFirst({
    where: { columnId: body.columnId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const card = await prisma.card.create({
    data: {
      title: body.title,
      description: body.description,
      position: body.position ?? (maxPosition?.position ?? -1) + 1,
      priority: body.priority || "medium",
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      value: body.value ? parseFloat(body.value) : null,
      columnId: body.columnId,
      contactId: body.contactId || null,
      labels: body.labelIds
        ? { connect: body.labelIds.map((id: string) => ({ id })) }
        : undefined,
    },
    include: {
      contact: true,
      labels: true,
      _count: { select: { activities: true } },
    },
  });
  return NextResponse.json(card);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const card = await prisma.card.update({
    where: { id: body.id },
    data: {
      title: body.title,
      description: body.description,
      position: body.position,
      priority: body.priority,
      dueDate: body.dueDate ? new Date(body.dueDate) : body.dueDate === null ? null : undefined,
      value: body.value !== undefined ? (body.value ? parseFloat(body.value) : null) : undefined,
      columnId: body.columnId,
      contactId: body.contactId !== undefined ? body.contactId || null : undefined,
      labels: body.labelIds
        ? { set: body.labelIds.map((id: string) => ({ id })) }
        : undefined,
    },
    include: {
      contact: true,
      labels: true,
      _count: { select: { activities: true } },
    },
  });
  return NextResponse.json(card);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.card.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
