import Link from "next/link";
import { getNavigationTree } from "@/lib/content/nav";
import { Search } from "@/components/course/Search";
import { ThemeToggle } from "@/components/course/ThemeToggle";
import { CurriculumTiles } from "@/components/course/CurriculumTiles";
import { getCourseStats } from "@/lib/content/stats";

const LEARNING_PATHS = [
  { label: "A", title: "Self-Directed Investor", desc: "Money & Compounding, Asset Classes, Risk & Return, then the Metric Toolkit and the dividend and GARP frameworks." },
  { label: "B", title: "Equity Analyst",         desc: "Accounting, the Metric Toolkit, Valuation, every selection framework, the annual-report workflow and the research templates." },
  { label: "C", title: "Aspiring Advisor",       desc: "Foundations, Portfolio Construction, Advisory Practice and the licensing roadmap for the US (Series 7/66, CFP) and India (NISM, SEBI RIA)." },
  { label: "D", title: "Full Sequence",          desc: "Every module in order, from your first compounding curve to advising a client - the recommended path." },
];

const LANDING_NAV = [
  { href: "#features", label: "Features" },
  { href: "#path", label: "Path" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#paths", label: "Learning Paths" },
];

function StarSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function HomePage() {
  const { modules } = getNavigationTree();
  const stats = getCourseStats();

  const FEATURES = [
    { icon: "01", title: `${stats.concepts} deep-dive notes`,   desc: "Formulas, sector benchmarks, red flags and worked examples, with Beginner and Analyst views on every page." },
    { icon: "02", title: `${stats.questions} quiz questions`,   desc: "A Check Yourself quiz and worked exercises on every page, collected into graded module quizzes." },
    { icon: "03", title: `${stats.labs} research templates`,    desc: "Company deep dive, quarterly earnings note, and thesis + post-mortem - download them into your own Obsidian or GitHub vault." },
    { icon: "04", title: "US + India, side by side",           desc: "Finviz and Koyfin next to Screener.in, Series 7/66 and CFP next to NISM and SEBI RIA, case studies from both markets." },
  ];

  // One step per track, listing the modules it contains
  const PATH_STEPS = stats.tracks.map((track, i) => ({
    n: String(i + 1),
    label: track,
    desc: modules.filter((mod) => mod.track === track).map((mod) => mod.title).join(", "),
  }));

  const STATS: [string, string][] = [
    [String(stats.concepts), "Deep-dive notes"],
    [String(stats.modules), "Modules"],
    [String(stats.questions), "Review Q&A"],
    ["Free", "Always"],
  ];

  return (
    <div className="min-h-screen flex flex-col bg-sun-bg">
      {/* Header */}
      <header className="bg-sun-bg border-b border-sun-yellow px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sticky top-0 z-40">
        <a href="#top" className="font-bold text-sun-dark tracking-tight text-sm shrink-0">
          Learn Finance
        </a>
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold">
          {LANDING_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sun-dark hover:text-sun-amber transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link href="/map" className="text-sun-dark hover:text-sun-amber transition-colors">
            Course Map
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Search />
          <ThemeToggle />
          <a
            href="https://github.com/sundante/sun_course_finion"
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-sun-yellow text-zinc-900 hover:bg-sun-yellow-dk rounded-md px-2.5 py-1.5 transition-colors"
          >
            <StarSvg /> Github
          </a>
          <a
            href="https://suryaprakash.sunmintz.com/"
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center text-xs font-semibold bg-sun-yellow text-zinc-900 hover:bg-sun-yellow-dk rounded-md px-3 py-1.5 transition-colors"
          >
            Author
          </a>
          <a
            href="https://sunmintz.com/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold bg-sun-yellow text-zinc-900 hover:bg-sun-yellow-dk rounded-md px-3 py-1.5 transition-colors"
          >
            sunmintz.com
          </a>
        </div>
      </header>

      {/* Hero - full-width, centered, decorative radial glow behind the
          headline (theme-reactive via --sun-yellow-dim, no fixed colors) */}
      <section id="top" className="relative overflow-hidden px-4 sm:px-6 pt-14 pb-10 sm:pt-20 sm:pb-14 scroll-mt-14">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
          style={{ background: "radial-gradient(circle at 50% 0%, var(--sun-yellow-dim), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-sun-amber bg-sun-yellow-dim border border-sun-yellow-bdr rounded-full px-3 py-1">
            Beginner to Analyst to Advisor
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-sun-dark">
            Think Like an{" "}
            <span className="text-sun-amber">Institutional Investor</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-sun-muted leading-relaxed max-w-2xl mx-auto">
            A structured, practical curriculum from compound interest to reading a 10-K, valuing a business, building portfolios and earning an advisory license - formulas, screens and templates included.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/learn/compounding/index"
              className="inline-flex items-center justify-center text-sm font-semibold bg-sun-yellow text-zinc-900 hover:bg-sun-yellow-dk rounded-lg px-6 py-2.5 shadow-glass-sm transition-colors w-full sm:w-auto"
            >
              Start Learning →
            </Link>
            <Link
              href="/quiz/all"
              className="inline-flex items-center justify-center text-sm font-semibold text-sun-dark border border-glass-card-border hover:border-sun-yellow-bdr hover:bg-glass-panel-bg rounded-lg px-6 py-2.5 transition-colors w-full sm:w-auto"
            >
              Practice Quiz
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-sun-muted">
            {STATS.map(([stat, label], i) => (
              <span key={label} className="inline-flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-glass-card-border">|</span>}
                <span className="font-bold text-sun-dark">{stat}</span> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="px-4 sm:px-6 pb-12 sm:pb-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-4 sm:p-5 rounded-xl border border-glass-card-border bg-glass-card-bg backdrop-blur-glass-sm shadow-glass-sm"
            >
              <span className="text-xs font-mono text-sun-amber font-semibold">{f.icon}</span>
              <div className="font-semibold text-sun-dark text-sm mt-2 mb-1">{f.title}</div>
              <div className="text-xs text-sun-muted leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Your Path - horizontal stepper connecting the feature grid to the
          curriculum browser below */}
      <section id="path" className="px-4 sm:px-6 pb-12 sm:pb-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4 text-center">Your Path</h2>
          <div className="relative grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="hidden lg:block absolute top-4 left-[10%] right-[10%] h-px bg-glass-card-border" aria-hidden="true" />
            {PATH_STEPS.map((step) => (
              <div key={step.n} className="relative flex flex-col items-center text-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sun-yellow text-zinc-900 text-xs font-bold shrink-0 shadow-glass-sm z-10">
                  {step.n}
                </span>
                <div>
                  <div className="font-semibold text-sun-dark text-sm">{step.label}</div>
                  <div className="text-xs text-sun-muted mt-0.5">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum browser */}
      <section id="curriculum" className="px-4 sm:px-6 pb-14 sm:pb-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-2">Curriculum</h2>
            <p className="text-2xl font-bold text-sun-dark tracking-tight">
              {stats.modules} modules in {stats.tracks.length} tracks, start to finish
            </p>
          </div>
          <CurriculumTiles modules={modules} stats={stats.byModule} />
        </div>
      </section>

      {/* Learning paths */}
      <section id="paths" className="px-4 sm:px-6 pb-14 sm:pb-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4 text-center">Learning Paths</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {LEARNING_PATHS.map((path) => (
              <div key={path.label} className="p-4 sm:p-5 rounded-xl border border-glass-card-border bg-glass-card-bg backdrop-blur-glass-sm shadow-glass-sm">
                <div className="w-7 h-7 rounded-full bg-sun-yellow text-zinc-900 text-xs font-bold flex items-center justify-center mb-2">
                  {path.label}
                </div>
                <div className="font-semibold text-sun-dark text-sm mb-1">{path.title}</div>
                <div className="text-xs text-sun-muted leading-relaxed">{path.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section id="start" className="px-4 sm:px-6 pb-14 sm:pb-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto rounded-2xl bg-zinc-900 text-white px-6 sm:px-10 py-10 sm:py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Ready to go from saver to analyst?</h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-6">
            100% free and open source. Educational only - not financial advice.
          </p>
          <Link
            href="/learn/compounding/index"
            className="inline-flex items-center justify-center text-sm font-semibold bg-sun-yellow text-zinc-900 hover:bg-sun-yellow-dk rounded-lg px-6 py-2.5 transition-colors"
          >
            Start Learning →
          </Link>
        </div>
      </section>

      {/* Footer - theme-invariant dark bg, fixed text colors */}
      <footer className="bg-zinc-900 text-white/60 px-4 sm:px-6 py-5 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>
            © 2026{" "}
            <a href="https://sunmintz.com/" className="text-sun-yellow hover:text-white transition-colors">
              sunmintz.com
            </a>. Built by Suryaprakash Singh.
          </span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/sundante/sun_course_finion" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/suryaprakash-s-singh/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/sunsindante" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X / Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
