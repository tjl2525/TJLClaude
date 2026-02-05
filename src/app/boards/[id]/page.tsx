"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import KanbanBoard, { type ColumnData } from "@/components/KanbanBoard";

interface Board {
  id: string;
  name: string;
  description: string | null;
  color: string;
  columns: ColumnData[];
}

export default function BoardPage() {
  const params = useParams();
  const boardId = params.id as string;
  const [board, setBoard] = useState<Board | null>(null);

  const fetchBoard = useCallback(async () => {
    const res = await fetch("/api/boards");
    const boards = await res.json();
    const found = boards.find((b: Board) => b.id === boardId);
    if (found) setBoard(found);
  }, [boardId]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  if (!board) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading board...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <span
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: board.color }}
          />
          <h1 className="text-2xl font-bold text-gray-800">{board.name}</h1>
        </div>
        {board.description && (
          <p className="text-sm text-gray-500 ml-7">{board.description}</p>
        )}
      </div>
      <KanbanBoard
        columns={board.columns}
        boardId={board.id}
        onRefresh={fetchBoard}
      />
    </AppShell>
  );
}
