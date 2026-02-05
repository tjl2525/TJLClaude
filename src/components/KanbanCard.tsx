"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar,
  DollarSign,
  MessageSquare,
  User,
} from "lucide-react";
import { cn, PRIORITY_COLORS, formatCurrency } from "@/lib/utils";
import type { CardData } from "./KanbanBoard";

interface KanbanCardProps {
  card: CardData;
  isDragging?: boolean;
  onCardClick: (cardId: string) => void;
}

export default function KanbanCard({ card, isDragging, onCardClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isBeingDragged = isDragging || isSortableDragging;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onCardClick(card.id)}
      className={cn(
        "bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow",
        isBeingDragged && "opacity-50 shadow-lg rotate-2"
      )}
    >
      {/* Labels */}
      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((label) => (
            <span
              key={label.id}
              className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h4 className="text-sm font-medium text-gray-800 mb-2">{card.title}</h4>

      {/* Description preview */}
      {card.description && (
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {card.description}
        </p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Priority */}
        <span
          className={cn(
            "px-2 py-0.5 rounded-full font-medium",
            PRIORITY_COLORS[card.priority]
          )}
        >
          {card.priority}
        </span>

        {/* Value */}
        {card.value && (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <DollarSign className="w-3 h-3" />
            {formatCurrency(card.value)}
          </span>
        )}

        {/* Due Date */}
        {card.dueDate && (
          <span className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(card.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}

        {/* Activities count */}
        {card._count && card._count.activities > 0 && (
          <span className="flex items-center gap-1 text-gray-400">
            <MessageSquare className="w-3 h-3" />
            {card._count.activities}
          </span>
        )}
      </div>

      {/* Contact */}
      {card.contact && (
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
          <User className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {card.contact.firstName} {card.contact.lastName}
          </span>
          {card.contact.company && (
            <span className="text-xs text-gray-400">
              - {card.contact.company}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
