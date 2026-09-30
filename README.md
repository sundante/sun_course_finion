# Learn Finance

A free, open-source course that takes an absolute beginner to institutional-grade equity analyst, and on to qualifying as a professional financial advisor - with US and Indian markets side by side.

**Live site:** <https://learnfinance.sunmintz.com>

> Educational only - not financial advice. Content is AI-assisted and reviewed; always verify against primary sources.

## What's Inside

16 modules in 6 tracks:

| Track | Modules |
|---|---|
| Foundations | Money & Compounding, Asset Classes & Products, Risk & Return |
| Reading the Numbers | Accounting Foundations, The Metric Toolkit (8 institutional metrics), Valuation (DCF, reverse DCF, margin of safety) |
| Selecting Stocks | Growth Investing, Dividend Growth Investing, GARP & Hybrid, Stock Screening (Finviz, Koyfin, Screener.in) |
| Research Workflow | Annual Report Analysis (the 4-step checklist), Research Templates |
| Portfolio & Advisory | Portfolio Construction, Advisory Practice, Licensing & Career (Series 7/65/66, CFP, CFA, NISM, SEBI RIA) |
| Review | Capstones, Knowledge Check |

Every note has learning objectives, formulas, worked examples, red flags, US and Indian case studies, a graded quiz, exercises with hidden solutions, and references. Pages still being written are marked WIP in the sidebar.

**Research templates** for your own Obsidian or GitHub vault: [company deep dive](public/templates/company-deep-dive.md), [quarterly earnings note](public/templates/quarterly-earnings-note.md), [investment thesis & post-mortem](public/templates/investment-thesis-and-post-mortem.md).

## Development

```bash
npm install
npm run dev            # http://localhost:3000
npm run check:content  # links, numbering, nav coverage, fence YAML, em dashes, template sync
npm run lint
npm run build          # static export to out/
```

Stack: Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4, MDX via `next-mdx-remote`, KaTeX, Mermaid, MiniSearch.

- Content lives in `src/content/`; `src/content/nav.yml` is the single source of truth for navigation
- Conventions for writing notes are in [CLAUDE.md](CLAUDE.md)
- Project status and backlog are in [vibes/status.md](vibes/status.md)

## Deployment

Pushing to `main` builds the static site and deploys `out/` to Hostinger over FTP (`.github/workflows/deploy.yml`). The workflow needs the `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` repository secrets.

## License and Credits

Built by [Suryaprakash Singh](https://suryaprakash.sunmintz.com/) - part of [sunmintz.com](https://sunmintz.com/). The platform is shared with [Learn GenAI](https://learngenai.sunmintz.com).
