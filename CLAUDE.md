@AGENTS.md

# Project Conventions

Learn Finance (learnfinance.sunmintz.com) - a free course from beginner to institutional equity analyst to licensed financial advisor. The platform is ported from the sibling project `sun-course-genai` (learngenai.sunmintz.com); keep the two in step when fixing shared platform bugs.

## File Naming - Content Files

All content files under `src/content/` use zero-padded numeric prefixes (`01-`, `02-`, etc.).

- When files are deleted, **renumber the remaining files** so there are no gaps (e.g. if `01` and `02` are deleted, rename `03→01`, `04→02`, etc.)
- Keep `nav.yml` in sync with any file renames - it is the single source of truth for navigation
- Module folders are numbered in nav order (`01-Money-and-Compounding` ... `16-Capstones`, plus the unnumbered `Knowledge-Check`); a new top-level module needs a title -> slug entry in `MODULE_SLUG_MAP` (`src/lib/content/nav.ts`) - the build throws if one is missing. The module's content folder is derived from its pages, so there is no second map to update
- Nav group names matter to the home page counts (`src/lib/content/stats.ts`): pages under `Concepts` count as notes, pages under `Templates` count as research templates; quiz question counts come from each module's `quiz` fences
- Moving or renaming a page changes its URL. Add the old -> new `/learn/...` path to `src/lib/content/legacy-redirects.json`; the 404 page forwards old URLs from that map (static export has no server-side redirects)
- Run `npm run check:content` after any content change: broken links, em dashes, numbering gaps, pages missing from `nav.yml`, invalid fence YAML, unbalanced `<div>` tags, missing `public/` files, template pages out of sync

## Note Template & Course Fences

Every concept note follows this shape (module `INDEX.mdx` pages use the same `objectives` fence with `scope: module`):

1. `# Title` and a one-line definition
2. An `objectives` fence - 3-5 measurable "you will be able to..." outcomes, prerequisites, estimated time
3. `## Why It Matters` with an `audience-beginner` and an `audience-analyst` div
4. The body: definitions and formulas (KaTeX), a worked example, sector benchmarks where relevant, `## Red Flags`, how the metric or idea interacts with others, and `## Case Studies` (one US and one Indian where possible)
5. `## Check Yourself` + a `quiz` fence (3-5 questions)
6. `## Exercises` + an `exercise` fence (worked numeric problems or hands-on tasks, with hidden solutions)
7. `## Study Notes`, then `## References` (primary sources with year + link), then `*Last reviewed: YYYY-MM*`

Fences hold YAML and are rendered by `remarkCourseFences.ts` -> `CourseFences.tsx` / `Quiz.tsx`. String fields are Markdown (links to `.mdx` files are rewritten like any other link). Content is compiled as plain Markdown (`format: "md"`), so JSX components cannot be used in `.mdx` files - add a fence type instead.

```objectives
scope: page            # or "module" on INDEX pages
time: 45 min
outcomes:
  - Calculate ROIC from an income statement and balance sheet
prerequisites:
  - "[Balance Sheet](../../04-Accounting-Foundations/Notes/02-Balance-Sheet.mdx) - assets, liabilities and equity"
```

```quiz
- q: "Question text (Markdown)"
  options: ["first", "second", "third"]
  answer: 2              # 1-based number of the correct option
  explain: "Why - shown after answering"
- q: "Free-text question"
  answer: "Model answer, revealed on click"
```

```exercise
- title: Short title
  task: |
    Markdown task description
  hints: ["optional hint"]
  solution: |
    Markdown solution, hidden until clicked
```

Quote every YAML string that contains `: `. Avoid LaTeX in fences (YAML escapes backslashes); write fence math as plain text (`FV = P × (1 + r)^n`).

Reference implementation: `src/content/05-Metric-Toolkit/Notes/03-ROIC-vs-WACC.mdx`.

Module `INDEX.mdx` pages were generated from `nav.yml` plus per-module intro/outcomes/topics; edit them directly now, and keep each Chapter Map row in step with `nav.yml`.

## Math

- KaTeX via `remark-math` + `rehype-katex` (both MDX pipelines: `learn/[module]/[slug]/page.tsx` and `quiz/[module]/page.tsx`); CSS imported in `layout.tsx`
- **Only `$$...$$` is math** (`singleDollarTextMath: false`), so prices like "$100 and $200" stay plain text. Use `$$x$$` inline and a `$$` block on its own lines for display math
- Keep math out of headings (TOC and search slug the raw text). The search index skips `$$` blocks and strips inline `$$...$$`
- Format thousands in math with `{,}` (e.g. `2{,}500`) so KaTeX does not add spacing after the comma

