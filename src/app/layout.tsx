import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Board - Kanban CRM",
  description: "A Trello-like CRM for managing contacts, deals, and pipelines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
