"use client";

import { useEffect, useRef, useState } from "react";
import { Send, AlertCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "What did you build on the WayBack project?",
  "How do you approach LLM integration?",
  "What's your experience with the creator economy?",
  "Why did you choose Wirtschaftsinformatik?",
];

export default function InterviewMe() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [waitingFirstToken, setWaitingFirstToken] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function send(query: string) {
    const trimmed = query.trim();
    if (!trimmed || streaming) return;

    setError(null);
    setInput("");
    setMessages((m) => [
      ...m,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ]);
    setStreaming(true);
    setWaitingFirstToken(true);

    try {
      const res = await fetch("/api/interview-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (firstChunk) {
          setWaitingFirstToken(false);
          firstChunk = false;
        }
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            next[next.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return next;
        });
      }
    } catch (e) {
      console.error("[InterviewMe] stream failed:", e);
      setMessages((m) => {
        const next = [...m];
        if (
          next.length &&
          next[next.length - 1].role === "assistant" &&
          next[next.length - 1].content === ""
        ) {
          next.pop();
        }
        return next;
      });
      setError("Something went wrong.");
    } finally {
      setStreaming(false);
      setWaitingFirstToken(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function handleStarter(q: string) {
    setInput(q);
    textareaRef.current?.focus();
  }

  return (
    <section id="interview" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--mute)] mb-6 md:mb-8">
            <span aria-hidden="true">– </span>INTERVIEW ME<span aria-hidden="true"> –</span>
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.1] tracking-tight max-w-3xl">
            Curious about something
            <br />I haven&apos;t covered?
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/70 max-w-2xl leading-relaxed mt-6">
            Ask. I&apos;ve trained a model on my background to answer — in my
            voice, with my reasoning. Try it like a 5-minute screening call.
          </p>
        </header>

        <div className="max-w-3xl">
          {messages.length === 0 && (
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--mute)] mb-4">
                — TRY ASKING —
              </p>
              <div className="flex flex-wrap gap-2">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleStarter(q)}
                    className="font-sans text-sm text-[var(--ink)]/80 border border-[var(--mute)]/30 px-3 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div
              ref={scrollRef}
              className="max-h-[480px] overflow-y-auto mb-6 pr-2 space-y-6"
              aria-live="polite"
            >
              {messages.map((m, i) => {
                if (m.role === "user") {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="bg-[var(--ink)]/[0.04] border border-[var(--ink)]/[0.06] px-4 py-3 max-w-[85%]">
                        <p className="font-sans text-sm md:text-base text-[var(--ink)] leading-relaxed whitespace-pre-wrap">
                          {m.content}
                        </p>
                      </div>
                    </div>
                  );
                }
                const isLast = i === messages.length - 1;
                const showWaiting =
                  isLast && waitingFirstToken && m.content === "";
                return (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[90%]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-small)] mb-2">
                        — HAICHEN —
                      </p>
                      {showWaiting ? (
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mute)]">
                          thinking
                          <span className="inline-block animate-pulse">…</span>
                        </p>
                      ) : (
                        <p className="font-sans text-sm md:text-base text-[var(--ink)]/85 leading-relaxed whitespace-pre-wrap">
                          {m.content}
                          {isLast && streaming && (
                            <span className="inline-block w-[0.5ch] -mb-0.5 ml-0.5 bg-[var(--accent)] animate-pulse h-[1em] align-text-bottom" />
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 py-2"
            >
              <AlertCircle
                className="text-[var(--accent)] flex-shrink-0 mt-0.5"
                size={16}
                aria-hidden="true"
              />
              <p className="font-sans text-sm text-[var(--ink)]/80 leading-relaxed">
                Something went wrong. You can reach me directly at{" "}
                <a
                  href="mailto:haic.duan@gmail.com"
                  className="text-[var(--accent-small)] underline underline-offset-4 hover:opacity-80"
                >
                  haic.duan@gmail.com
                </a>
                .
              </p>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border border-[var(--mute)]/30 focus-within:border-[var(--accent)] transition-colors p-2 bg-[var(--base)]"
          >
            <label htmlFor="interview-input" className="sr-only">
              Ask Haichen a question
            </label>
            <textarea
              id="interview-input"
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={streaming}
              placeholder="Ask anything…"
              rows={1}
              maxLength={500}
              className="flex-1 resize-none bg-transparent font-sans text-sm md:text-base text-[var(--ink)] placeholder:text-[var(--mute)]/70 focus:outline-none px-2 py-2 min-h-[40px] max-h-[160px] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send question"
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 bg-[var(--ink)] text-[var(--base)] hover:bg-[var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--ink)]"
            >
              <Send size={16} aria-hidden="true" />
            </button>
          </form>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)] mt-4">
            Liked what I said? Reach out at{" "}
            <a
              href="mailto:haic.duan@gmail.com"
              className="text-[var(--accent-small)] hover:opacity-80 normal-case tracking-normal"
            >
              haic.duan@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
