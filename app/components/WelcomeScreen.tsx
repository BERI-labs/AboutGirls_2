"use client";

import { useEffect } from "react";
import { SCHOOL_NAME, FEATURED_QUESTION, SUGGESTED_QUESTIONS } from "../lib/school-config";

// Set to true locally to see scroll diagnostics in the console.
// Never commit as true.
const DEBUG_SCROLL = false;

interface WelcomeScreenProps {
  onQuestion: (q: string) => void;
}

export function WelcomeScreen({ onQuestion }: WelcomeScreenProps) {
  useEffect(() => {
    if (!DEBUG_SCROLL) return;

    const report = () => {
      const html = document.documentElement;
      const body = document.body;
      const main = document.querySelector("main");
      console.log("[scroll-debug]", {
        "window.scrollY": window.scrollY,
        "scrollingEl.scrollTop": document.scrollingElement?.scrollTop,
        html_overflow: getComputedStyle(html).overflow,
        html_height: getComputedStyle(html).height,
        body_overflow: getComputedStyle(body).overflow,
        body_height: getComputedStyle(body).height,
        main_overflow: main ? getComputedStyle(main).overflow : "n/a",
        main_height: main ? getComputedStyle(main).height : "n/a",
        center_el: document.elementFromPoint(
          window.innerWidth / 2,
          window.innerHeight / 2,
        )?.tagName,
      });
    };

    const onWheel = (e: WheelEvent) => {
      report();
      if (e.defaultPrevented)
        console.warn("[scroll-debug] wheel defaultPrevented by", e.target);
    };
    const onTouch = (e: TouchEvent) => {
      report();
      if (e.defaultPrevented)
        console.warn("[scroll-debug] touchmove defaultPrevented by", e.target);
    };

    window.addEventListener("wheel", onWheel, { capture: true, passive: true });
    window.addEventListener("touchmove", onTouch, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchmove", onTouch, { capture: true });
    };
  }, []);

  return (
    // overflow-y-auto removed: parent <main> uses min-h-screen in welcome
    // state so the page/body scrolls rather than this inner container.
    // Eliminating the nested scroller fixes the touch/trackpad "stuck at
    // bottom" bug on Windows Surface, Edge, and Chrome.
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-4">
        {/* SEO: descriptive alt text for the logo image */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/beri-logo.png`}
          alt={`Beri — student-built AI chatbot for ${SCHOOL_NAME} by BERI Labs`}
          className="h-14 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const sibling = target.nextElementSibling as HTMLElement | null;
            if (sibling) sibling.style.display = "flex";
          }}
        />
        {/* Fallback if no logo image */}
        <div
          className="hidden items-center gap-3"
          style={{ display: "none" }}
        >
          <span style={{ fontSize: 40 }}>🫐</span>
          <span
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--school-text)" }}
          >
            Beri
          </span>
        </div>
      </div>

      {/* Welcome message */}
      <div className="max-w-lg text-center mb-8">
        {/* SEO: single H1 that is clear and keyword-relevant */}
        <h1
          className="text-2xl font-semibold mb-3"
          style={{ color: "var(--school-text)" }}
        >
          Hi, I&apos;m Beri
        </h1>

        {/* SEO/GEO: intro paragraph explains what BERI is with natural keywords for AI engines */}
        <p
          className="leading-relaxed mb-3"
          style={{ color: "var(--school-text-soft)", fontSize: "16px" }}
        >
          Your AI guide to {SCHOOL_NAME} — ask me anything about admissions,
          fees, the curriculum, sport, or school life.
        </p>

        {/* GEO: "What is Beri?" paragraph optimised for AI summaries and answer boxes */}
        <p
          className="leading-relaxed"
          style={{ color: "var(--school-text-soft)", fontSize: "13.8px" }}
        >
          Beri is a student-built AI tool created by{" "}
          <a
            href="https://beri-labs.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--school-accent)", textDecoration: "underline" }}
          >
            BERI Labs
          </a>
          {" "}— a student-led AI education framework that builds bespoke AI
          tools for schools. It uses retrieval-augmented generation to deliver
          cited, accurate answers from the school knowledge base.
        </p>
      </div>

      {/* Featured question — full-width bar */}
      <button
        onClick={() => onQuestion(FEATURED_QUESTION)}
        className="max-w-2xl w-full mb-3 px-4 py-3 rounded-lg text-sm font-medium text-white text-center"
        style={{
          background: "var(--school-accent)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--school-accent-hover)";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 12px var(--school-shadow)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--school-accent)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {FEATURED_QUESTION}
      </button>

      {/* Starter questions — 2-column × 4-row grid */}
      <div
        className="grid grid-cols-2 gap-2 max-w-2xl w-full mb-10"
        aria-label="Suggested questions"
      >
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onQuestion(q)}
            className="starter-chip px-4 py-3 rounded-lg text-sm text-left bg-transparent"
            style={{
              color: "var(--school-accent-hover)",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Bottom padding to clear the floating input bar */}
      <div className="pb-28" />
    </div>
  );
}
