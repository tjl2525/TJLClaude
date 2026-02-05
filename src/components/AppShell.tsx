"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import CreateBoardModal from "./CreateBoardModal";

interface Board {
  id: string;
  name: string;
  color: string;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const fetchBoards = useCallback(async () => {
    const res = await fetch("/api/boards");
    const data = await res.json();
    setBoards(data.map((b: Board) => ({ id: b.id, name: b.name, color: b.color })));
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar boards={boards} onCreateBoard={() => setShowCreateBoard(true)} />
      <main className="ml-64 flex-1 p-6">{children}</main>
      {showCreateBoard && (
        <CreateBoardModal
          onClose={() => setShowCreateBoard(false)}
          onCreated={fetchBoards}
        />
      )}
    </div>
  );
}
