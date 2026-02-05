import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get("cardId");
  const contactId = searchParams.get("contactId");

  const where: Record<string, string> = {};
  if (cardId) where.cardId = cardId;
  if (contactId) where.contactId = contactId;

  const activities = await prisma.activity.findMany({
    where,
    include: {
      card: { select: { id: true, title: true } },
      contact: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(activities);
}

export async function POST(request: Request) {
  const body = await request.json();
  const activity = await prisma.activity.create({
    data: {
      type: body.type,
      content: body.content,
      cardId: body.cardId || null,
      contactId: body.contactId || null,
    },
  });
  return NextResponse.json(activity);
}
