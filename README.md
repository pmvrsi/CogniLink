# CogniLink

> **Built for [HackLDN 2026](https://hackldn.org/) — Knowlintery Track**
> Made by Paramveer, Nabil, Sam and Isaac

**Link your Learning. Connect your Cognition.**

CogniLink is an AI-powered knowledge management platform that builds visual, interactive knowledge graphs from your documents. Upload a PDF, extract topics, and explore how concepts interconnect, then ask questions, track your learning streak, and share graphs with friends.

---

## Features

- **Topic Extraction** — Gemini analyses your PDF and produces a structured knowledge graph of up to 15 topics with summaries and prerequisite relationships
- **Interactive Knowledge Graph** — A D3-powered force-directed graph lets you explore topic connections, click nodes for detail panels, and zoom/pan freely
- **AI Q&A (Cogni)** — Chat with Cogni, an academic-scoped assistant that answers questions about your graph with guardrails against off-topic or harmful queries
- **Graph Sharing** — Generate a public share link for any graph; anyone can view it at `/publicgraph/[id]` without logging in
- **Render from Link** — Paste a share URL in the sidebar to load and visualise someone else's graph
- **Login Streaks** — Daily login tracking with current streak, best streak, and a 7-day activity grid
- **Google OAuth** — One-click sign-in via Google; no passwords

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16, App Router |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/), Ubuntu Mono font |
| Auth & Database | [Supabase](https://supabase.com/) (Google OAuth, PostgreSQL) |
| AI | [Google Gemini 2.5 Flash](https://ai.google.dev/) via `@google/genai` |
| Graph Visualisation | [react-force-graph-2d](https://github.com/vasturiano/react-force-graph) |
| Markdown Rendering | [react-markdown](https://github.com/remarkjs/react-markdown) |
| Schema Validation | [Zod](https://zod.dev/) + `zod-to-json-schema` |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Project Structure

```
cognilink/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Graph generation from PDF (Gemini)
│   │   ├── ask/route.ts         # Q&A on knowledge graph (Cogni)
│   │   └── tts/route.ts         # TTS stub (not yet implemented)
│   ├── auth/callback/page.tsx   # OAuth callback handler
│   ├── components/
│   │   └── ProductCard.tsx      # Demo video card on landing page
│   ├── dashboard/page.tsx       # Main app — upload, graph, chat, streaks
│   ├── login/page.tsx           # Google OAuth sign-in page
│   ├── publicgraph/[id]/        # Public shared graph viewer (no auth)
│   ├── globals.css              # Tailwind & custom animations
│   ├── layout.tsx               # Root layout — navbar, footer
│   └── page.tsx                 # Landing page
├── lib/
│   ├── NoSSRForceGraph.tsx      # react-force-graph-2d (SSR disabled)
│   └── supabase/
│       ├── client.ts            # Browser Supabase client
│       ├── server.ts            # Server Supabase client (cookies)
│       └── middleware.ts        # Session refresh helpers
└── middleware.ts                # Auth middleware — protects /dashboard
```

---

## Database Setup

CogniLink uses Supabase for Google OAuth, login streaks, and shared graph storage. Apply the project database migration in Supabase before running the app locally.

The public README intentionally does not include production table definitions or security policies. Keep schema changes in private project migrations so local and deployed environments stay aligned.

---

## API Routes

### `POST /api/chat`
Generates a knowledge graph from an uploaded PDF.

**Input:** `FormData` — `prompt` (string) + `files` (PDF)

**Output:**
```json
{
  "n": 6,
  "labels": ["Topic A", "Topic B", "..."],
  "label_summary": ["Summary A", "Summary B", "..."],
  "adjacencyMatrix": [[0,1,0,...], ...]
}
```

The adjacency matrix encodes prerequisite relationships (directed, acyclic, max ~15 nodes).

---

### `POST /api/ask`
Answers a question using the Cogni AI assistant.

**Input:** `{ "question": "..." }`

**Output:** `{ "answer": "..." }`

Cogni is scoped to academic/educational queries only. Jailbreaks and off-topic requests are rejected.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project (free tier is fine)
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pmvrsi/cognilink.git
   cd cognilink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Configure Supabase:
   - Enable **Google** as an OAuth provider in Authentication → Providers
   - Add `http://localhost:3000/auth/callback` to your allowed redirect URLs
   - Apply the project database migration for streaks and shared graphs

5. Start the dev server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Light Blue | `#8ecae6` | Accents, buttons, highlights |
| Mid Blue | `#219ebc` | Text selection |
| Dark Navy | `#023047` | Background |

---

## License

MIT © 2026 Cognilink
