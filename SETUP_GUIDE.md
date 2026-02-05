# CRM Board - Setup & Learning Guide

A Trello-like web app that works as a CRM (Customer Relationship Management) tool. Built with modern web technologies, this guide will walk you through everything from scratch.

---

## What You're Building

**CRM Board** is a web application with:
- **Kanban boards** (like Trello) — drag-and-drop columns and cards
- **Contact management** — store and organize customer information
- **Deal tracking** — track sales pipeline with dollar values
- **Activity logging** — record calls, emails, meetings, and notes per deal
- **Dashboard** — overview of all your boards, contacts, and pipeline value

---

## Prerequisites - Install These First

### 1. Node.js (the engine that runs your app)

Node.js lets your computer run JavaScript outside of a web browser. It powers the backend of your app.

**Install it:**
1. Go to https://nodejs.org
2. Download the **LTS** (Long Term Support) version
3. Run the installer, click "Next" through all the steps
4. Verify it installed by opening your terminal and typing:

```bash
node --version
npm --version
```

You should see version numbers (e.g., `v22.x.x` and `10.x.x`).

### 2. VS Code (your code editor)

You already have this! Make sure to install these helpful extensions:
- **Prisma** — for database schema syntax highlighting
- **Tailwind CSS IntelliSense** — for CSS class suggestions
- **ESLint** — for catching code mistakes

To install extensions: Click the square icon on the left sidebar of VS Code, search for each name, and click "Install".

### 3. Git (version control)

Git tracks changes to your code. You likely already have it.

```bash
git --version
```

If not installed, download from https://git-scm.com.

---

## Getting Started

### Step 1: Open the project in VS Code

Open VS Code, then go to **File > Open Folder** and select this project folder.

### Step 2: Open the terminal

In VS Code, press `` Ctrl+` `` (backtick key, usually above Tab) to open the built-in terminal.

### Step 3: Install dependencies

This downloads all the code libraries your project needs:

```bash
npm install
```

This reads the `package.json` file and downloads everything listed there into a `node_modules` folder.

### Step 4: Set up the database

Create the SQLite database and apply the schema:

```bash
npx prisma migrate dev
```

### Step 5: Seed the database with sample data

This fills the database with example contacts, boards, and deals so you can see how the app looks:

```bash
npm run seed
```

### Step 6: Start the development server

```bash
npm run dev
```

This starts your app at **http://localhost:3000**. Open that URL in your web browser.

You should see the Dashboard with 3 sample boards, 5 contacts, and pipeline value stats!

---

## How to Use the App

### Dashboard (home page)
- Shows overview stats: boards, active cards, pipeline value, contacts
- Click any board card to open it

### Kanban Boards
- **Drag and drop** cards between columns to update their status
- Click **"+ Add a card"** at the bottom of any column to create a new card
- Click **"+ Add Column"** on the right to add new stages
- Click any card to open its detail view where you can:
  - Edit title, description, priority, deal value, due date
  - Log activities (notes, calls, emails, meetings)
  - See the linked contact's information

### Contacts
- View all contacts in a searchable, filterable table
- Click **"Add Contact"** to create new contacts
- Click any contact row to see their details in the side panel
- Edit or delete contacts using the action buttons

---

## Project Structure Explained

Here's what every important file and folder does:

```
TJLClaude/
├── prisma/                      # DATABASE LAYER
│   ├── schema.prisma            # Database structure definition
│   ├── seed.ts                  # Script to fill DB with sample data
│   ├── migrations/              # Database change history
│   └── dev.db                   # Your SQLite database file (auto-created)
│
├── src/                         # ALL YOUR APPLICATION CODE
│   ├── app/                     # PAGES & API ROUTES
│   │   ├── layout.tsx           # Root layout (wraps every page)
│   │   ├── globals.css          # Global styles
│   │   ├── page.tsx             # Dashboard (home page: /)
│   │   ├── boards/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Individual board page (/boards/xyz)
│   │   ├── contacts/
│   │   │   └── page.tsx         # Contacts page (/contacts)
│   │   └── api/                 # BACKEND API ENDPOINTS
│   │       ├── boards/route.ts  # GET/POST boards
│   │       ├── cards/route.ts   # GET/POST/PUT/DELETE cards
│   │       ├── columns/route.ts # POST/PUT/DELETE columns
│   │       ├── contacts/route.ts# GET/POST/PUT/DELETE contacts
│   │       └── activities/route.ts # GET/POST activities
│   │
│   ├── components/              # REUSABLE UI PIECES
│   │   ├── AppShell.tsx         # Layout with sidebar
│   │   ├── Sidebar.tsx          # Left navigation sidebar
│   │   ├── KanbanBoard.tsx      # Main board with drag-and-drop
│   │   ├── KanbanColumn.tsx     # Single column in a board
│   │   ├── KanbanCard.tsx       # Single card in a column
│   │   ├── CardModal.tsx        # Card detail popup
│   │   └── CreateBoardModal.tsx # New board creation popup
│   │
│   └── lib/                     # SHARED UTILITIES
│       ├── prisma.ts            # Database connection
│       └── utils.ts             # Helper functions
│
├── package.json                 # Project info & dependencies list
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── .env                         # Environment variables (DB location)
```

---

## Key Concepts Explained

### What is Next.js?
A framework built on top of React that gives you:
- **Pages** — each file in `src/app/` becomes a URL
- **API Routes** — backend endpoints (in `src/app/api/`)
- **Server-side rendering** — pages load faster
- Think of it as a complete toolkit for building web apps

### What is React?
A JavaScript library for building user interfaces. You write "components" (reusable UI pieces) that React combines into full pages. Each `.tsx` file is a component.

### What is TypeScript?
JavaScript with type safety. Instead of just `name`, you write `name: string`. This catches bugs before they happen. The `.tsx` and `.ts` extensions are TypeScript files.

### What is Tailwind CSS?
Instead of writing CSS in separate files, you add classes directly to HTML elements:
```html
<div className="bg-blue-500 text-white p-4 rounded-lg">Hello</div>
```
This makes the div blue with white text, padding, and rounded corners.

### What is Prisma?
A tool that lets you talk to your database using JavaScript/TypeScript instead of SQL. You define your data structure in `prisma/schema.prisma`, and Prisma creates the database tables and gives you functions to read/write data.

### What is SQLite?
A lightweight database that stores everything in a single file (`prisma/dev.db`). No separate database server needed — perfect for development and small-to-medium apps.

---

## Common Terminal Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run seed` | Fill database with sample data |
| `npm run db:reset` | Reset database and re-seed |
| `npm run db:studio` | Open visual database browser |
| `npx prisma migrate dev` | Apply database changes |
| `npx prisma generate` | Regenerate database client |

