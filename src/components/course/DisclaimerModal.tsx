"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "finance_disclaimer_v1";
export const OPEN_DISCLAIMER_EVENT = "open-disclaimer-modal";

function hasSeenDisclaimer() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return true; // storage unavailable - don't show the modal on every page
  }
}

const noopSubscribe = () => () => {};

export function DisclaimerModal() {
  // Server render and hydration treat the disclaimer as seen; the browser then reads storage
  const seen = useSyncExternalStore(noopSubscribe, hasSeenDisclaimer, () => true);
  const [dismissed, setDismissed] = useState(false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    function handleOpen() { setReopened(true); }
    window.addEventListener(OPEN_DISCLAIMER_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_DISCLAIMER_EVENT, handleOpen);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable - the modal just closes for this page view
    }
    setDismissed(true);
    setReopened(false);
  }

  const modalOpen = reopened || (!seen && !dismissed);
  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-glass-scrim backdrop-blur-glass-sm"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-lg bg-glass-modal-bg backdrop-blur-glass-md rounded-2xl shadow-glass-lg border border-glass-modal-border max-h-[90vh] overflow-y-auto">
        <div className="h-1 w-full bg-sun-yellow" />

        <div className="px-8 pt-7 pb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sun-amber mb-2">
            A note before you start
          </p>
          <h2 className="text-2xl font-bold text-sun-dark mb-5 leading-tight">
            Built with the Tools<br />You&apos;re Learning
          </h2>

          <p className="text-sm text-sun-muted leading-relaxed mb-4">
            The concepts, examples, and case studies in this course were drafted using
            Generative AI - the same kind of tool analysts now use to read filings and
            build models. Each page was reviewed before publishing, but AI makes mistakes,
            markets move, and company figures go stale.
          </p>

          <div className="bg-sun-coral-dim rounded-xl p-4 mb-4 border border-sun-coral-bdr">
            <p className="text-xs font-semibold uppercase tracking-wider text-sun-coral-text mb-1.5">
              Educational only - not financial advice
            </p>
            <p className="text-sm text-sun-dark leading-relaxed">
              Nothing here is a recommendation to buy or sell any security. Companies, ratios
              and screens are teaching examples. For decisions about your own money, speak to
              a licensed, fee-only advisor.
            </p>
          </div>

          <div className="bg-sun-bg rounded-xl p-4 mb-5 border border-sun-yellow-bdr">
            <p className="text-xs font-semibold uppercase tracking-wider text-sun-amber mb-2.5">
              What this means for you
            </p>
            <ul className="space-y-1.5 text-sm text-sun-dark">
              <li className="flex gap-2">
                <span className="text-sun-amber shrink-0">→</span>
                Use this as a starting point, not a final word
              </li>
              <li className="flex gap-2">
                <span className="text-sun-amber shrink-0">→</span>
                Check every number against the primary filing (10-K, annual report, exchange data)
              </li>
              <li className="flex gap-2">
                <span className="text-sun-amber shrink-0">→</span>
                Curiosity and skepticism are the skills that compound fastest
              </li>
            </ul>
          </div>

          <button
            onClick={dismiss}
            className="w-full bg-sun-yellow hover:bg-sun-yellow/80 text-zinc-900 font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            I&apos;m curious - let&apos;s explore
          </button>

          <p className="text-center text-xs text-sun-muted mt-3">
            You can always revisit this from the footer of any page.
          </p>
        </div>
      </div>
    </div>
  );
}
