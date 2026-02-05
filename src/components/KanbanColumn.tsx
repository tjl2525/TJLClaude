"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import { Plus, MoreHorizontal, Trash2 } from "lucide-react";
import type { ColumnData } from "./KanbanBoard";

interface KanbanColumnProps {
  column: ColumnData;
  onCardClick: (cardId: string) => void;
  onRefresh: () => void;
}

export default function KanbanColumn({
  column,
  onCardClick,
  onRefresh,
}: KanbanColumnProps) {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;
    await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newCardTitle.trim(),
        columnId: column.id,
      }),
    });
    setNewCardTitle("");
    setShowAddCard(false);
    onRefresh();
  };

  const handleDeleteColumn = async () => {
    if (!confirm(`Delete column "${column.name}" and all its cards?`)) return;
    await fetch(`/api/columns?id=${column.id}`, { method: "DELETE" });
    setShowMenu(false);
    onRefresh();
  };

  const totalValue = column.cards.reduce(
    (sum, card) => sum + (card.value || 0),
    0
  );

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-72 bg-gray-50 rounded-xl flex flex-col max-h-[calc(100vh-12rem)] ${
        isOver ? "ring-2 ring-blue-400 bg-blue-50" : ""
      }`}
    >
      {/* Column Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="font-semibold text-sm text-gray-700">{column.name}</h3>
          <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {column.cards.length}
          </span>
        </div>
        <div className="flex items-center gap-1 relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border py-1 min-w-[150px]">
                <button
                  onClick={handleDeleteColumn}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Column
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Total Value */}
      {totalValue > 0 && (
        <div className="px-3 pb-2">
          <span className="text-xs text-gray-500">
            Total: ${totalValue.toLocaleString()}
          </span>
        </div>
      )}

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        <SortableContext
          items={column.cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onCardClick={onCardClick}
            />
          ))}
        </SortableContext>

        {/* Add Card Form */}
        {showAddCard ? (
          <div className="bg-white rounded-lg p-3 shadow-sm border">
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCard();
                if (e.key === "Escape") {
                  setShowAddCard(false);
                  setNewCardTitle("");
                }
              }}
              placeholder="Enter card title..."
              className="w-full text-sm focus:outline-none"
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddCard}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                Add Card
              </button>
              <button
                onClick={() => {
                  setShowAddCard(false);
                  setNewCardTitle("");
                }}
                className="px-3 py-1 text-gray-500 text-xs hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCard(true)}
            className="w-full flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add a card
          </button>
        )}
      </div>
    </div>
  );
}
