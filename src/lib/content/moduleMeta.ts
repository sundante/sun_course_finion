// Hand-written subtitle + description per module, keyed by slug. Shared by the home page
// tiles (CurriculumTiles.tsx - a module with no entry here gets no tile) and the course map
// (courseMap.ts - the subtitle is the landmark's name). No fs imports: client components use it.
// Numbers, order, tracks and counts are not here: they come from nav.yml
// (via getNavigationTree / getCourseStats) so they cannot drift out of date.

export interface ModuleMeta {
  subtitle: string;
  description: string;
}

export const MODULE_META: Record<string, ModuleMeta> = {
  "compounding":     { subtitle: "The Engine",      description: "How money grows - compound interest, reinvestment risk, and the quiet drag of fees, taxes and inflation on terminal wealth." },
  "asset-classes":   { subtitle: "The Landscape",   description: "Cash, sovereign and corporate bonds, equities, index funds, active ETFs, mutual funds, REITs and commodities - what each is for." },
  "risk-and-return": { subtitle: "The Yardstick",   description: "Measuring return per unit of risk - volatility, Sharpe and Sortino ratios, drawdowns and beta." },
  "accounting":      { subtitle: "The Language",    description: "The income statement, balance sheet and cash flow statement - and how the three link together." },
  "metrics":         { subtitle: "The Instruments", description: "The eight institutional metrics - P/E vs PEG, EV/EBITDA, ROIC vs WACC, FCF yield, leverage, margins, payout coverage and growth CAGRs." },
  "valuation":       { subtitle: "The Scale",       description: "Intrinsic vs relative value, DCF and reverse DCF modeling, WACC in practice, and a margin of safety." },
  "growth":          { subtitle: "The Frontier",    description: "Secular trends, TAM/SAM/SOM, unit economics, the Rule of 40, and the early warning signs of multiple compression." },
  "dividends":       { subtitle: "The Orchard",     description: "Dividend Aristocrats and Contenders, dividend safety, capital intensity, and balance sheets that survive recessions." },
  "garp":            { subtitle: "The Balance",     description: "Growth at a reasonable price plus a growing dividend - compounding the top line at 10-15% while raising payouts." },
  "screening":       { subtitle: "The Sieve",       description: "Exact Boolean and numeric filters on Finviz, Koyfin and Screener.in to isolate growth, dividend and hybrid candidates." },
  "annual-report":   { subtitle: "The Dig",         description: "The four-step institutional read of a 10-K or Indian annual report - moat, statements, management, and margin of safety." },
  "templates":       { subtitle: "The Notebook",    description: "Company deep dive, quarterly earnings note, and investment thesis + post-mortem templates for your own research repository." },
  "portfolio":       { subtitle: "The Blueprint",   description: "Modern portfolio theory, asset allocation, rebalancing and position sizing - turning good ideas into a portfolio." },
  "advisory":        { subtitle: "The Practice",    description: "Fiduciary duty, client risk profiling, asset-liability matching, and tax-efficient withdrawals in the US and India." },
  "career":          { subtitle: "The Credentials", description: "The licensing roadmap - SIE, Series 7/65/66, CFP, CFA, and SEBI's NISM and RIA path - with study checklists." },
  "capstones":       { subtitle: "The Proof",       description: "Three end-to-end projects - a full equity research report, a model portfolio, and a client advisory case." },
};
