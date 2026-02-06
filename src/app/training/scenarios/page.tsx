"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gamepad2,
  ArrowLeft,
  Clock,
  Flag,
  Timer,
  Trophy,
  Target,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Star,
  Zap,
} from "lucide-react";
import { scenarios, type Scenario, type ScenarioChoice } from "@/data/scenarioData";

type GameState = "select" | "playing" | "feedback" | "results";

interface ScenarioResult {
  scenarioId: string;
  choiceIndex: number;
  pointsAwarded: number;
  maxPoints: number;
  wasOptimal: boolean;
}

function saveProgress(completed: number, bestScore: number) {
  try {
    const existing = localStorage.getItem("ncaa-clock-progress");
    const data = existing
      ? JSON.parse(existing)
      : {
          quizAttempts: 0,
          quizBestScore: 0,
          quizTotalAnswered: 0,
          quizCorrect: 0,
          scenariosCompleted: 0,
          scenarioBestScore: 0,
          chaptersStudied: [],
        };
    data.scenariosCompleted = Math.max(data.scenariosCompleted, completed);
    data.scenarioBestScore = Math.max(data.scenarioBestScore, bestScore);
    localStorage.setItem("ncaa-clock-progress", JSON.stringify(data));
  } catch {
    // ignore
  }
}

