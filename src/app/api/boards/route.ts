import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const boards = await prisma.board.findMany({
    include: {
      columns: {
        orderBy: { position: "asc" },
        include: {
          cards: {
            orderBy: { position: "asc" },
            include: {
              contact: true,
              labels: true,
              _count: { select: { activities: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(boards);
}

export async function POST(request: Request) {
  const body = await request.json();
  const board = await prisma.board.create({
    data: {
      name: body.name,
      description: body.description,
      color: body.color || "#3B82F6",
      columns: {
        create: (body.columns || ["To Do", "In Progress", "Done"]).map(
          (name: string, index: number) => ({
            name,
            position: index,
          })
        ),
      },
    },
    include: {
      columns: {
        orderBy: { position: "asc" },
        include: { cards: true },
      },
    },
  });
  return NextResponse.json(board);
}
