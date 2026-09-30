# ⚡ OpenDevDocs

> **Learn. Build. Debug. Deploy.**

The open-source developer knowledge platform — learn technologies step-by-step, find commands quickly, solve common errors, follow practical recipes, and move from beginner fundamentals to production-level development.

🌐 **Live site**: [docs.tashanto.com](https://docs.tashanto.com)  
📦 **Repository**: [github.com/iamtashanto/OpenDevDocs](https://github.com/iamtashanto/OpenDevDocs)

---

## Content Sections

| Section | URL | Purpose |
|---------|-----|---------|
| 📖 Docs | `/docs` | Long-form learning guides and references |
| ⌨️ Commands | `/commands` | Copy-paste ready CLI references |
| 🔥 Errors | `/errors` | Error troubleshooting with root cause + fix |
| 🧪 Recipes | `/recipes` | Practical how-to patterns |
| 🗺️ Roadmaps | `/roadmaps` | Structured learning paths |
| 📦 Packages | `/packages` | Library and API references |
| 🛠️ Tools | `/tools` | Developer tooling guides |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) App Router |
| Language | TypeScript 5 (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Docs Engine | [Fumadocs](https://fumadocs.vercel.app) v16 |
| Content | Plain Markdown (`.md`) — ~90% of content |
| Package manager | [pnpm](https://pnpm.io) |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting Started

```bash
# Clone
git clone https://github.com/iamtashanto/OpenDevDocs.git
cd OpenDevDocs

# Install dependencies (runs fumadocs postinstall automatically)
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checker |
| `pnpm validate-content` | Validate frontmatter in all content files |

---

## Project Structure

```
OpenDevDocs/
├── app/                    # Next.js App Router
│   ├── docs/               # /docs section
│   ├── commands/           # /commands section
│   ├── errors/             # /errors section
│   ├── recipes/            # /recipes section
│   ├── roadmaps/           # /roadmaps section
│   ├── packages/           # /packages section
│   ├── tools/              # /tools section
│   ├── api/search/         # Unified full-text search endpoint
│   ├── layout.tsx          # Root layout (RootProvider + metadata)
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Auto-generated /sitemap.xml
│   ├── robots.ts           # Auto-generated /robots.txt
│   └── source.ts           # Fumadocs source loaders
│
├── components/
│   ├── ui/                 # Primitive UI components (Badge, Card, …)
│   ├── docs/               # Docs-layout helpers (nav links, etc.)
│   └── mdx/                # Custom MDX components (Callout, Steps, …)
│
├── config/
│   └── site.ts             # Site-wide constants (name, URL, sections)
│
├── content/                # All documentation — plain Markdown
│   ├── docs/
│   ├── commands/
│   ├── errors/
│   ├── recipes/
│   ├── roadmaps/
│   ├── packages/
│   └── tools/
│
├── lib/
│   ├── utils.ts            # cn() and other helpers
│   └── metadata.ts         # buildMetadata() factory
│
├── public/                 # Static assets
├── scripts/
│   └── validate-content.mjs  # Content frontmatter validator
│
├── source.config.ts        # Fumadocs collection definitions
├── mdx-components.tsx      # Global MDX component registry
├── next.config.ts          # Next.js + Fumadocs MDX config
└── tsconfig.json           # TypeScript (strict mode, @/ alias)
```

---

## Contributing

All content is plain `.md` files — no React knowledge required.

1. Fork the repository
2. Create your content file in the appropriate `content/<section>/` directory
3. Add frontmatter (`title` + `description` are required)
4. Open a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## License

MIT © OpenDevDocs Contributors
