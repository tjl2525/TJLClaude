"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lightbulb,
  Table,
} from "lucide-react";
import { chapters } from "@/data/quizData";

function markChapterStudied(chapterNumber: number) {
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
    if (!data.chaptersStudied.includes(chapterNumber)) {
      data.chaptersStudied.push(chapterNumber);
      localStorage.setItem("ncaa-clock-progress", JSON.stringify(data));
    }
  } catch {
    // ignore
  }
}

function getStudiedChapters(): number[] {
  try {
    const data = localStorage.getItem("ncaa-clock-progress");
    if (data) return JSON.parse(data).chaptersStudied || [];
  } catch {
    // ignore
  }
  return [];
}

interface ChapterContent {
  number: number;
  title: string;
  sections: {
    heading: string;
    content: string[];
    type?: "text" | "list" | "table" | "tip" | "warning";
    tableData?: { headers: string[]; rows: string[][] };
  }[];
}

const chapterContent: ChapterContent[] = [
  {
    number: 1,
    title: "Clock Management Fundamentals",
    sections: [
      {
        heading: "Understanding the Game Clock",
        type: "list",
        content: [
          "Clock stops on first downs in the final two minutes of each half",
          "Clock starts on the ready-for-play signal after most incomplete passes and out-of-bounds plays (except in final 2 minutes)",
          "Each team receives three timeouts per half",
          "The play clock is set to 40 seconds after most plays and 25 seconds after administrative stoppages",
          "10-second runoff rules apply in final minute when offense commits certain penalties",
        ],
      },
      {
        heading: "The Value of Time",
        type: "list",
        content: [
          "With a lead late in the game: Time is your most valuable asset — preserve it",
          "When trailing late: Time is your enemy — conserve it through clock stoppages",
          "At end of first half: Weigh opportunity cost of leaving time for opponent against scoring chances",
          "In tight games: Time management can create or eliminate possessions, directly affecting win probability",
        ],
      },
      {
        heading: "Common Clock Management Errors",
        type: "warning",
        content: [
          "Wasting timeouts early when trailing, leaving none for the final drive",
          "Failing to use timeouts to preserve time before halftime",
          "Poor communication leading to delay of game penalties",
          "Leaving too much time on the clock after scoring when leading",
          "Snapping the ball too quickly when trying to milk the clock",
          "Not accounting for clock-starting rules unique to college football",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Two-Minute Offense Strategy",
    sections: [
      {
        heading: "Pre-Snap Clock Awareness",
        type: "list",
        content: [
          "QB must know game time, down and distance, and timeout situation before every snap",
          "Practice no-huddle communication extensively — use wristbands, signals, or verbal calls",
          "Establish sideline communication protocol — who signals plays, timeouts, and clock awareness",
          "Train players to get set quickly and look to sideline for decisions",
        ],
      },
      {
        heading: "Timeout Management in Two-Minute Drill",
        type: "tip",
        content: [
          "Save at least one timeout for final 30 seconds to stop clock after incompletion or give time for field goal team",
          "Don't waste timeouts on confusion — practice your communication system",
          "Use timeouts strategically after first downs in middle of field to substitute personnel or call optimal play",
          "Consider saving all three timeouts if you're confident in no-huddle execution",
          "Balance aggressive play-calling against clock preservation based on timeout inventory",
        ],
      },
      {
        heading: "Play Selection and Clock Stoppage",
        type: "list",
        content: [
          "Sideline passes are valuable — incomplete stops clock, complete usually stops via out of bounds",
          "Middle-of-field completions require QB to get team set quickly or burn a timeout",
          "Spike the ball only when absolutely necessary — it wastes a down",
          "Train receivers to get out of bounds when appropriate",
          "Use play-action and RPOs to keep defense honest even in hurry-up mode",
        ],
      },
      {
        heading: "Situational Decision Matrix",
        type: "table",
        content: [],
        tableData: {
          headers: ["Time Left", "Timeouts", "Field Position", "Strategy"],
          rows: [
            ["2:00-1:30", "3", "Own 25+", "Balanced attack, save TOs for red zone"],
            ["1:30-0:45", "2-3", "Midfield", "Attack sidelines, use TOs after 1st downs"],
            ["0:45-0:20", "1-2", "Red zone", "Take shots, preserve 1 TO for FG"],
            ["Under 0:20", "0-1", "Any", "Every play critical, spike if needed"],
          ],
        },
      },
    ],
  },
  {
    number: 3,
    title: "Protecting a Lead",
    sections: [
      {
        heading: "Fourth Quarter Lead Protection Philosophy",
        type: "list",
        content: [
          "Run the play clock down to 1-2 seconds before every snap",
          "Prioritize first downs over explosive plays — sustaining drives is paramount",
          "Favor run plays that keep clock moving, but don't become predictable",
          "Stay inbounds — teach ball carriers to avoid sidelines",
          "Consider victory formation once lead and time make comeback mathematically improbable",
        ],
      },
      {
        heading: "The Mathematics of Running Out the Clock",
        type: "tip",
        content: [
          "Each first down allows approximately 120 seconds (three plays at 40 seconds each)",
          "A sustained drive with 2-3 first downs can consume 4-6 minutes",
          "Calculate possessions remaining: divide time by average possession length (2.5-3.5 min)",
          "Account for opponent's timeouts — each saves them 40 seconds",
          "Remember: the two-minute warning doesn't exist in college football",
        ],
      },
      {
        heading: "When NOT to Be Conservative",
        type: "warning",
        content: [
          "If lead is one score or less, scoring again may be more valuable than clock manipulation",
          "On 3rd and long, converting is more important — don't run predictable plays",
          "Early 4th quarter with 10+ minute lead — continue normal aggressive play calling",
          "If opponent has powerful offense, maintaining scoring efficiency may be better than playing keep-away",
          "Trust your defense — don't put them in bad field position with ultra-conservative offense",
        ],
      },
    ],
  },
  {
    number: 4,
    title: "End of Half Clock Management",
    sections: [
      {
        heading: "Offense: Maximizing Final Possession Before Half",
        type: "list",
        content: [
          "Receiving second half kickoff changes calculus — be more aggressive before halftime",
          "With 1:30-2:00 and all timeouts, you can realistically execute a full drive",
          "From own territory with under 1:00, weigh scoring opportunity against giving opponent time",
          "Have specific half-ending plays scripted — Hail Mary, FG range plays, safe possession plays",
          "Never give ball back with time for opponent to score unless you're badly trailing",
        ],
      },
      {
        heading: "The Decision: To Go or Not to Go",
        type: "table",
        content: [],
        tableData: {
          headers: ["Scenario", "Recommendation", "Rationale"],
          rows: [
            ["0:45, own 25, 3 TOs, receive 2nd half", "GO - Full aggression", "Double-score opportunity"],
            ["0:35, own 20, 1 TO, kick 2nd half", "KNEEL - Run out half", "Turnover risk, opponent gets ball after half"],
            ["1:20, midfield, 2 TOs, any scenario", "GO - Conservative attack", "Good field position, reasonable time"],
            ["0:55, own 15, 0 TOs, trailing", "GO - Aggressive passing", "Trailing requires risk-taking"],
          ],
        },
      },
    ],
  },
  {
    number: 5,
    title: "Advanced Situational Tactics",
    sections: [
      {
        heading: "The Strategic Intentional Safety",
        type: "tip",
        content: [
          "Situation: Leading by 3-5 points, pinned deep, under 30 seconds, opponent has no timeouts",
          "Take safety to run clock down to 2-3 seconds, give free kick from your 20",
          "Opponent needs to return free kick to score with no time — nearly impossible",
          "Practice this scenario — QB takes snap, runs to back of end zone, downs ball at 0:02-0:03",
          "Risk: Giving 2 points. Reward: Virtually guaranteeing victory",
        ],
      },
      {
        heading: "Managing Play Clock vs. Game Clock",
        type: "list",
        content: [
          "Play clock resets to 40 seconds after plays end, 25 seconds after penalties and timeouts",
          "When killing clock: snap at 1-2 seconds on play clock consistently",
          "When hurrying: get set with 25+ seconds, allows audibles and adjustments",
          "Train QBs to know when they have control: verbal 'clock' or 'tempo' calls",
          "Delay of game when protecting lead > delay of game when trailing — opposite urgencies",
        ],
      },
      {
        heading: "Exploiting Opponent Timeout Situations",
        type: "list",
        content: [
          "Run middle of field — forces them to burn time getting set",
          "Substitute freely — they cannot match without burning plays",
          "Use motion and shifts to cause confusion and eat clock",
          "On defense: Get off field slowly between plays when they're hurrying",
          "Be aware of unsportsmanlike penalties — refs watch this closely",
        ],
      },
      {
        heading: "Goal Line Clock Management",
        type: "warning",
        content: [
          "With lead late: Scoring too quickly gives opponent time",
          "Consider running play clock down on all four downs, score on final play",
          "When trailing: Score immediately, don't waste any time",
          "Calculate if field goal takes less time than TD + extra point",
          "Maintain unpredictability with personnel groupings",
        ],
      },
    ],
  },
  {
    number: 6,
    title: "Communication Systems and Practice",
    sections: [
      {
        heading: "Sideline-to-Field Communication Protocol",
        type: "list",
        content: [
          "Designate one coach for clock decisions — typically OC or HC",
          "Use hand signals: Timeout (T), Spike clock (S), Tempo up (rapid motion), Tempo down (slow motion)",
          "QB must acknowledge signals before every snap in critical situations",
          "Have backup communication — wristbands with clock management reminders",
          "Practice communication in loud environments — use visual signals primarily",
        ],
      },
      {
        heading: "Weekly Practice Integration",
        type: "table",
        content: [],
        tableData: {
          headers: ["Day", "Focus"],
          rows: [
            ["Tuesday", "Install two-minute offense with time/score scenarios"],
            ["Wednesday", "Practice four-minute offense (protecting lead)"],
            ["Thursday", "End of half situations, both offense and defense"],
            ["Friday", "Walk-through all clock situations specific to opponent"],
          ],
        },
      },
      {
        heading: "Clock Management Cheat Sheet Items",
        type: "tip",
        content: [
          "Time required per first down (~2:00 with three plays)",
          "Opponent's field goal range and kicker statistics",
          "Your own field goal range and success rates",
          "Quick reference for timeout decisions by quarter and score",
          "10-second runoff scenarios and when they apply",
        ],
      },
    ],
  },
  {
    number: 7,
    title: "Special Teams and Clock Strategy",
    sections: [
      {
        heading: "Kickoff Return/Coverage Clock Awareness",
        type: "list",
        content: [
          "When trailing late: Consider fair catch deep to save time getting offense on field",
          "When leading late: Don't risk fumbles on returns, secure possession is paramount",
          "Onside kick situations: Know the rules, practice extensively",
          "Account for substitution time in your clock calculations",
        ],
      },
      {
        heading: "Field Goal Unit Time Management",
        type: "tip",
        content: [
          "Practice getting field goal unit on field in 8-10 seconds",
          "Know when to call timeout vs. rushing field goal team",
          "Have check-with-me signal for whether to attempt FG or go for TD",
          "Plan for clock management after made field goal — do you want time remaining?",
          "Practice scenarios where FG team comes on with 3-6 seconds left",
        ],
      },
      {
        heading: "Punt Situations and Clock",
        type: "list",
        content: [
          "When protecting lead: Punt takes time off clock, good field position trade",
          "Pooch punts can run more time by keeping ball in air",
          "Consider directional punts to sideline to reduce return yards",
          "When trailing: Quick punts to save time, or aggressive fake punts",
          "Practice punt safe situations where securing the snap is the only goal",
        ],
      },
    ],
  },
  {
    number: 8,
    title: "Game-Winning Scenario Playbook",
    sections: [
      {
        heading: "Down 7, 1:30 Left, Own 25, Three Timeouts",
        type: "tip",
        content: [
          "This is manageable — you have time for 8-10 plays",
          "Plays 1-4: Mix runs and passes, get to midfield, save timeouts",
          "Plays 5-7: Attack downfield, use 1-2 timeouts after first downs",
          "Final plays: Get in end zone with 15-30 seconds remaining",
          "Key: Don't panic, execute efficiently, take what defense gives",
        ],
      },
      {
        heading: "Up 3, 3:00 Left, Own 30, Ball on 1st and 10",
        type: "list",
        content: [
          "Three first downs ends the game",
          "Call plays with high completion/conversion rate — not predictable runs",
          "If opponent uses timeouts, maintain composure and get yards",
          "On 3rd and long: Consider if punt is better than risky conversion attempt",
        ],
      },
      {
        heading: "Tied Game, 0:45 Left, Own 20, Two Timeouts",
        type: "list",
        content: [
          "Know your kicker's range — typically need opponent's 35-40 yard line",
          "First 2-3 plays: Get 20-25 yards without risking turnovers",
          "Use timeouts to manage clock, not out of confusion",
          "Save one timeout for FG operation",
        ],
      },
      {
        heading: "Up 9, 2:30 Left, Opponent Has Ball at Midfield",
        type: "list",
        content: [
          "They need TD and FG — prevent touchdown first",
          "Consider using timeouts to get ball back if they score quickly",
          "Force them to use their timeouts — get off field slowly",
          "If they score TD, you still have time to get first downs and run out clock",
        ],
      },
    ],
  },
  {
    number: 9,
    title: "NCAA Clock Rules - Critical Details",
    sections: [
      {
        heading: "When the Clock Stops (and Restarts)",
        type: "table",
        content: [],
        tableData: {
          headers: ["Event", "Clock Action", "Restarts On"],
          rows: [
            ["Incomplete pass", "Stops", "Ready-for-play (snap in final 2 min)"],
            ["Out of bounds", "Stops", "Ready-for-play (snap in final 2 min)"],
            ["First down", "Stops briefly", "Ready-for-play (except final 2 min)"],
            ["Team timeout", "Stops", "Snap"],
            ["Score", "Stops", "Kickoff"],
            ["Penalty", "Usually stops", "Varies by situation"],
            ["Injury", "Stops", "Team charged TO if they caused delay"],
          ],
        },
      },
      {
        heading: "The 10-Second Runoff Rule",
        type: "warning",
        content: [
          "Applies in the final minute of each half",
          "Triggered when offense commits certain fouls and clock would have been running",
          "Affected penalties: False start, illegal formation, delay of game",
          "Officials subtract 10 seconds from game clock before ready-for-play",
          "Offense can use a timeout to avoid the 10-second runoff",
        ],
      },
      {
        heading: "Play Clock Situations",
        type: "table",
        content: [],
        tableData: {
          headers: ["Situation", "Play Clock Setting"],
          rows: [
            ["After most plays end", "40 seconds"],
            ["After timeouts", "25 seconds"],
            ["After penalties", "25 seconds"],
            ["After administrative stoppages", "25 seconds"],
            ["After change of possession", "25 seconds"],
          ],
        },
      },
    ],
  },
  {
    number: 10,
    title: "Analytics and Clock Management",
    sections: [
      {
        heading: "Win Probability and Time",
        type: "list",
        content: [
          "Win probability increases for leading team as time decreases",
          "Average possession in college football: 2.5-3 minutes",
          "Time becomes exponentially more valuable in final 5 minutes",
          "Use analytics to inform, not dictate — game flow matters",
        ],
      },
      {
        heading: "Expected Points and Clock Decisions",
        type: "tip",
        content: [
          "Late game with lead: Reducing opponent possessions > maximizing your points",
          "Late game trailing: Maximizing points per possession is critical",
          "Consider field position + time tradeoffs in decision making",
          "Fourth down decisions must factor in both points AND possessions remaining",
        ],
      },
    ],
  },
];

export default function ReferencePage() {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(
    new Set()
  );
  const [studiedChapters, setStudiedChapters] = useState<number[]>([]);

  useEffect(() => {
    setStudiedChapters(getStudiedChapters());
    // Check for hash on load
    if (typeof window !== "undefined" && window.location.hash) {
      const match = window.location.hash.match(/chapter-(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        setExpandedChapters(new Set([num]));
        setTimeout(() => {
          document
            .getElementById(`chapter-${num}`)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const toggleChapter = (num: number) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
        markChapterStudied(num);
        setStudiedChapters((prev) =>
          prev.includes(num) ? prev : [...prev, num]
        );
      }
      return next;
    });
  };

  const expandAll = () => {
    const allNums = new Set(chapterContent.map((c) => c.number));
    setExpandedChapters(allNums);
    allNums.forEach((n) => markChapterStudied(n));
    setStudiedChapters(Array.from(allNums));
  };

  const collapseAll = () => {
    setExpandedChapters(new Set());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link
          href="/training"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-amber-400" />
              Quick Reference Guide
            </h1>
            <p className="text-slate-400 mt-2">
              Study each chapter to prepare for quizzes and scenarios. Expanding
              a chapter marks it as studied.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3">
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span>
          {studiedChapters.length} of {chapters.length} chapters studied
        </span>
        <div className="flex-1 bg-slate-700 rounded-full h-2 ml-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{
              width: `${(studiedChapters.length / chapters.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-3">
        {chapterContent.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.number);
          const isStudied = studiedChapters.includes(chapter.number);

          return (
            <div
              key={chapter.number}
              id={`chapter-${chapter.number}`}
              className={`border rounded-xl overflow-hidden transition-colors ${
                isExpanded
                  ? "bg-slate-800/50 border-slate-600"
                  : isStudied
                  ? "bg-slate-800/30 border-green-500/20"
                  : "bg-slate-800/20 border-slate-700"
              }`}
            >
              <button
                onClick={() => toggleChapter(chapter.number)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isStudied
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {isStudied ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      chapter.number
                    )}
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">
                      Chapter {chapter.number}: {chapter.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {chapter.sections.length} sections
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-5">
                  {chapter.sections.map((section, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-2 mb-3">
                        {section.type === "tip" ? (
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                        ) : section.type === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        ) : section.type === "table" ? (
                          <Table className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-500" />
                        )}
                        <h3
                          className={`text-sm font-semibold ${
                            section.type === "tip"
                              ? "text-amber-400"
                              : section.type === "warning"
                              ? "text-red-400"
                              : "text-slate-300"
                          }`}
                        >
                          {section.heading}
                        </h3>
                      </div>

                      {section.type === "table" && section.tableData ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-700">
                                {section.tableData.headers.map((h, i) => (
                                  <th
                                    key={i}
                                    className="text-left px-3 py-2 text-slate-400 font-medium text-xs"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.tableData.rows.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className="border-b border-slate-700/50"
                                >
                                  {row.map((cell, ci) => (
                                    <td
                                      key={ci}
                                      className="px-3 py-2 text-slate-300 text-xs"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <ul
                          className={`space-y-2 ml-6 ${
                            section.type === "tip"
                              ? "border-l-2 border-amber-500/30 pl-4"
                              : section.type === "warning"
                              ? "border-l-2 border-red-500/30 pl-4"
                              : ""
                          }`}
                        >
                          {section.content.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-slate-400 flex items-start gap-2"
                            >
                              <span className="text-slate-600 mt-1.5 text-xs">
                                &bull;
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
