# Learn Finance - Project Status

**URL:** https://learnfinance.sunmintz.com (not yet deployed - see Deployment)
**Repo:** github.com/sundante/sun_course_finion
**Stack:** Next.js 16.2.9 (App Router, static export) - TypeScript (strict) - Tailwind CSS 4 - MDX (`next-mdx-remote/rsc`) - KaTeX - Mermaid - MiniSearch - shadcn/ui
**Platform origin:** ported from `sun-course-genai` (learngenai.sunmintz.com), commit `ed5b565`
**Last updated:** 2026-09-30

> Single source of truth for project status. Update after every build/coding session (refresh affected sections + append a Changelog entry).

---

## 1. Deployment

**Target:** `learnfinance.sunmintz.com`, served from `/domains/sunmintz.com/public_html/learnfinance/` on Hostinger
**Method:** push to `main` -> `.github/workflows/deploy.yml` -> `npm ci && npm run build` -> FTP upload of `out/` (SamKirkland/FTP-Deploy-Action, `dangerous-clean-slate: true`)

**Before the first deploy:**

- [ ] Add repository secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (Settings -> Secrets -> Actions)
- [ ] Create the `learnfinance` subdomain in Hostinger hPanel pointing at `public_html/learnfinance/`
- [ ] Note: the workflow runs on every push to `main` - merge to `main` only when ready to publish

## 2. What's Built

### Platform (ported, unchanged behavior)

| Feature | Files |
|---|---|
| Course layout: header, sidebar with tracks and numbered modules, TOC, sticky prev/next, mobile drawer | `app/(course)/layout.tsx`, `Header.tsx`, `Sidebar.tsx`, `TableOfContents.tsx`, `PageNav.tsx`, `MobileNav.tsx` |
| Landing page: hero, feature grid, path stepper, curriculum tiles, learning paths, CTA | `app/page.tsx`, `CurriculumTiles.tsx` |
| Course map (`/map`) from `nav.yml` | `courseMap.ts`, `CourseMap.tsx`, `moduleMeta.ts` |
| Build-time search (MiniSearch) | `searchIndex.ts`, `search-index.json/route.ts`, `Search.tsx` |
| Quizzes per module (`/quiz/[module]`, `/quiz/all`) from page `quiz` fences | `quizzes.ts`, `Quiz.tsx` |
| Course fences: `objectives`, `quiz`, `exercise` | `remarkCourseFences.ts`, `CourseFences.tsx` |
| Mermaid diagrams | `MermaidDiagram.tsx` |
| Dark mode (light default) | `ThemeToggle.tsx`, `layout.tsx` init script |
| Sitemap, robots, legacy redirect 404 | `sitemap.ts`, `robots.ts`, `not-found.tsx`, `LegacyRedirect.tsx` |
| Content checker | `scripts/check-content.mjs` |

### Finance-specific changes

| Change | Where |
|---|---|
| Brand "Learn Finance", repo link, Author button in the course header, `learnfinance` site URL and deploy dir | `Header.tsx`, `app/page.tsx`, `site.ts`, `deploy.yml` |
| Disclaimer modal: "Built with the Tools You're Learning" + coral **Educational only - not financial advice** block; footer note updated | `DisclaimerModal.tsx`, `DisclaimerNote.tsx` |
| Audience toggle relabelled **All / Analyst / Beginner** (`audience-analyst` / `audience-beginner` classes, `finance_*` storage keys) | `AudienceToggle.tsx`, `AudienceSync.tsx`, `globals.css` |
| KaTeX math (`$$` only, so prices stay text) in page and quiz pipelines; search index skips math | `learn/[module]/[slug]/page.tsx`, `quiz/[module]/page.tsx`, `layout.tsx`, `searchIndex.ts` |
| Stats: notes = written (non-WIP) `Concepts` pages, templates = `Templates` pages, questions = quiz-fence questions | `stats.ts`, `CourseMap.tsx`, `CurriculumTiles.tsx` |
| Downloadable research templates | `public/templates/*.md` |
| Checker: public-file links, balanced `<div>`s, template page sync | `scripts/check-content.mjs` |
| Removed GenAI-only `AgentUseCaseMindmap` / `agent-navigator` fence | `MdxComponents.tsx` |
| Yellow header buttons use `text-zinc-900` (GenAI site shows light text on yellow in dark mode) | `Header.tsx` |

