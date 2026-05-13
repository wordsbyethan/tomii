import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, X, Sparkles } from "lucide-react";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with Tomi assistant"}
        className="group fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-gold py-2.5 pl-3 pr-4 text-ink shadow-gold transition-transform hover:scale-105"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink/10">
          {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          {!open && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/70 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-ink" />
            </span>
          )}
        </span>
        {!open && (
          <span className="text-sm font-semibold tracking-tight">Ask Tomi</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-44 right-6 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-luxe sm:h-[32rem]">
          <header className="flex items-center gap-3 border-b border-border/60 bg-gradient-ink px-4 py-3 text-background">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-ink shadow-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Tomi Concierge</p>
              <p className="text-[11px] text-background/70">Ask about services, prices or booking</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-background/70 hover:text-background"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3 text-sm text-foreground">
                <p>
                  Hi love 💛 I&apos;m Tomi&apos;s concierge. Ask me about prices, services or how to
                  book a glow-up.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "How much for knotless braids?",
                    "Do you offer bridal makeup?",
                    "How do I pay deposit?",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setInput(s)}
                      className="rounded-full border border-border bg-background px-3 py-1 text-[11px] text-foreground/80 transition-colors hover:border-gold hover:text-gold"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      isUser
                        ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-gradient-gold px-3.5 py-2 text-sm text-ink shadow-gold"
                        : "max-w-[90%] whitespace-pre-wrap text-sm leading-relaxed text-foreground"
                    }
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" />
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error.message || "Something went wrong. Please try again."}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-border/60 bg-background px-3 py-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSubmit(e as unknown as React.FormEvent);
                }
              }}
              rows={1}
              maxLength={500}
              placeholder="Type your message…"
              className="max-h-32 flex-1 resize-none rounded-2xl border border-border bg-card px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-ink shadow-gold transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}