"use client";

import { SCHOOL_NAME, LOGO_PATH, FEATURED_QUESTION, SUGGESTED_QUESTIONS } from "../lib/school-config";

interface WelcomeScreenProps {
  onQuestion: (q: string) => void;
}

export function WelcomeScreen({ onQuestion }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${LOGO_PATH}`}
          alt={`${SCHOOL_NAME} logo`}
          className="h-20 w-20 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const sibling = target.nextElementSibling as HTMLElement | null;
            if (sibling) sibling.style.display = "flex";
          }}
        />
        {/* Fallback if no logo image */}
        <div
          className="hidden w-20 h-20 rounded-full items-center justify-center text-2xl font-bold text-white"
          style={{ display: "none", background: "var(--school-accent)" }}
        >
          B
        </div>
      </div>

      {/* Welcome message */}
      <div className="max-w-lg text-center mb-8">
        <h1
          className="text-2xl font-semibold mb-3"
          style={{ color: "var(--school-text)" }}
        >
          Welcome to {SCHOOL_NAME}
        </h1>

        <p
          className="leading-relaxed mb-3"
          style={{ color: "var(--school-text-soft)", fontSize: "16px" }}
        >
          Your AI guide to {SCHOOL_NAME} — ask me anything about admissions,
          fees, the curriculum, sport, or school life.
        </p>

        <p
          className="leading-relaxed"
          style={{ color: "var(--school-text-soft)", fontSize: "13.8px" }}
        >
          Beri is a student-built AI tool created by{" "}
          <a
            href="https://beri-labs.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--school-primary)", fontWeight: 600 }}
          >
            BERI Labs
          </a>{" "}
          — a student-led AI education framework that builds bespoke AI tools
          for schools. It uses retrieval-augmented generation to deliver cited,
          accurate answers from the school knowledge base.
        </p>
      </div>

      {/* Featured question */}
      <button
        onClick={() => onQuestion(FEATURED_QUESTION)}
        className="starter-chip w-full max-w-2xl px-4 py-3 rounded-lg text-sm text-center mb-3 font-medium"
        style={{
          color: "#ffffff",
          background: "#e5554f",
          border: "none",
        }}
      >
        {FEATURED_QUESTION}
      </button>

      {/* Starter questions */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full mb-10"
        aria-label="Suggested questions"
      >
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onQuestion(q)}
            className="starter-chip px-4 py-3 rounded-lg text-sm text-left bg-transparent border"
            style={{
              color: "var(--school-primary)",
              borderColor: "var(--school-border)",
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
