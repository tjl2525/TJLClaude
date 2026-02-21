"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Shuffle,
  Eye,
  EyeOff,
  RotateCcw,
  BookOpen,
  Trophy,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Formation {
  id: string;
  name: string;
  imageUrl: string;
  category: string | null;
  notes: string | null;
}

type CardState = "question" | "correct" | "incorrect" | "revealed";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StudyMode() {
  const [allFormations, setAllFormations] = useState<Formation[]>([]);
  const [deck, setDeck] = useState<Formation[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [cardState, setCardState] = useState<CardState>("question");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [loading, setLoading] = useState(true);
  const [sessionDone, setSessionDone] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  // Load formations
  useEffect(() => {
    fetch("/api/formations")
      .then((r) => r.json())
      .then((data: unknown) => {
        const formations = Array.isArray(data) ? (data as Formation[]) : [];
        setAllFormations(formations);
        setDeck(shuffle(formations));
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(allFormations.map((f) => f.category ?? "Uncategorized")))];

  const current = deck[index];

  const nextCard = useCallback(() => {
    if (index >= deck.length - 1) {
      setSessionDone(true);
    } else {
      setIndex((i) => i + 1);
      setAnswer("");
      setCardState("question");
    }
  }, [index, deck.length]);

  function handleCheck() {
    if (!answer.trim()) return;
    const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
    const isCorrect = normalise(answer) === normalise(current.name);
    setCardState(isCorrect ? "correct" : "incorrect");
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      incorrect: s.incorrect + (isCorrect ? 0 : 1),
    }));
  }

  function handleReveal() {
    setCardState("revealed");
  }

  function handleRestart() {
    const filtered =
      filterCategory === "All"
        ? allFormations
        : allFormations.filter((f) => (f.category ?? "Uncategorized") === filterCategory);
    setDeck(shuffle(filtered));
    setIndex(0);
    setAnswer("");
    setCardState("question");
    setScore({ correct: 0, incorrect: 0 });
    setSessionDone(false);
  }

  function handleFilterChange(cat: string) {
    setFilterCategory(cat);
    const filtered = cat === "All" ? allFormations : allFormations.filter((f) => (f.category ?? "Uncategorized") === cat);
    setDeck(shuffle(filtered));
    setIndex(0);
    setAnswer("");
    setCardState("question");
    setScore({ correct: 0, incorrect: 0 });
    setSessionDone(false);
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-400">Loading formations...</p>
      </div>
    );
  }

  // ── No formations ────────────────────────────────────────────────────────
  if (allFormations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <BookOpen className="w-12 h-12 text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">No formations in the library yet</h2>
        <p className="text-slate-400 mb-6">Add some formations to the library before studying.</p>
        <Link
          href="/formations"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Go to Library
        </Link>
      </div>
    );
  }

  // ── Session Complete ────────────────────────────────────────────────────
  if (sessionDone) {
    const pct = deck.length > 0 ? Math.round((score.correct / deck.length) * 100) : 0;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
          <Trophy className="w-10 h-10 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
        <p className="text-slate-400 mb-8">You went through all {deck.length} formations.</p>

        <div className="grid grid-cols-3 gap-4 w-full mb-8">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-400">{score.correct}</p>
            <p className="text-xs text-slate-400 mt-1">Correct</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-400">{score.incorrect}</p>
            <p className="text-xs text-slate-400 mt-1">Incorrect</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{pct}%</p>
            <p className="text-xs text-slate-400 mt-1">Score</p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Study Again
          </button>
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-slate-600"
          >
            <BookOpen className="w-5 h-5" />
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Study Card ──────────────────────────────────────────────────────
  const answered = cardState !== "question";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">
            Card {index + 1} of {deck.length}
          </span>
          {/* Category Filter */}
          {categories.length > 2 && (
            <select
              value={filterCategory}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="bg-slate-800 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Score */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400 font-semibold">{score.correct} ✓</span>
            <span className="text-red-400 font-semibold">{score.incorrect} ✗</span>
          </div>
          {/* Shuffle */}
          <button
            onClick={handleRestart}
            title="Shuffle & restart"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${((index) / deck.length) * 100}%` }}
        />
      </div>

      {/* Flash Card */}
      <div
        className={`rounded-2xl border-2 overflow-hidden transition-colors ${
          cardState === "correct"
            ? "border-green-500 bg-green-500/5"
            : cardState === "incorrect"
            ? "border-red-500 bg-red-500/5"
            : cardState === "revealed"
            ? "border-blue-500 bg-blue-500/5"
            : "border-slate-700 bg-slate-800/50"
        }`}
      >
        {/* Formation Image */}
        <div className="relative bg-slate-900 h-72 sm:h-96 flex items-center justify-center">
          <Image
            src={current.imageUrl}
            alt="Formation"
            fill
            className="object-contain p-4"
          />
          {current.category && (
            <span className="absolute top-3 left-3 text-xs bg-slate-800/90 text-green-400 px-2 py-1 rounded-full">
              {current.category}
            </span>
          )}
        </div>

        {/* Answer Area */}
        <div className="p-6 space-y-4">
          {/* State: question */}
          {cardState === "question" && (
            <>
              <p className="text-slate-300 text-sm text-center">
                What is the name of this formation?
              </p>
              <div className="flex gap-3">
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleCheck(); }}
                  placeholder="Type your answer..."
                  autoFocus
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 text-sm"
                />
                <button
                  onClick={handleCheck}
                  disabled={!answer.trim()}
                  className="px-5 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Check
                </button>
              </div>
              <div className="text-center">
                <button
                  onClick={handleReveal}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Reveal answer
                </button>
              </div>
            </>
          )}

          {/* State: correct */}
          {cardState === "correct" && (
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-lg font-bold">Correct!</span>
              </div>
              <p className="text-slate-300 text-sm">
                The answer is <span className="font-bold text-white">{current.name}</span>
              </p>
              {current.notes && <p className="text-xs text-slate-500 italic">{current.notes}</p>}
            </div>
          )}

          {/* State: incorrect */}
          {cardState === "incorrect" && (
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-red-400">
                <XCircle className="w-6 h-6" />
                <span className="text-lg font-bold">Not quite</span>
              </div>
              <p className="text-slate-300 text-sm">
                You typed: <span className="text-red-300 font-medium">{answer}</span>
              </p>
              <p className="text-slate-300 text-sm">
                Correct answer: <span className="font-bold text-white">{current.name}</span>
              </p>
              {current.notes && <p className="text-xs text-slate-500 italic">{current.notes}</p>}
            </div>
          )}

          {/* State: revealed */}
          {cardState === "revealed" && (
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <EyeOff className="w-6 h-6" />
                <span className="text-lg font-bold">Answer Revealed</span>
              </div>
              <p className="text-slate-300 text-sm">
                This formation is called: <span className="font-bold text-white">{current.name}</span>
              </p>
              {current.notes && <p className="text-xs text-slate-500 italic">{current.notes}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (index > 0) {
              setIndex((i) => i - 1);
              setAnswer("");
              setCardState("question");
            }
          }}
          disabled={index === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {answered && (
          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {index >= deck.length - 1 ? "Finish" : "Next Formation"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <div className="w-24" /> {/* Spacer for symmetry */}
      </div>
    </div>
  );
}