### Content inventory

16 modules in 6 tracks + Knowledge Check. 85 `.mdx` files: 16 module INDEX pages, Knowledge Check INDEX, 49 full notes/templates, 19 WIP stubs.

| Module | Full | Stubs (auto-WIP) |
|---|---|---|
| 01 Money & Compounding | Compound Interest, Reinvestment Risk, Terminal Wealth Drag | Time Value of Money |
| 02 Asset Classes | all 6 | - |
| 03 Risk & Return | Sharpe, Sortino | Return & Volatility, Drawdown & Beta |
| 04 Accounting Foundations | - | all 4 |
| 05 Metric Toolkit | all 9 (reference note: ROIC vs WACC) | - |
| 06 Valuation | DCF, Reverse DCF, Margin of Safety | Intrinsic vs Relative, WACC in Practice |
| 07 Growth Investing | all 4 | - |
| 08 Dividend Investing | Aristocrats & Contenders, Safety Checklist | Capital Intensity & Balance Sheet |
| 09 GARP & Hybrid | framework note | - |
| 10 Stock Screening | Finviz, Koyfin, Screener.in | Screener Mechanics |
| 11 Annual Report Analysis | Steps 1-4 | 10-K vs Indian Annual Report |
| 12 Research Templates | Repository Setup + 3 templates | - |
| 13 Portfolio Construction | MPT | Asset Allocation, Rebalancing, Position Sizing |
| 14 Advisory Practice | Fiduciary, Risk Profiling, Tax-Efficient Withdrawals | Asset-Liability Matching |
| 15 Licensing & Career | all 4 | - |
| 16 Capstones | - | all 3 projects |

## 3. Backlog

1. Write the 19 stub pages (priority: Accounting Foundations - every metric note links to it; then WIP Valuation and Portfolio notes; then Capstones)
2. Interactive compounding / fee-drag calculator as a new fence type (would make Module 01 hands-on)
3. Generate `vibes/status.html` (on demand)
4. Obsidian-vault export of course notes as plain `.md` (the course is `.mdx`)
5. Q&A review banks per module (GenAI course pattern), if quiz coverage proves too thin
6. Keep finance facts current: annual pass over tax rules (US and India), SEBI IA/RA rules, exam formats

## 4. Known Issues

1. Company figures in case studies are approximate and marked as such; they need a periodic refresh
2. Screener filter names (Finviz, Koyfin, Screener.in) are documented with a "pick the closest name" caveat - vendors rename filters
3. Stub pages are linked from full notes as prerequisites (e.g. Balance Sheet, Income Statement) - they render as WIP until written

## 5. Handover Notes

- Start any content session by reading `CLAUDE.md` (note template, math rules, finance content rules) and the reference note `05-Metric-Toolkit/Notes/03-ROIC-vs-WACC.mdx`
- Recompute every worked example before committing - several numeric slips were caught this way during the first build
- Template pages must stay in sync with `public/templates/*.md` (`check:content` enforces it)

## Changelog

- **2026-09-30** - Initial build. Ported the GenAI course platform (layout, sidebar, map, search, quizzes, disclaimer, header buttons), rebranded to Learn Finance, added KaTeX math, finance disclaimer, Analyst/Beginner audience toggle, template downloads and three new content checks. Wrote the 16-module curriculum: 49 full notes/templates, 16 module INDEX pages, Knowledge Check hub and 19 WIP stubs. `check:content`, `lint` and `build` pass; all 41 Mermaid diagrams parse; all 686 search anchors resolve. Home page shows 46 notes, 178 quiz questions, 3 templates.
