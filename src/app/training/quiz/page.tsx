"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Clock,
  Filter,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  chapters,
  quizQuestions,
  getRandomQuestions,
  type QuizQuestion,
} from "@/data/quizData";

type QuizState = "setup" | "active" | "review" | "results";

interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

function saveProgress(score: number, totalAnswered: number, correct: number) {
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
    data.quizAttempts += 1;
    data.quizBestScore = Math.max(data.quizBestScore, score);
    data.quizTotalAnswered += totalAnswered;
    data.quizCorrect += correct;
    localStorage.setItem("ncaa-clock-progress", JSON.stringify(data));
  } catch {
    // ignore
  }
}

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startQuiz = useCallback(() => {
    const selected = getRandomQuestions(
      questionCount,
      selectedChapter ?? undefined
    );
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setStartTime(Date.now());
    setQuizState("active");
  }, [questionCount, selectedChapter]);

  useEffect(() => {
    if (quizState !== "active") return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [quizState, startTime]);

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const correct = index === questions[currentIndex].correctIndex;
    setAnswers((prev) => [
      ...prev,
      { questionId: questions[currentIndex].id, selectedIndex: index, correct },
    ]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const correct = answers.filter((a) => a.correct).length;
      const score = Math.round((correct / questions.length) * 100);
      saveProgress(score, questions.length, correct);
      setQuizState("results");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const correctCount = answers.filter((a) => a.correct).length;
  const scorePercent =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

  // Setup Screen
  if (quizState === "setup") {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link
            href="/training"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-blue-400" />
            Knowledge Quiz
          </h1>
          <p className="text-slate-400 mt-2">
            Test your understanding of NCAA clock management principles.
            Choose a chapter focus or test across all topics.
          </p>
        </div>

        {/* Chapter Selection */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-400" />
            Select Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedChapter(null)}
              className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                selectedChapter === null
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <span className="font-medium">All Chapters</span>
              <span className="block text-xs text-slate-500 mt-0.5">
                {quizQuestions.length} questions
              </span>
            </button>
            {chapters.map((ch) => {
              const count = quizQuestions.filter(
                (q) => q.chapter === ch.number
              ).length;
              return (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapter(ch.number)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    selectedChapter === ch.number
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span className="font-medium">
                    Ch. {ch.number}: {ch.title}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {count} questions
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Count */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Number of Questions
          </h2>
          <div className="flex gap-3">
            {[5, 10, 15, 20].map((n) => {
              const maxAvailable = selectedChapter
                ? quizQuestions.filter((q) => q.chapter === selectedChapter)
                    .length
                : quizQuestions.length;
              const disabled = n > maxAvailable;
              return (
                <button
                  key={n}
                  onClick={() => !disabled && setQuestionCount(n)}
                  disabled={disabled}
                  className={`px-6 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    disabled
                      ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                      : questionCount === n
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startQuiz}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
        >
          <Zap className="w-5 h-5" />
          Start Quiz
        </button>
      </div>
    );
  }

  // Active Quiz
  if (quizState === "active" && questions.length > 0) {
    const question = questions[currentIndex];
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {correctCount}
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-400" />
              {answers.length - correctCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8">
          <div className="mb-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              Chapter {question.chapter}: {question.chapterTitle}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let optionStyle =
                "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 cursor-pointer";

              if (showExplanation) {
                if (idx === question.correctIndex) {
                  optionStyle =
                    "bg-green-500/20 border-green-500/50 text-green-300";
                } else if (
                  idx === selectedAnswer &&
                  idx !== question.correctIndex
                ) {
                  optionStyle =
                    "bg-red-500/20 border-red-500/50 text-red-300";
                } else {
                  optionStyle =
                    "bg-slate-800/50 border-slate-700 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showExplanation}
                  className={`w-full text-left px-5 py-4 rounded-lg border text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                      showExplanation && idx === question.correctIndex
                        ? "bg-green-500 border-green-500 text-white"
                        : showExplanation &&
                          idx === selectedAnswer &&
                          idx !== question.correctIndex
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-current"
                    }`}
                  >
                    {showExplanation && idx === question.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : showExplanation &&
                      idx === selectedAnswer &&
                      idx !== question.correctIndex ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 rounded-lg bg-slate-900/80 border border-slate-600">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-amber-400">
                  Explanation:{" "}
                </span>
                {question.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {showExplanation && (
          <button
            onClick={nextQuestion}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {currentIndex < questions.length - 1 ? (
              <>
                Next Question
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
  if (quizState === "results") {
    const grade =
      scorePercent >= 90
        ? { label: "Elite", color: "text-amber-400", bg: "bg-amber-500/20" }
        : scorePercent >= 75
        ? { label: "Strong", color: "text-green-400", bg: "bg-green-500/20" }
        : scorePercent >= 60
        ? {
            label: "Developing",
            color: "text-blue-400",
            bg: "bg-blue-500/20",
          }
        : {
            label: "Needs Work",
            color: "text-red-400",
            bg: "bg-red-500/20",
          };

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
            {scorePercent}%
          </h1>
          <p className="text-slate-400">
            {correctCount} out of {questions.length} correct in{" "}
            {formatTime(elapsedTime)}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Score Breakdown
          </h2>
          <div className="w-full bg-slate-700 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                scorePercent >= 75
                  ? "bg-green-500"
                  : scorePercent >= 50
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${scorePercent}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-400">
                {correctCount}
              </p>
              <p className="text-xs text-slate-500">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400">
                {questions.length - correctCount}
              </p>
              <p className="text-xs text-slate-500">Incorrect</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-300">
                {formatTime(elapsedTime)}
              </p>
              <p className="text-xs text-slate-500">Time</p>
            </div>
          </div>
        </div>

        {/* Review Answers */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Review Answers
          </h2>
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const answer = answers[idx];
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border ${
                    answer?.correct
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {answer?.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm text-slate-300 font-medium">
                        {q.question}
                      </p>
                      {!answer?.correct && (
                        <div className="mt-2 text-xs">
                          <p className="text-red-400">
                            Your answer: {q.options[answer?.selectedIndex ?? 0]}
                          </p>
                          <p className="text-green-400 mt-1">
                            Correct: {q.options[q.correctIndex]}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-slate-500 mt-2">
                        {q.explanation}
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
              setQuizState("setup");
              setAnswers([]);
              setCurrentIndex(0);
            }}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-5 h-5" />
            New Quiz
          </button>
          <Link
            href="/training"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
