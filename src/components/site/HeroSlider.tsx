import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, CalendarHeart, Sparkle, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroBook from "@/assets/hero-slide-book.jpg";
import heroServices from "@/assets/hero-slide-services.jpg";
import heroPrices from "@/assets/hero-slide-prices.jpg";

type CTA =
  | { label: string; href: string; icon?: React.ComponentType<{ className?: string }>; to?: never }
  | { label: string; to: string; icon?: React.ComponentType<{ className?: string }>; href?: never };

type Slide = {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  desc: string;
  primary: CTA;
  secondary: CTA;
  tertiary?: CTA;
  badge: { title: string; meta: string };
};

const SLIDES: Slide[] = [
  {
    image: heroBook,
    eyebrow: "Luxury Beauty & Spa",
    title: (
      <>
        Bringing Out Your <span className="italic text-gradient-gold">Natural Beauty</span> & Confidence
      </>
    ),
    desc:
      "Experience luxury beauty treatments, advanced skincare and wellness rituals — tailored to perfection by certified specialists on Arepo Road, Ogun State.",
    primary: { label: "Book Appointment", href: "#book", icon: CalendarHeart },
    secondary: { label: "View Services", to: "/services", icon: Sparkle },
    tertiary: { label: "View Prices", to: "/prices", icon: Tag },
    badge: { title: "Signature Glow Ritual", meta: "90 min · From ₦35,000" },
  },
  {
    image: heroServices,
    eyebrow: "Signature Spa Sanctuary",
    title: (
      <>
        A Quiet Escape into <span className="italic text-gradient-gold">Pure Indulgence</span>
      </>
    ),
    desc:
      "Step into our gold-lit sanctuary — marble suites, warm rituals and certified therapists ready to restore your glow from head to toe.",
    primary: { label: "View Services", to: "/services", icon: Sparkle },
    secondary: { label: "Book Appointment", href: "#book", icon: CalendarHeart },
    tertiary: { label: "View Prices", to: "/prices", icon: Tag },
    badge: { title: "Royal Pedicure + Back Massage", meta: "Includes free 20-min massage" },
  },
  {
    image: heroPrices,
    eyebrow: "Transparent Luxury Pricing",
    title: (
      <>
        Editorial <span className="italic text-gradient-gold">Brows, Glow & Glam</span> — Honest Prices
      </>
    ),
    desc:
      "Microblading, ombré brows, hydrating facials and lash extensions — finished by award-trained artists with clear, all-inclusive pricing.",
    primary: { label: "View Prices", to: "/prices", icon: Tag },
    secondary: { label: "Book Appointment", href: "#book", icon: CalendarHeart },
    tertiary: { label: "View Services", to: "/services", icon: Sparkle },
    badge: { title: "Combination Brows", meta: "From ₦45,000 · Lasts 12+ months" },
  },
];

function CTAButton({ cta, variant }: { cta: CTA; variant: "primary" | "secondary" | "tertiary" }) {
  const Icon = cta.icon ?? ArrowRight;
  const cls =
    variant === "primary"
      ? "group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
      : variant === "secondary"
        ? "inline-flex items-center gap-2 rounded-full border border-gold/60 bg-transparent px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-gold/10"
        : "inline-flex items-center gap-2 rounded-full bg-foreground/5 px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/10";
  const inner = (
    <>
      <Icon className="h-4 w-4" />
      {cta.label}
    </>
  );
  if ("to" in cta && cta.to) {
    return (
      <Link to={cta.to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={cta.href} className={cls}>
      {inner}
    </a>
  );
}

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const s = SLIDES[i];

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-blush opacity-60" />
      <div className="absolute -top-40 -left-40 -z-10 h-96 w-96 rounded-full bg-gold-soft blur-3xl opacity-40" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div key={`text-${i}`} className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> {s.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            {s.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {s.desc}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CTAButton cta={s.primary} variant="primary" />
            <CTAButton cta={s.secondary} variant="secondary" />
            {s.tertiary && <CTAButton cta={s.tertiary} variant="tertiary" />}
          </div>

          <div className="mt-10 flex items-center gap-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 bg-gradient-gold shadow-gold" : "w-4 bg-border hover:bg-gold/50"
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {paused ? "Paused" : "Auto"}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-gold opacity-20 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] shadow-luxe">
            <img
              key={`img-${i}`}
              src={s.image}
              alt={s.eyebrow}
              width={1280}
              height={1280}
              className="h-full w-full animate-fade-in object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold">
              <Sparkles className="h-4 w-4 text-ink" />
            </div>
            <div>
              <div className="text-sm font-semibold">{s.badge.title}</div>
              <div className="text-xs text-muted-foreground">{s.badge.meta}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
