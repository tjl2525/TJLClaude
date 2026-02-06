"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  BookOpen,
  Target,
  Gamepad2,
  Home,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/training", label: "Dashboard", icon: Home },
  { href: "/training/quiz", label: "Quiz", icon: GraduationCap },
  { href: "/training/scenarios", label: "Scenarios", icon: Gamepad2 },
  { href: "/training/reference", label: "Reference", icon: BookOpen },
];

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/training" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">
                  Clock Management
                </h1>
                <p className="text-xs text-slate-400 leading-tight">
                  NCAA Football Training
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/training" &&
                    pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Score indicator */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-400" id="nav-score">
                Training Center
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-xs text-slate-500">
            NCAA Football Clock Management Training Manual — Master the Clock. Win the Game.
          </p>
        </div>
      </footer>
    </div>
  );
}
