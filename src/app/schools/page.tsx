"use client";

import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import {
  Search,
  Check,
  Plus,
  X,
  Send,
  MapPin,
  Calendar,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SCHOOLS,
  DIVISIONS,
  DIV_COLORS,
  getUniqueStates,
} from "@/data/schoolsData";
import type { School } from "@/data/schoolsData";

type Tab = "schools" | "visited" | "trips" | "assistant";

interface Trip {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  notes: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const emptyTripForm = {
  name: "",
  location: "",
  startDate: "",
  endDate: "",
  notes: "",
};

export default function SchoolsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("schools");
  const [visited, setVisited] = useState<number[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterDiv, setFilterDiv] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [tripForm, setTripForm] = useState(emptyTripForm);
  const [showTripForm, setShowTripForm] = useState(false);

  const states = useMemo(() => getUniqueStates(), []);

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      const matchDiv = filterDiv === "All" || s.div === filterDiv;
      const matchState = filterState === "All" || s.state === filterState;
      const matchSearch =
        searchText === "" ||
        s.name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.city.toLowerCase().includes(searchText.toLowerCase()) ||
        s.conf.toLowerCase().includes(searchText.toLowerCase());
      return matchDiv && matchState && matchSearch;
    });
  }, [filterDiv, filterState, searchText]);

  const toggleVisited = (id: number) => {
    setVisited((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id]
    );
  };

  const visitedSchools = SCHOOLS.filter((s) => visited.includes(s.id));

  const visitedByDiv: Record<string, number> = {};
  visitedSchools.forEach((s) => {
    visitedByDiv[s.div] = (visitedByDiv[s.div] || 0) + 1;
  });

  const divCounts = useMemo(() => {
    return DIVISIONS.slice(1).reduce(
      (acc, d) => {
        acc[d] = SCHOOLS.filter((s) => s.div === d).length;
        return acc;
      },
      {} as Record<string, number>
    );
  }, []);

  const sendAI = async () => {
    if (!aiInput.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: aiInput };
    const newMessages = [...aiMessages, userMsg];
    setAiMessages(newMessages);
    setAiInput("");
    setAiLoading(true);

    const context = `You are a college football stadium travel assistant. The user is tracking visits to college football stadiums across all levels (Power 4, Group of 5, FCS, D2, D3, NAIA, JUCO).
Schools already visited (${visitedSchools.length}):
${visitedSchools.map((s) => `- ${s.name} (${s.div}, ${s.conf}) in ${s.city}, ${s.state}`).join("\n") || "None yet"}
Active trips:
${trips.map((t) => `- ${t.name}: ${t.location}, ${t.startDate} to ${t.endDate}. Notes: ${t.notes}`).join("\n") || "None planned"}
Full school database (name, div, city, state):
${SCHOOLS.map((s) => `${s.name}|${s.div}|${s.city}|${s.state}`).join("\n")}
Help the user plan stadium visits. When they mention a geographic area or trip, suggest nearby schools they haven't visited yet across all levels. Prioritize P4 > G5 > FCS > D2/D3/NAIA/JUCO unless asked otherwise. Be specific with distances and geographic context. Be enthusiastic and knowledgeable about college football.`;

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: context,
          messages: newMessages,
        }),
      });
      const data = await response.json();
      const text =
        data.content?.find((b: { type: string; text?: string }) => b.type === "text")?.text ||
        data.error ||
        "Sorry, I couldn't generate a response.";
      setAiMessages((m) => [...m, { role: "assistant", content: text }]);
    } catch {
      setAiMessages((m) => [
        ...m,
        { role: "assistant", content: "Error reaching AI. Please try again." },
      ]);
    }
    setAiLoading(false);
  };

  const addTrip = () => {
    if (!tripForm.name || !tripForm.location) return;
    setTrips((t) => [...t, { ...tripForm, id: Date.now() }]);
    setTripForm(emptyTripForm);
    setShowTripForm(false);
  };

  const removeTrip = (id: number) =>
    setTrips((t) => t.filter((x) => x.id !== id));

  const tabs: { key: Tab; label: string }[] = [
    { key: "schools", label: "All Schools" },
    { key: "visited", label: `Visited (${visited.length})` },
    { key: "trips", label: "My Trips" },
    { key: "assistant", label: "AI Assistant" },
  ];

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 text-white rounded-xl mb-6 overflow-hidden">
          <div className="px-6 pt-5 pb-0">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Stadium Tracker
            </h1>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              College football at every level — Power 4 to JUCO
            </p>
            <div className="flex gap-0.5">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors",
                    activeTab === t.key
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All Schools Tab */}
        {activeTab === "schools" && (
          <>
            {/* Division Stats */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {Object.entries(divCounts).map(([div, count]) => (
                <div
                  key={div}
                  className="bg-white rounded-xl shadow-sm border px-4 py-2.5 flex-1 min-w-[100px]"
                >
                  <div className="text-xl font-bold text-gray-800">
                    {count}
                  </div>
                  <div className="text-xs text-gray-500">{div}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by name, city, conference..."
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterDiv}
                onChange={(e) => setFilterDiv(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DIVISIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              Showing {filtered.length} of {SCHOOLS.length} schools — click to
              toggle visited
            </p>

            {/* School List */}
            <div className="flex flex-col gap-1">
              {filtered.map((s) => (
                <SchoolRow
                  key={s.id}
                  school={s}
                  isVisited={visited.includes(s.id)}
                  onClick={() => toggleVisited(s.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Visited Tab */}
        {activeTab === "visited" && (
          <>
            <div className="flex gap-2 mb-5 flex-wrap">
              {Object.entries(visitedByDiv).map(([div, count]) => (
                <div
                  key={div}
                  className="bg-white rounded-xl shadow-sm border px-4 py-2.5 flex-1 min-w-[100px]"
                >
                  <div className="text-xl font-bold text-gray-800">
                    {count}
                  </div>
                  <div className="text-xs text-gray-500">{div}</div>
                </div>
              ))}
              <div className="bg-white rounded-xl shadow-sm border px-4 py-2.5 flex-1 min-w-[100px]">
                <div className="text-xl font-bold text-gray-800">
                  {visited.length}
                </div>
                <div className="text-xs text-gray-500">Total visited</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border px-4 py-2.5 flex-1 min-w-[100px]">
                <div className="text-xl font-bold text-gray-800">
                  {Math.round((visited.length / SCHOOLS.length) * 100)}%
                </div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            </div>

            {visitedSchools.length === 0 ? (
              <div className="text-gray-400 text-sm text-center py-10">
                No visits logged yet. Head to &quot;All Schools&quot; and click
                to mark visits!
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {visitedSchools.map((s) => (
                  <SchoolRow
                    key={s.id}
                    school={s}
                    isVisited
                    onClick={() => toggleVisited(s.id)}
                    showCapacity
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Trips Tab */}
        {activeTab === "trips" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800">
                Travel Plans
              </h2>
              <button
                onClick={() => setShowTripForm((f) => !f)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                {showTripForm ? (
                  "Cancel"
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add Trip
                  </>
                )}
              </button>
            </div>

            {showTripForm && (
              <div className="bg-gray-50 border rounded-xl p-4 mb-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Trip Name
                  </label>
                  <input
                    value={tripForm.name}
                    onChange={(e) =>
                      setTripForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. SEC Country Road Trip"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Location / Region
                  </label>
                  <input
                    value={tripForm.location}
                    onChange={(e) =>
                      setTripForm((f) => ({ ...f, location: e.target.value }))
                    }
                    placeholder="e.g. Southeast, or Atlanta GA area"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={tripForm.startDate}
                      onChange={(e) =>
                        setTripForm((f) => ({
                          ...f,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={tripForm.endDate}
                      onChange={(e) =>
                        setTripForm((f) => ({
                          ...f,
                          endDate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Games / Notes
                  </label>
                  <textarea
                    value={tripForm.notes}
                    onChange={(e) =>
                      setTripForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="e.g. Alabama vs Tennessee Oct 19, then Auburn on Oct 21..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                  />
                </div>
                <button
                  onClick={addTrip}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Save Trip
                </button>
              </div>
            )}

            {trips.length === 0 ? (
              <div className="text-gray-400 text-sm text-center py-10">
                No trips planned yet. Add a trip to track your travel schedule!
              </div>
            ) : (
              <div className="space-y-3">
                {trips.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-xl shadow-sm border p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-gray-800">
                          {t.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {t.location}
                        </p>
                        {t.startDate && (
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {t.startDate}
                            {t.endDate ? ` \u2192 ${t.endDate}` : ""}
                          </p>
                        )}
                        {t.notes && (
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {t.notes}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeTrip(t.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* AI Assistant Tab */}
        {activeTab === "assistant" && (
          <>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Ask the AI about nearby schools for your trips, what to visit in a
              region, how to combine schools efficiently, etc. It knows your
              visited schools and your travel plans.
            </p>

            <div className="flex flex-col gap-3 min-h-[300px]">
              {aiMessages.length === 0 && (
                <div className="text-gray-400 text-sm text-center py-5">
                  Try asking: &quot;I&apos;m going to be in the Dallas area this
                  weekend — what schools could I add?&quot; or &quot;Plan me a
                  3-day SEC trip from Atlanta.&quot;
                </div>
              )}
              {aiMessages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "self-end bg-gray-900 text-white"
                      : "self-start bg-gray-100 text-gray-800"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {aiLoading && (
                <div className="self-start bg-gray-100 text-gray-800 px-4 py-3 rounded-xl text-sm">
                  Thinking...
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendAI()}
                placeholder="Ask about schools, regions, trips..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendAI}
                disabled={aiLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

function SchoolRow({
  school,
  isVisited,
  onClick,
  showCapacity,
}: {
  school: School;
  isVisited: boolean;
  onClick: () => void;
  showCapacity?: boolean;
}) {
  const colors = DIV_COLORS[school.div];

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors",
        isVisited
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200 hover:bg-gray-50"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
          isVisited ? "border-green-500 bg-green-500" : "border-gray-300"
        )}
      >
        {isVisited && <Check className="w-3 h-3 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {school.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {school.conf} &middot; {school.city}, {school.state} &middot;{" "}
          {school.stadium}
          {showCapacity && school.capacity
            ? ` (${school.capacity.toLocaleString()} cap)`
            : ""}
        </p>
      </div>
      {colors && (
        <span
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-md whitespace-nowrap",
            colors.bg,
            colors.text
          )}
        >
          {school.div}
        </span>
      )}
    </div>
  );
}
