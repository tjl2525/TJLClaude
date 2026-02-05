"use client";

import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  DollarSign,
  User,
  Tag,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Trash2,
  Clock,
} from "lucide-react";
import { cn, PRIORITY_COLORS, formatDate } from "@/lib/utils";

interface Activity {
  id: string;
  type: string;
  content: string;
  createdAt: string;
}

interface CardDetail {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  dueDate: string | null;
  value: number | null;
  columnId: string;
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    company: string | null;
    phone: string | null;
  } | null;
  labels: { id: string; name: string; color: string }[];
  activities: Activity[];
  column: {
    name: string;
    board: { name: string };
  };
}

interface CardModalProps {
  cardId: string;
  onClose: () => void;
}

const ACTIVITY_ICONS: Record<string, typeof Phone> = {
  note: FileText,
  call: Phone,
  email: Mail,
  meeting: User,
  task: Clock,
};

export default function CardModal({ cardId, onClose }: CardModalProps) {
  const [card, setCard] = useState<CardDetail | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const [newActivityType, setNewActivityType] = useState("note");
  const [newActivityContent, setNewActivityContent] = useState("");

  useEffect(() => {
    fetchCard();
  }, [cardId]);

  const fetchCard = async () => {
    const res = await fetch(`/api/cards?id=${cardId}`);
    const data = await res.json();
    setCard(data);
    setTitle(data.title);
    setDescription(data.description || "");
    setPriority(data.priority);
    setDueDate(data.dueDate ? data.dueDate.split("T")[0] : "");
    setValue(data.value ? String(data.value) : "");
  };

  const handleSave = async () => {
    await fetch("/api/cards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: cardId,
        title,
        description: description || null,
        priority,
        dueDate: dueDate || null,
        value: value || null,
      }),
    });
    setEditing(false);
    fetchCard();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this card? This cannot be undone.")) return;
    await fetch(`/api/cards?id=${cardId}`, { method: "DELETE" });
    onClose();
  };

  const handleAddActivity = async () => {
    if (!newActivityContent.trim()) return;
    await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: newActivityType,
        content: newActivityContent.trim(),
        cardId: cardId,
        contactId: card?.contact?.id || null,
      }),
    });
    setNewActivityContent("");
    fetchCard();
  };

  if (!card) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-12 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mb-12">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">
              {card.column.board.name} &gt; {card.column.name}
            </p>
            {editing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-800">
                {card.title}
              </h2>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setTitle(card.title);
                    setDescription(card.description || "");
                    setPriority(card.priority);
                  }}
                  className="px-3 py-1.5 text-gray-600 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded"
              title="Delete card"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Left column - main content */}
          <div className="col-span-2 space-y-6">
            {/* Labels */}
            {card.labels.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {card.labels.map((label) => (
                    <span
                      key={label.id}
                      className="text-xs px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Description
              </h3>
              {editing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a description..."
                />
              ) : (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {card.description || "No description"}
                </p>
              )}
            </div>

            {/* Activity Log */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Activity
              </h3>

              {/* Add Activity */}
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <div className="flex gap-2 mb-2">
                  {["note", "call", "email", "meeting", "task"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewActivityType(type)}
                      className={cn(
                        "px-2 py-1 text-xs rounded-full capitalize",
                        newActivityType === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newActivityContent}
                    onChange={(e) => setNewActivityContent(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddActivity()}
                    placeholder="Add a note, log a call..."
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddActivity}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Activity List */}
              <div className="space-y-3">
                {card.activities.map((activity) => {
                  const Icon = ACTIVITY_ICONS[activity.type] || FileText;
                  return (
                    <div
                      key={activity.id}
                      className="flex gap-3 text-sm"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700 capitalize">
                            {activity.type}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(activity.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-0.5">
                          {activity.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {card.activities.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    No activity yet
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column - sidebar */}
          <div className="space-y-4">
            {/* Priority */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Priority
              </label>
              {editing ? (
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 w-full px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              ) : (
                <div className="mt-1">
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium capitalize",
                      PRIORITY_COLORS[card.priority]
                    )}
                  >
                    {card.priority}
                  </span>
                </div>
              )}
            </div>

            {/* Value */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Deal Value
              </label>
              {editing ? (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 w-full px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-700">
                  {card.value
                    ? `$${card.value.toLocaleString()}`
                    : "Not set"}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Due Date
              </label>
              {editing ? (
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 w-full px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-700">
                  {card.dueDate ? formatDate(card.dueDate) : "Not set"}
                </p>
              )}
            </div>

            {/* Contact */}
            {card.contact && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Contact
                </label>
                <div className="mt-1 bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-800">
                    {card.contact.firstName} {card.contact.lastName}
                  </p>
                  {card.contact.company && (
                    <p className="text-xs text-gray-500">
                      {card.contact.company}
                    </p>
                  )}
                  {card.contact.email && (
                    <p className="text-xs text-blue-500 mt-1">
                      {card.contact.email}
                    </p>
                  )}
                  {card.contact.phone && (
                    <p className="text-xs text-gray-500">
                      {card.contact.phone}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
