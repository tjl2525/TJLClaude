"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Gamepad2,
  BookOpen,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { chapters, quizQuestions } from "@/data/quizData";
import { scenarios } from "@/data/scenarioData";

interface ProgressData {
  quizAttempts: number;
  quizBestScore: number;
  quizTotalAnswered: number;
  quizCorrect: number;
  scenariosCompleted: number;
  scenarioBestScore: number;
  chaptersStudied: number[];
}

function getProgress(): ProgressData {
  if (typeof window === "undefined") {
    return {
      quizAttempts: 0,
      quizBestScore: 0,
      quizTotalAnswered: 0,
      quizCorrect: 0,
      scenariosCompleted: 0,
      scenarioBestScore: 0,
      chaptersStudied: [],
    };
  }
  try {
    const data = localStorage.getItem("ncaa-clock-progress");
    if (data) return JSON.parse(data);
  } catch {
    // ignore
  }
  return {
    quizAttempts: 0,
    quizBestScore: 0,
    quizTotalAnswered: 0,
    quizCorrect: 0,
    scenariosCompleted: 0,
    scenarioBestScore: 0,
    chaptersStudied: [],
  };
}

export default function TrainingDashboard() {
  const [progress, setProgress] = useState<ProgressData>(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const accuracy =
    progress.quizTotalAnswered > 0
      ? Math.round((progress.quizCorrect / progress.quizTotalAnswered) * 100)
      : 0;

  const overallProgress = Math.round(
    ((progress.chaptersStudied.length / chapters.length) * 30 +
      (Math.min(progress.quizAttempts, 5) / 5) * 35 +
      (Math.min(progress.scenariosCompleted, scenarios.length) /
        scenarios.length) *
        35)
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/30 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-200" />
            <span className="text-amber-200 text-sm font-medium uppercase tracking-wider">
              NCAA Football
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Clock Management Training Center
          </h1>
          <p className="text-amber-100/80 text-lg max-w-2xl mb-6">
            Master the art of game clock strategy. Study the fundamentals, test
            your knowledge with quizzes, and prove your skills in realistic
            game scenarios.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/training/quiz"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-100 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              Start Quiz
            </Link>
            <Link
              href="/training/scenarios"
              className="inline-flex items-center gap-2 bg-slate-900/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-900/70 transition-colors border border-amber-400/30"
            >
              <Gamepad2 className="w-5 h-5" />
              Run Scenarios
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Overall Progress"
          value={`${overallProgress}%`}
          color="amber"
        />
        <StatCard
          icon={<GraduationCap className="w-5 h-5" />}
          label="Quiz Accuracy"
          value={progress.quizTotalAnswered > 0 ? `${accuracy}%` : "—"}
          color="blue"
        />
        <StatCard
          icon={<Gamepad2 className="w-5 h-5" />}
          label="Scenarios Done"
          value={`${progress.scenariosCompleted}/${scenarios.length}`}
          color="green"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="Best Quiz Score"
          value={
            progress.quizBestScore > 0 ? `${progress.quizBestScore}%` : "—"
          }
          color="purple"
        />
      </div>

      {/* Training Modules */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Training Modules</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quiz Module */}
          <ModuleCard
            href="/training/quiz"
            icon={<GraduationCap className="w-8 h-8" />}
            title="Knowledge Quiz"
            description={`${quizQuestions.length} questions across ${chapters.length} chapters. Test your understanding of clock management fundamentals, rules, and strategy.`}
            stats={
              progress.quizAttempts > 0
                ? `${progress.quizAttempts} attempts | Best: ${progress.quizBestScore}%`
                : "Not started"
            }
            color="blue"
          />

          {/* Scenarios Module */}
          <ModuleCard
            href="/training/scenarios"
            icon={<Gamepad2 className="w-8 h-8" />}
            title="Game Scenarios"
            description={`${scenarios.length} realistic game situations. Make critical clock management decisions under pressure with instant feedback.`}
            stats={
              progress.scenariosCompleted > 0
                ? `${progress.scenariosCompleted} completed | Best: ${progress.scenarioBestScore}pts`
                : "Not started"
            }
            color="green"
          />

          {/* Reference Module */}
          <ModuleCard
            href="/training/reference"
            icon={<BookOpen className="w-8 h-8" />}
            title="Quick Reference"
            description="Complete study guide covering all 10 chapters. Review rules, decision frameworks, and key principles before taking quizzes."
            stats={`${progress.chaptersStudied.length}/${chapters.length} chapters reviewed`}
            color="amber"
          />
        </div>
      </div>

      {/* Chapter Progress */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Chapter Coverage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {chapters.map((ch) => {
            const studied = progress.chaptersStudied.includes(ch.number);
            return (
              <Link
                key={ch.number}
                href={`/training/reference#chapter-${ch.number}`}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  studied
                    ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
                    : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    studied
                      ? "bg-green-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {studied ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    ch.number
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      studied ? "text-green-400" : "text-slate-300"
                    }`}
                  >
                    {ch.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Training Tips</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <TipCard
            number={1}
            text="Start with the Reference guide to study each chapter's key concepts before attempting quizzes."
          />
          <TipCard
            number={2}
            text="Use the Quiz to test knowledge across all chapters, or focus on specific chapters you find challenging."
          />
          <TipCard
            number={3}
            text="Scenarios test real decision-making. Start with Beginner and work up to Advanced as you improve."
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}

function ModuleCard({
  href,
  icon,
  title,
  description,
  stats,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40",
    green:
      "from-green-500/20 to-green-600/5 border-green-500/20 hover:border-green-500/40",
    amber:
      "from-amber-500/20 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40",
  };

  const iconColorClasses: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-green-400",
    amber: "text-amber-400",
  };

  return (
    <Link
      href={href}
      className={`block bg-gradient-to-b ${colorClasses[color]} border rounded-xl p-6 transition-all hover:scale-[1.02]`}
    >
      <div className={`mb-4 ${iconColorClasses[color]}`}>{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{stats}</span>
        <ArrowRight className="w-4 h-4 text-slate-500" />
      </div>
    </Link>
  );
}

function TipCard({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-7 h-7 bg-amber-500/20 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-amber-400">{number}</span>
      </div>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
