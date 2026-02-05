"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import Link from "next/link";
import {
  Kanban,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface BoardSummary {
  id: string;
  name: string;
  color: string;
  description: string | null;
  columns: {
    id: string;
    name: string;
    cards: { id: string; value: number | null }[];
  }[];
}

interface ContactSummary {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  status: string;
}

export default function DashboardPage() {
  const [boards, setBoards] = useState<BoardSummary[]>([]);
  const [contacts, setContacts] = useState<ContactSummary[]>([]);

  useEffect(() => {
    fetch("/api/boards")
      .then((r) => r.json())
      .then(setBoards);
    fetch("/api/contacts")
      .then((r) => r.json())
      .then(setContacts);
  }, []);

  const totalCards = boards.reduce(
    (sum, b) => sum + b.columns.reduce((s, c) => s + c.cards.length, 0),
    0
  );
  const totalValue = boards.reduce(
    (sum, b) =>
      sum +
      b.columns.reduce(
        (s, c) =>
          s + c.cards.reduce((v, card) => v + (card.value || 0), 0),
        0
      ),
    0
  );

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Kanban className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {boards.length}
                </p>
                <p className="text-sm text-gray-500">Boards</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {totalCards}
                </p>
                <p className="text-sm text-gray-500">Active Cards</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  ${totalValue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Pipeline Value</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {contacts.length}
                </p>
                <p className="text-sm text-gray-500">Contacts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Boards Overview */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Your Boards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {boards.map((board) => {
            const cardCount = board.columns.reduce(
              (s, c) => s + c.cards.length,
              0
            );
            const boardValue = board.columns.reduce(
              (s, c) =>
                s +
                c.cards.reduce((v, card) => v + (card.value || 0), 0),
              0
            );
            return (
              <Link
                key={board.id}
                href={`/boards/${board.id}`}
                className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: board.color }}
                    />
                    <h3 className="font-semibold text-gray-800">
                      {board.name}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
                {board.description && (
                  <p className="text-sm text-gray-500 mt-2">
                    {board.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>{board.columns.length} columns</span>
                  <span>{cardCount} cards</span>
                  {boardValue > 0 && (
                    <span className="text-green-600 font-medium">
                      ${boardValue.toLocaleString()}
                    </span>
                  )}
                </div>
                {/* Column preview */}
                <div className="flex gap-1 mt-3">
                  {board.columns.map((col) => (
                    <div
                      key={col.id}
                      className="flex-1 bg-gray-100 rounded h-2"
                      title={`${col.name}: ${col.cards.length} cards`}
                    >
                      <div
                        className="h-full rounded"
                        style={{
                          width: cardCount > 0 ? `${(col.cards.length / cardCount) * 100}%` : "0%",
                          backgroundColor: board.color,
                          minWidth: col.cards.length > 0 ? "4px" : "0",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Contacts */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Contacts
        </h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.slice(0, 5).map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {contact.company || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        contact.status === "active"
                          ? "bg-green-100 text-green-700"
                          : contact.status === "lead"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    No contacts yet. Add your first contact!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {contacts.length > 5 && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <Link
                href="/contacts"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all {contacts.length} contacts →
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
