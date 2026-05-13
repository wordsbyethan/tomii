import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import banner from "@/assets/welcome-banner.jpg";
import { BUSINESS, waLink } from "@/lib/business";

const STORAGE_KEY = "tomi-welcome-seen";

export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-[2rem] border-gold/30 bg-card p-0 sm:rounded-[2rem]">
        <div className="grid md:grid-cols-2">
          <div className="relative hidden md:block">
            <img
              src={banner}
              alt="Welcome to Tomi Beauty Hub & Spa"
              width={1280}
              height={896}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>

          <div className="relative px-7 py-8 md:px-9 md:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/70">
              <Sparkles className="h-3 w-3 text-gold" /> A Warm Welcome
            </div>

            <h2 className="mt-5 font-display text-3xl leading-tight text-foreground md:text-4xl">
              Welcome to <span className="italic text-gradient-gold">{BUSINESS.shortName}</span> — where you are the ritual.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We're so glad you're here. Step into a world of golden touches, expert
              hands and cutting-edge beauty. Your glow story begins today — and we'd
              love to be part of it.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold" />
                Enjoy <strong>10% off</strong> your first booking this week
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold" />
                Free 20-min back massage with every premium pedicure
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold" />
                Personal concierge — chat us anytime on WhatsApp
              </li>
            </ul>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link
                to="/services"
                onClick={close}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink(`Hi ${BUSINESS.shortName}, I'd like to learn more about your services.`)}
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-ink"
              >
                <MessageCircle className="h-4 w-4" />
                Chat with Us
              </a>
            </div>

            <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
              ✦ {BUSINESS.location} ✦
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}