## Finance Content Rules

- **US and India side by side**: examples, products, tax rules, regulators, screeners (Finviz / Koyfin and Screener.in), licensing (FINRA / NASAA / CFP and NISM / SEBI)
- **Educational, never advice**: no buy/sell recommendations; company examples are teaching cases. The disclaimer modal and footer note say so on every page
- **Date and hedge volatile facts**: tax rates, exam formats, regulatory thresholds and fee caps change - state the year, say "approximately" for company figures, and point to the primary source (IRS, Income Tax Department, SEC, SEBI, FINRA, NISM, CFA Institute, CFP Board)
- **Check the arithmetic**: every worked example and exercise solution must be recomputed (a quick Python one-liner is fine) before committing
- Indian amounts use lakh / crore (1 crore = 100 lakh = 10 million); say which currency a number is in when it is not obvious

## Research Templates

- The three downloadable templates live in `public/templates/*.md` (Obsidian-style frontmatter, no triple-backtick fences inside)
- Each template page in `src/content/12-Research-Templates/Templates/` links to its file (`/templates/x.md`) and shows the same text in a ```markdown fence. `check:content` fails if the fence and the file differ - edit the public file, then paste it into the page

## Punctuation

- Always use `-` (hyphen-dash) instead of the em dash character (U+2014) in all prose and content files - `npm run check:content` fails on any em dash under `src/`
- This applies to MDX content, component copy, and any user-facing text throughout the site

## Sidebar Numbering

- **Module-level** headings (e.g. "05. The Metric Toolkit") - rendered in `Sidebar.tsx > ModuleSection`, number is `NavModule.number` (1-based nav.yml order, computed in `nav.ts`)
- **Track labels** (Foundations, Reading the Numbers, Selecting Stocks, Research Workflow, Portfolio & Advisory, Review) - `- track: Name` entries in `nav.yml`, rendered unnumbered above the first module of each track (`Sidebar.tsx > ModuleList`, `CurriculumTiles.tsx`)
- **Sub-concept leaf items** - rendered in `Sidebar.tsx > NavLeaf`, index passed from `.map((child, i) => ...)` inside `NavSection`
- Section group labels (Concepts, Templates, Projects) are **not** numbered - they are structural groupings only

## Project Tracking

- `vibes/status.md` is the single source of truth for project status - feature inventory, backlog, known issues, and handover notes for the next session
- Update `vibes/status.md` after every successful build/coding session (refresh affected sections + append a Changelog entry); generate a `vibes/status.html` view only on demand
- **Always update the relevant tracker doc after every completed build** - not just `vibes/status.md`. If a session works against a dedicated checklist, check off every item actually completed in that session, in the same commit/session the work was done. Once a dedicated checklist is fully complete, delete it and capture the outcome in `vibes/status.md`'s Changelog instead

## Asset Color Scheme

- Generate all assets (HTML pages, dashboards, diagrams, standalone UI mockups, etc.) with **light mode as the default look**, regardless of the viewer's system `prefers-color-scheme`
- Always include an explicit on-page toggle (e.g. via a `data-theme` attribute) to switch to dark mode - never ship a dark-only or light-only asset, and never let system preference silently override the light default

## Site UI Conventions

The site's own design system (shared with the GenAI course). Current component inventory lives in `vibes/status.md` > "What's Built".

- **Tokens**: colors and glass values are plain CSS custom properties in `:root` / `.dark` (`src/app/globals.css`), aliased into Tailwind utilities via `@theme inline`. Add new tokens the same way - a token missing from `@theme inline` gets no utility, and Tailwind v4 drops the class silently
- **Use tokens in components, never hard-coded colors**: `bg-sun-bg`, `bg-sun-surface`, `text-sun-dark`, `text-sun-muted`, `bg-glass-nav-bg`, etc. Text on `bg-sun-yellow` uses `text-zinc-900`, because the yellow stays the same in both themes while `text-sun-dark` flips to near-white
- **Palette**: `--sun-yellow` (`#FFDA47`) is the accent and stays the same in both themes (only surfaces and text swap); `--sun-coral` is the sparing secondary accent (used for the not-advice disclaimer); `--sun-wip` is the WIP/disabled gray
- **Glass tokens** come in elevation tiers (`nav`, `panel`, `card`, `modal`, plus `scrim` for modal backdrops) with a `shadow-glass-sm/md/lg/glow` scale. Use them on chrome, not on article prose. The `blur-glass-*` scale is currently `0px` - change it in `globals.css`, never per component
- **Dark mode** is hand-rolled: an inline `<head>` script in `layout.tsx` reads `localStorage.theme` before hydration, and `ThemeToggle` flips the `.dark` class on `<html>`. Light is the default, and `prefers-color-scheme` is never read
- **Header** (`Header.tsx`, and the landing header in `app/page.tsx`): brand, Search, ThemeToggle, Github (repo), Author, sunmintz.com, social icons, Map and Quiz links. Keep the two headers' buttons in step
- **Disclaimer**: `DisclaimerModal` ("Built with the Tools You're Learning" + "Educational only - not financial advice") shows once per browser (`finance_disclaimer_v1`); `DisclaimerNote` in every page footer reopens it
- **Layout**: stock Tailwind breakpoints only. `lg:` is the cutover - persistent `Sidebar` + `TableOfContents` above it, `MobileNav` drawer and no TOC below it. Render the TOC only when the page has headings
- **Prose**: style MDX through `@tailwindcss/typography`'s `.prose` plus `--tw-prose-*` / `.prose` overrides in `globals.css`. Don't build custom table/callout/image components
- **MDX surface stays small**: `MdxComponents.tsx` overrides only `pre` (Mermaid) and `div` (course fences); a new interactive element = a new fence language, not a component
- **Audience split**: wrap prose in `<div class="audience-beginner" markdown="1">` / `<div class="audience-analyst" markdown="1">` with blank lines inside; CSS hides them from `body[data-audience]`, which `AudienceToggle` (All / Analyst / Beginner) and `AudienceSync` set and persist
- **Navigation behavior**: prev/next is computed across the whole flattened nav (it crosses module boundaries); sidebar sections auto-expand to reveal the active page. WIP status is automatic (`isStubFile()` in `nav.ts`, fewer than 8 body lines) - never hand-flag a page as WIP. Stubs are a title, a definition and a short "Planned coverage" list
- **TOC and search anchors**: `extractToc()` in `loader.ts` and the search index (`searchIndex.ts`) both skip fenced code, turn heading markdown into text with the shared `headingText()`, and slug it with `github-slugger`, so ids match `rehype-slug` exactly. Change heading handling only in `headingText()`
- **Course map** (`/map`, `CourseMap.tsx`) is drawn from `nav.yml` by `src/lib/content/courseMap.ts`. Landmark names are the subtitles in `src/lib/content/moduleMeta.ts` - give a new module an entry there (it also controls the home page tile). `sitemap.ts` / `robots.ts` derive from `nav.yml`, on `SITE_URL` in `src/lib/site.ts`
- **Search** is a build-time index (`src/lib/content/searchIndex.ts` -> static route `src/app/search-index.json/route.ts`) searched in the browser by `Search.tsx` (MiniSearch). New content is indexed on build with no extra step
- **Don't build speculatively**: calculators, progress tracking, auth and tests are backlog items in `vibes/status.md`; build them only when there's a concrete need