---

## How to Make Changes

### Adding a new field to the database

1. Edit `prisma/schema.prisma` — add your new field to a model
2. Run `npx prisma migrate dev --name describe_your_change`
3. The database updates automatically, and Prisma regenerates the client

Example: To add a "website" field to contacts:
```prisma
model Contact {
  // ... existing fields ...
  website    String?    // The ? means it's optional
}
```

### Adding a new page

1. Create a new folder in `src/app/` (the folder name becomes the URL)
2. Add a `page.tsx` file inside it
3. The page is automatically available at that URL

Example: `src/app/reports/page.tsx` → accessible at `localhost:3000/reports`

### Adding a new API endpoint

1. Create a new folder in `src/app/api/`
2. Add a `route.ts` file inside it
3. Export functions named `GET`, `POST`, `PUT`, or `DELETE`

---

## Troubleshooting

### "Module not found" error
Run `npm install` to make sure all dependencies are installed.

### Database errors
Run `npm run db:reset` to completely reset and re-seed the database.

### Port 3000 already in use
Another app is using port 3000. Either stop it, or start on a different port:
```bash
npx next dev -p 3001
```

### Changes not showing up
- Save all files (Ctrl+S)
- The dev server should auto-refresh, but try refreshing your browser
- If still stuck, stop the server (Ctrl+C in terminal) and run `npm run dev` again

---

## Next Steps to Customize

Here are ideas for extending the app:

1. **Add user authentication** — Use NextAuth.js to add login/signup
2. **Add email notifications** — Send emails when deals move to a new stage
3. **Add file attachments** — Upload documents to cards
4. **Add a calendar view** — Show cards with due dates on a calendar
5. **Deploy to the internet** — Use Vercel (free) to make it accessible online:
   ```bash
   npm install -g vercel
   vercel
   ```

---

## Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
