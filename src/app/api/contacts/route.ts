import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const contacts = await prisma.contact.findMany({
    include: {
      _count: { select: { cards: true, activities: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const contact = await prisma.contact.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      jobTitle: body.jobTitle,
      notes: body.notes,
      status: body.status || "active",
    },
  });
  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const contact = await prisma.contact.update({
    where: { id: body.id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      jobTitle: body.jobTitle,
      notes: body.notes,
      status: body.status,
    },
  });
  return NextResponse.json(contact);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.contact.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
