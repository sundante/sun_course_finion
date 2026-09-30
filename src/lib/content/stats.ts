import type { NavItem, NavModule } from "@/types/content";
import { getNavigationTree } from "./nav";
import { getModuleQuiz } from "./quizzes";

// Counts derived from nav.yml + the content files, so the home page never hand-types
// "180+ notes" style numbers that drift out of date.

export interface ModuleStats {
  concepts: number;
  labs: number;
  questions: number;
}

function leaves(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => (item.children ? leaves(item.children) : [item]));
}

function group(items: NavItem[], title: string): NavItem[] {
  return items.flatMap((item) => {
    if (!item.children) return [];
    return item.title === title ? leaves(item.children) : group(item.children, title);
  });
}

export function getModuleStats(mod: NavModule): ModuleStats {
  return {
    // Written notes only - WIP stubs are listed in the sidebar but not counted as notes
    concepts: group(mod.items, "Concepts").filter((item) => !item.wip).length,
    // Research templates are this course's hands-on artifacts
    labs: group(mod.items, "Templates").length,
    // Check Yourself questions across the module's pages (the same set its /quiz page grades)
    questions: getModuleQuiz(mod.slug)?.questions ?? 0,
  };
}

export interface CourseStats {
  modules: number;
  tracks: string[];
  concepts: number;
  labs: number;
  questions: number;
  byModule: Record<string, ModuleStats>;
}

// Capstone projects and the review hub are not teaching modules
const NON_TEACHING = new Set(["capstones", "knowledge-check"]);

/** Course-wide totals, over teaching modules only (not the capstones or the Knowledge Check hub). */
export function getCourseStats(): CourseStats {
  const { modules } = getNavigationTree();
  const teaching = modules.filter((mod) => !NON_TEACHING.has(mod.slug));
  const byModule = Object.fromEntries(teaching.map((mod) => [mod.slug, getModuleStats(mod)]));
  const sum = (key: keyof ModuleStats) => Object.values(byModule).reduce((total, s) => total + s[key], 0);
  return {
    modules: teaching.length,
    tracks: [...new Set(teaching.map((mod) => mod.track).filter((t): t is string => Boolean(t)))],
    concepts: sum("concepts"),
    labs: sum("labs"),
    questions: sum("questions"),
    byModule,
  };
}