## Diagrams & Visual Explanations

- For pipelines, frameworks, decision flows, lifecycles or comparisons, prefer a **Mermaid diagram** over prose-only explanations or ASCII-art box diagrams
- Mermaid works with **zero setup** - ` ```mermaid ` fenced code blocks in any `.mdx` file are auto-rendered by `MermaidDiagram.tsx` via `MdxComponents.tsx`
- **House style to imitate:** `src/content/05-Metric-Toolkit/Notes/03-ROIC-vs-WACC.mdx` (flowchart with subgraphs), `09-How-the-Metrics-Interact.mdx` (mindmap), `02-Asset-Classes/Notes/04-Index-Funds-ETFs-and-Mutual-Funds.mdx` (sequence diagram) - emoji-labeled nodes, quoted labels, per-node `style X fill:#... stroke:#...` overrides from the shared palette: sage `#dde4dc/#b0c4b0` (good / result), tan `#e8e0d4/#c8b89a` (warning / risk), blue-gray `#d8dfe8/#b0bac8` (decision / key step), sand `#e8e2d9/#ccc4b8`
- Pick the diagram type to match the content: `flowchart LR/TD` for pipelines and decisions, `stateDiagram-v2` for lifecycles, `sequenceDiagram` for flows between parties, `mindmap` for taxonomies
- `MermaidDiagram.tsx` falls back to showing the raw fence text if a diagram fails to parse - a diagram that renders as text means broken syntax
- **Use a table, not a diagram**, for genuinely tabular comparisons (sector benchmarks, asset class comparisons, license maps)
- **ASCII is fine** for directory trees (e.g. the research repository layout)
