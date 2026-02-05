"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import CardModal from "./CardModal";
import { Plus } from "lucide-react";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  company: string | null;
}

export interface CardData {
  id: string;
  title: string;
  description: string | null;
  position: number;
  priority: string;
  dueDate: string | null;
  value: number | null;
  columnId: string;
  contact: Contact | null;
  labels: Label[];
  _count?: { activities: number };
}

export interface ColumnData {
  id: string;
  name: string;
  position: number;
  color: string;
  boardId: string;
  cards: CardData[];
}

interface KanbanBoardProps {
  columns: ColumnData[];
  boardId: string;
  onRefresh: () => void;
}

export default function KanbanBoard({ columns, boardId, onRefresh }: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [addingColumnName, setAddingColumnName] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = columns
      .flatMap((col) => col.cards)
      .find((c) => c.id === active.id);
    if (card) setActiveCard(card);
  };

  const handleDragOver = async (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which columns contain the active and over items
    const activeColumn = columns.find(
      (col) => col.cards.some((c) => c.id === activeId) || col.id === activeId
    );
    const overColumn = columns.find(
      (col) => col.cards.some((c) => c.id === overId) || col.id === overId
    );

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    // Card is being dragged to a different column
    const targetColumnId = overColumn.id;
    const card = activeColumn.cards.find((c) => c.id === activeId);
    if (!card || card.columnId === targetColumnId) return;

    // Update the card's column via API
    await fetch("/api/cards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: activeId,
        columnId: targetColumnId,
        position: overColumn.cards.length,
      }),
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the card and its target
    const overColumn = columns.find(
      (col) => col.cards.some((c) => c.id === overId) || col.id === overId
    );

    if (overColumn) {
      const overCardIndex = overColumn.cards.findIndex((c) => c.id === overId);
      const newPosition = overCardIndex >= 0 ? overCardIndex : overColumn.cards.length;

      await fetch("/api/cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeId,
          columnId: overColumn.id,
          position: newPosition,
        }),
      });
    }

    onRefresh();
  };

  const handleAddColumn = async () => {
    if (!addingColumnName.trim()) return;
    await fetch("/api/columns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: addingColumnName.trim(), boardId }),
    });
    setAddingColumnName("");
    setShowAddColumn(false);
    onRefresh();
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 h-full items-start">
          <SortableContext
            items={columns.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onCardClick={(cardId) => setSelectedCard(cardId)}
                onRefresh={onRefresh}
              />
            ))}
          </SortableContext>

          {/* Add Column */}
          <div className="flex-shrink-0 w-72">
            {showAddColumn ? (
              <div className="bg-gray-100 rounded-xl p-3">
                <input
                  type="text"
                  value={addingColumnName}
                  onChange={(e) => setAddingColumnName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
                  placeholder="Column name..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleAddColumn}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddColumn(false);
                      setAddingColumnName("");
                    }}
                    className="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddColumn(true)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm text-gray-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Column
              </button>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeCard ? (
            <KanbanCard card={activeCard} isDragging onCardClick={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardModal
          cardId={selectedCard}
          onClose={() => {
            setSelectedCard(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
}
