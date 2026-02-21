# CogniLink

**Connect your books. Master every topic.**

CogniLink is an AI-powered knowledge management platform that builds conversational knowledge graphs from your resources. Ask anything, summarize instantly, and learn via voice.

## Features

- **Topic Extraction** - Tell CogniLink what you need to know and receive structured summaries formatted for high-retention learning
- **Voice Q&A** - Speak to your library and ask follow-up questions hands-free
- **OCR Engine** - High-speed character recognition for handwritten notes and old textbooks
- **Verification** - Every claim is cited with direct links to the original page in your PDF

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Ubuntu Mono

## Project Structure

```
cognilink/
├── app/
│   ├── auth/
│   │   └── callback/       # OAuth callback handler
│   ├── login/
│   │   └── page.tsx        # Login page with email/password & Google OAuth
│   ├── globals.css         # Global styles & Tailwind config
│   ├── layout.tsx          # Root layout with navbar & footer
│   └── page.tsx            # Landing page
├── lib/
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       ├── server.ts       # Server Supabase client
│       └── middleware.ts   # Session refresh utilities
├── middleware.ts           # Next.js middleware for auth
└── .env.local.example      # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- A [Supabase](https://supabase.com/) project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cognilink.git
   cd cognilink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Configure Supabase:
   - Enable Email/Password authentication in your Supabase dashboard
   - (Optional) Enable Google OAuth provider
   - Add `http://localhost:3000/auth/callback` to your allowed redirect URLs

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Light Blue | `#8ecae6` | Accents, highlights |
| Mid Blue | `#219ebc` | Primary buttons, CTAs |
| Dark Navy | `#023047` | Background |

## License

MIT