export default function ScenariosPage() {
  const [gameState, setGameState] = useState<GameState>("select");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Scenario["difficulty"] | "all"
  >("all");
  const [activeScenarios, setActiveScenarios] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [results, setResults] = useState<ScenarioResult[]>([]);

  const filteredScenarios =
    selectedDifficulty === "all"
      ? scenarios
      : scenarios.filter((s) => s.difficulty === selectedDifficulty);

  const startScenarios = () => {
    setActiveScenarios(
      filteredScenarios.sort(() => Math.random() - 0.5)
    );
    setCurrentIndex(0);
    setSelectedChoice(null);
    setResults([]);
    setGameState("playing");
  };

  const handleChoice = (choiceIndex: number) => {
    if (gameState === "feedback") return;
    setSelectedChoice(choiceIndex);
    const scenario = activeScenarios[currentIndex];
    const choice = scenario.choices[choiceIndex];
    setResults((prev) => [
      ...prev,
      {
        scenarioId: scenario.id,
        choiceIndex,
        pointsAwarded: choice.pointsAwarded,
        maxPoints: 10,
        wasOptimal: choice.isOptimal,
      },
    ]);
    setGameState("feedback");
  };

  const nextScenario = () => {
    if (currentIndex < activeScenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setGameState("playing");
    } else {
      const totalPoints = results.reduce((s, r) => s + r.pointsAwarded, 0);
      saveProgress(results.length, totalPoints);
      setGameState("results");
    }
  };

  const totalPoints = results.reduce((s, r) => s + r.pointsAwarded, 0);
  const maxPoints = results.reduce((s, r) => s + r.maxPoints, 0);
  const optimalCount = results.filter((r) => r.wasOptimal).length;

  // Selection Screen
  if (gameState === "select") {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/training"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Gamepad2 className="w-7 h-7 text-green-400" />
            Game Scenarios
          </h1>
          <p className="text-slate-400 mt-2">
            Face realistic game situations and make critical clock management
            decisions. Each scenario presents a game state and asks you to
            choose the optimal strategy.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Select Difficulty
          </h2>
          <div className="flex flex-wrap gap-3">
            {(
              [
                { value: "all", label: "All Scenarios", count: scenarios.length },
                {
                  value: "Beginner",
                  label: "Beginner",
                  count: scenarios.filter((s) => s.difficulty === "Beginner")
                    .length,
                },
                {
                  value: "Intermediate",
                  label: "Intermediate",
                  count: scenarios.filter(
                    (s) => s.difficulty === "Intermediate"
                  ).length,
                },
                {
                  value: "Advanced",
                  label: "Advanced",
                  count: scenarios.filter((s) => s.difficulty === "Advanced")
                    .length,
                },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedDifficulty(opt.value)}
                className={`px-5 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  selectedDifficulty === opt.value
                    ? "bg-green-500/20 border-green-500/40 text-green-400"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {opt.label}{" "}
                <span className="text-xs text-slate-500">({opt.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Preview */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Scenarios ({filteredScenarios.length})
          </h2>
          <div className="space-y-2">
            {filteredScenarios.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
              >
                <div>
                  <p className="text-sm font-medium text-white">{s.title}</p>
                  <p className="text-xs text-slate-500">
                    Chapter {s.chapter} | Q{s.situation.quarter} |{" "}
                    {s.situation.timeRemaining} remaining
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    s.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400"
                      : s.difficulty === "Intermediate"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {s.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startScenarios}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
        >
          <Zap className="w-5 h-5" />
          Begin Scenarios
        </button>
      </div>
    );
  }

  // Playing / Feedback
  if (
    (gameState === "playing" || gameState === "feedback") &&
    activeScenarios.length > 0
  ) {
    const scenario = activeScenarios[currentIndex];
    const sit = scenario.situation;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            Scenario {currentIndex + 1} of {activeScenarios.length}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400" />
              {totalPoints} pts
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4 text-green-400" />
              {optimalCount} optimal
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + (gameState === "feedback" ? 1 : 0)) / activeScenarios.length) * 100}%`,
            }}
          />
        </div>

        {/* Scenario Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {scenario.title}
                </h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    scenario.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400"
                      : scenario.difficulty === "Intermediate"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {scenario.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="px-6 py-4 bg-slate-900/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ScoreboardItem
                icon={<Flag className="w-4 h-4" />}
                label="Quarter"
                value={`Q${sit.quarter}`}
              />
              <ScoreboardItem
                icon={<Timer className="w-4 h-4" />}
                label="Time Left"
                value={sit.timeRemaining}
              />
              <ScoreboardItem
                icon={<Target className="w-4 h-4" />}
                label="Score"
                value={`${sit.yourScore} - ${sit.opponentScore}`}
                subtext={
                  sit.yourScore > sit.opponentScore
                    ? `Leading by ${sit.yourScore - sit.opponentScore}`
                    : sit.yourScore < sit.opponentScore
                    ? `Trailing by ${sit.opponentScore - sit.yourScore}`
                    : "Tied"
                }
              />
              <ScoreboardItem
                icon={<Clock className="w-4 h-4" />}
                label="Timeouts"
                value={`You: ${sit.yourTimeouts} | Opp: ${sit.opponentTimeouts}`}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="bg-slate-800 px-2 py-1 rounded">
                {ordinal(sit.down)} & {sit.distance}
              </span>
              <span className="bg-slate-800 px-2 py-1 rounded">
                {sit.fieldPosition}
              </span>
              {sit.receiving2ndHalf !== undefined && (
                <span className="bg-slate-800 px-2 py-1 rounded">
                  {sit.receiving2ndHalf
                    ? "Receiving 2nd half kick"
                    : "Kicking off 2nd half"}
                </span>
              )}
            </div>
            {sit.additionalContext && (
              <div className="mt-3 flex items-start gap-2 text-xs text-amber-400/80 bg-amber-500/10 p-2 rounded">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {sit.additionalContext}
              </div>
            )}
          </div>

          {/* Question */}
          <div className="px-6 py-5 border-t border-slate-700">
            <p className="text-white font-medium text-lg mb-5">
              {scenario.question}
            </p>

            {/* Choices */}
            <div className="space-y-3">
              {scenario.choices.map((choice, idx) => {
                let style =
                  "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer";

                if (gameState === "feedback") {
                  if (choice.isOptimal) {
                    style =
                      "bg-green-500/15 border-green-500/40 text-green-300";
                  } else if (idx === selectedChoice && !choice.isOptimal) {
                    style =
                      "bg-amber-500/15 border-amber-500/40 text-amber-300";
                  } else {
                    style =
                      "bg-slate-800/30 border-slate-700/50 text-slate-500";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleChoice(idx)}
                    disabled={gameState === "feedback"}
                    className={`w-full text-left px-5 py-4 rounded-lg border text-sm transition-all ${style}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                          gameState === "feedback" && choice.isOptimal
                            ? "bg-green-500 border-green-500 text-white"
                            : gameState === "feedback" &&
                              idx === selectedChoice &&
                              !choice.isOptimal
                            ? "bg-amber-500 border-amber-500 text-white"
                            : "border-current"
                        }`}
                      >
                        {gameState === "feedback" && choice.isOptimal ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      <div>
                        <p>{choice.text}</p>
                        {gameState === "feedback" && (
                          <div className="mt-2 pt-2 border-t border-slate-700/50">
                            <p className="text-xs opacity-80">
                              {choice.outcome}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs font-bold">
                                +{choice.pointsAwarded} pts
                              </span>
                              {choice.isOptimal && (
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                  Optimal Decision
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Next Button */}
        {gameState === "feedback" && (
          <button
            onClick={nextScenario}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {currentIndex < activeScenarios.length - 1 ? (
              <>
                Next Scenario
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                View Results
                <Trophy className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  // Results Screen
  if (gameState === "results") {
    const scorePercent = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
    const grade =
      scorePercent >= 90
        ? { label: "Head Coach Material", color: "text-amber-400", bg: "bg-amber-500/20" }
        : scorePercent >= 70
        ? { label: "Solid Coordinator", color: "text-green-400", bg: "bg-green-500/20" }
        : scorePercent >= 50
        ? { label: "Developing Coach", color: "text-blue-400", bg: "bg-blue-500/20" }
        : { label: "Back to Film Room", color: "text-red-400", bg: "bg-red-500/20" };

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Score Header */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-2 ${grade.bg} ${grade.color} px-4 py-2 rounded-full text-sm font-bold mb-4`}
          >
            <Trophy className="w-4 h-4" />
            {grade.label}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {totalPoints} / {maxPoints} pts
          </h1>
          <p className="text-slate-400">
            {optimalCount} out of {results.length} optimal decisions (
            {scorePercent}%)
          </p>
        </div>

        {/* Results Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Scenario Breakdown
          </h2>
          <div className="space-y-3">
            {results.map((result, idx) => {
              const scenario = activeScenarios[idx];
              const choice = scenario.choices[result.choiceIndex];
              return (
                <div
                  key={result.scenarioId}
                  className={`p-4 rounded-lg border ${
                    result.wasOptimal
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-amber-500/5 border-amber-500/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {scenario.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Your choice: {choice.text}
                      </p>
                      {!result.wasOptimal && (
                        <p className="text-xs text-green-400 mt-1">
                          Optimal:{" "}
                          {
                            scenario.choices.find((c) => c.isOptimal)
                              ?.text
                          }
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className={`text-lg font-bold ${
                          result.wasOptimal
                            ? "text-green-400"
                            : "text-amber-400"
                        }`}
                      >
                        +{result.pointsAwarded}
                      </span>
                      <p className="text-xs text-slate-500">
                        / {result.maxPoints}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setGameState("select");
              setResults([]);
              setCurrentIndex(0);
            }}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/training"
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

function ScoreboardItem({
  icon,
  label,
  value,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <div className="bg-slate-800/80 rounded-lg p-3">
      <div className="flex items-center gap-1.5 text-slate-500 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-white font-bold text-sm">{value}</p>
      {subtext && <p className="text-xs text-slate-400 mt-0.5">{subtext}</p>}
    </div>
  );
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
