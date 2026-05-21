import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { PayDepositDialog } from "@/components/site/PayDepositDialog";
import { BookingDialog } from "@/components/site/BookingDialog";
import { Input } from "@/components/ui/input";
import {
  Scissors,
  User,
  Hand,
  Eye,
  Sparkles,
  Brush,
  ArrowRight,
  Search,
  CalendarHeart,
  Smile,
  Wallet,
} from "lucide-react";
import braidsImg from "@/assets/cat-braids.jpg";
import stylingImg from "@/assets/cat-styling.jpg";
import barberImg from "@/assets/cat-barber.jpg";
import nailsImg from "@/assets/cat-nails.jpg";
import lashesImg from "@/assets/cat-lashes.jpg";
import facialImg from "@/assets/cat-facial.jpg";
import makeupImg from "@/assets/cat-makeup.jpg";
import teethImg from "@/assets/cat-teeth.jpg";

export const Route = createFileRoute("/prices")({
  component: PricesPage,
  head: () => ({
    meta: [
      { title: "Price List — Tomi Beauty Hub & Spa" },
      {
        name: "description",
        content:
          "Search transparent prices for hair, barbing, nails, lashes, brows, facials, waxing and makeup at Tomi Beauty Hub & Spa, Arepo, Ogun State.",
      },
      { property: "og:title", content: "Price List — Tomi Beauty Hub & Spa" },
      {
        property: "og:description",
        content:
          "Honest, all-inclusive pricing for every service at Tomi Beauty Hub & Spa.",
      },
    ],
  }),
});

type PriceItem = { name: string; price: string; note?: string };
type PriceCategory = {
  id: string;
  shortLabel: string;
  title: string;
  tagline: string;
  icon: typeof Scissors;
  image: string;
  items: PriceItem[];
  note?: string;
};

const naira = (n: number | string) =>
  typeof n === "number" ? `₦${n.toLocaleString("en-NG")}` : `₦${n}`;

const CATEGORIES: PriceCategory[] = [
  {
    id: "hair-braids",
    shortLabel: "Braids",
    title: "Salon — Braids & Natural Hair",
    tagline: "Knotless, boho, twists and Ghana weaving in every size.",
    icon: Scissors,
    image: braidsImg,
    items: [
      { name: "Wash", price: naira(3000) },
      { name: "Retouching", price: naira(4000) },
      { name: "Natural Twist", price: naira(8000) },
      { name: "Natural Hair Cornrow (Big)", price: naira(3000) },
      { name: "Natural Hair Cornrow (Medium)", price: naira(4000) },
      { name: "Natural Hair Cornrow (Small)", price: naira(5000) },
      { name: "Boho Braids (Big)", price: naira(15000) },
      { name: "Boho Braids (Medium)", price: naira(18000) },
      { name: "Boho Braids (Small)", price: naira(22000) },
      { name: "Micro Twist (Midi)", price: naira(30000) },
      { name: "Micro Twist (Mini)", price: naira(40000) },
      { name: "Knotless (Big)", price: naira(15000) },
      { name: "Knotless (Medium)", price: naira(18000) },
      { name: "Knotless (Small)", price: naira(22000) },
      { name: "Ghana Weaving (Big)", price: naira(14000) },
      { name: "Ghana Weaving (Medium)", price: naira(17000) },
      { name: "Ghana Weaving (Small)", price: naira(20000) },
    ],
  },
  {
    id: "hair-styling",
    shortLabel: "Wigs & Styling",
    title: "Salon — Wigs, Frontals & Styling",
    tagline: "Installations, washing, setting and relaxing.",
    icon: Brush,
    image: stylingImg,
    items: [
      { name: "Washing & Setting", price: naira(8000) },
      { name: "Relaxing & Setting", price: naira(10000) },
      { name: "4 by 4 Installation", price: naira(15000) },
      { name: "Frontal Installation", price: naira(20000) },
      { name: "360° Installation", price: naira(35000) },
    ],
  },
  {
    id: "barbershop",
    shortLabel: "Barbershop",
    title: "Barbershop",
    tagline: "Classic cuts, tints, dreadlocks and grooming for everyone.",
    icon: User,
    image: barberImg,
    items: [
      { name: "Men's Haircut", price: naira(4000) },
      { name: "Children's Haircut", price: naira(2000) },
      { name: "Babies Barbing (New)", price: naira(5000) },
      { name: "Women's Haircut", price: naira(6000) },
      { name: "Shaving", price: naira(2000) },
      { name: "Barbing & Black Tinting", price: naira(6000) },
      { name: "Barbing & Relaxing", price: naira(7000) },
      { name: "Barbing & Steaming", price: naira(8000) },
      { name: "Washing & Massaging", price: naira(8000) },
      { name: "White Tint", price: naira(12000) },
      { name: "Colour Shaving", price: naira(12000) },
      { name: "Relocking", price: naira(10000) },
      { name: "Relocking & Styling", price: naira(12000) },
      { name: "Dreadlock Fixing", price: naira(15000) },
    ],
  },
  {
    id: "nails",
    shortLabel: "Nails & Feet",
    title: "Nails & Feet",
    tagline: "Acrylics, gel, BIAB and indulgent pedicures.",
    icon: Hand,
    image: nailsImg,
    items: [
      { name: "Nail Dissolving", price: naira(3000) },
      { name: "Fixing with Gel", price: naira(8000) },
      { name: "Fixing with Gel & Design", price: `${naira(12000)}+` },
      { name: "Acrylic Fixing (All Toes)", price: naira(10000) },
      { name: "BIAB", price: `${naira(10000)}+` },
      { name: "Plain Acrylic Nails", price: `${naira(14000)}+` },
      { name: "Short Acrylic Nails (with design)", price: `${naira(12000)}+` },
      { name: "Medium Acrylic Nails (with design)", price: `${naira(15000)}+` },
      { name: "Long Acrylic Nails (with design)", price: `${naira(18000)}+` },
      { name: "Classic Pedicure", price: naira(10000) },
      { name: "Jelly Pedicure", price: naira(15000) },
      { name: "Hot Stone Pedicure", price: naira(15000) },
      { name: "Royal Pedicure", price: naira(20000) },
      { name: "Paraffin Pedicure", price: naira(20000) },
      { name: "Detox Pedicure", price: naira(25000) },
    ],
    note: "Every pedicure includes a complimentary 20-minute back massage.",
  },
  {
    id: "lashes-brows",
    shortLabel: "Lashes & Brows",
    title: "Lash Extensions & Brows",
    tagline: "Featherlight lashes and signature semi-permanent brows.",
    icon: Eye,
    image: lashesImg,
    items: [
      { name: "Cat Eye / Wispy", price: naira(2000) },
      { name: "Cluster Classic", price: naira(10000) },
      { name: "Cluster Hybrid", price: naira(12000) },
      { name: "Cluster Volume", price: naira(14000) },
      { name: "Classic Lashes", price: naira(14000) },
      { name: "Hybrid Lashes", price: naira(17000) },
      { name: "Volume Lashes", price: naira(20000) },
      { name: "Mega Volume", price: naira(24000) },
      { name: "Ombré Brows", price: naira(30000) },
      { name: "Powder Brows", price: naira(35000) },
      { name: "Microblading", price: naira(40000) },
      { name: "Combination Brows", price: naira(40000) },
    ],
  },
  {
    id: "facials-waxing",
    shortLabel: "Facials & Waxing",
    title: "Facials & Waxing",
    tagline: "Deep cleansing, glow-boosting facials and smooth waxing.",
    icon: Sparkles,
    image: facialImg,
    items: [
      { name: "Classic Facial", price: naira(15000) },
      { name: "Hydrating Facial", price: naira(15000) },
      { name: "Anti-Aging Facial", price: naira(20000) },
      { name: "Deep Cleansing (Gentlemen)", price: naira(25000) },
      { name: "Micro-needling Facial", price: naira(60000) },
      { name: "Under Arm Wax", price: naira(7000) },
      { name: "Chin Wax", price: naira(7000) },
      { name: "Brazilian Wax", price: naira(15000) },
      { name: "Hollywood Wax", price: naira(20000) },
      { name: "Full Body Wax", price: naira(40000) },
    ],
  },
  {
    id: "makeup-body",
    shortLabel: "Makeup & Body",
    title: "Makeup & Body",
    tagline: "Bridal beats, gele artistry and body contouring.",
    icon: Brush,
    image: makeupImg,
    items: [
      { name: "Gele (Tie Only)", price: naira(5000) },
      { name: "Makeup without Gele", price: naira(15000) },
      { name: "Makeup with Gele", price: naira(20000) },
      { name: "Bridal Makeup", price: naira(80000) },
      {
        name: "Lipolysis (per vial)",
        price: naira(50000),
        note: "Under arms, tummy, thighs, etc.",
      },
    ],
  },
  {
    id: "teeth-care",
    shortLabel: "Teeth Care",
    title: "Teeth Scaling & Whitening",
    tagline: "Professional teeth cleaning and whitening for a brighter smile.",
    icon: Smile,
    image: teethImg,
    items: [
      { name: "Teeth Scaling", price: naira(30000) },
      { name: "Teeth Whitening", price: naira(30000) },
      { name: "Scaling + Whitening Combo", price: naira(55000) },
    ],
  },
];

function PricesPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const normalized = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalized) return CATEGORIES;
    return CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter(
        (i) =>
          i.name.toLowerCase().includes(normalized) ||
          c.title.toLowerCase().includes(normalized) ||
          c.shortLabel.toLowerCase().includes(normalized),
      ),
    })).filter((c) => c.items.length > 0);
  }, [normalized]);

  // Track active section on scroll for tab highlight
  useEffect(() => {
    if (normalized) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [normalized, filtered.length]);

  const scrollToCategory = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <main className="pt-28 pb-24">
        <section className="px-6 lg:px-10">
          <div className="mx-auto max-w-5xl text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              Transparent Pricing
            </span>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
              Our <span className="italic text-gradient-gold">Price List</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
              Honest, all-inclusive prices for every service at Tomi Beauty
              Hub &amp; Spa. A 50% deposit secures your appointment.
            </p>
            <span className="mt-6 inline-block gold-divider" />

            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services e.g. knotless, pedicure, facial…"
                  className="h-12 rounded-full border-border/70 bg-card pl-11 pr-4 text-sm shadow-soft focus-visible:border-gold focus-visible:ring-gold/30"
                  aria-label="Search services"
                />
              </div>
              {normalized && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {filtered.reduce((n, c) => n + c.items.length, 0)} matches for
                  &ldquo;{query}&rdquo;.{" "}
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    Clear
                  </button>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Sticky category tabs */}
        <div className="sticky top-[72px] z-30 mt-8 border-y border-border/60 bg-background/85 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-3 lg:px-10">
            <nav
              className="flex gap-2 overflow-x-auto py-3 scrollbar-none"
              aria-label="Service categories"
            >
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = activeId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => scrollToCategory(c.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                      active
                        ? "border-gold bg-gold text-ink shadow-gold"
                        : "border-border bg-card text-foreground/70 hover:border-gold hover:text-gold"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {c.shortLabel}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <section className="mt-10 px-6 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
                No services match &ldquo;{query}&rdquo;. Try a different search.
              </p>
            )}
            {filtered.map((cat) => {
              const Icon = cat.icon;
              const serviceNames = cat.items.map((i) => i.name);
              return (
                <article
                  key={cat.id}
                  id={cat.id}
                  ref={(el) => {
                    sectionRefs.current[cat.id] = el;
                  }}
                  className="scroll-mt-40 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-soft"
                >
                  <div className="grid md:grid-cols-[260px_1fr]">
                    <div className="relative h-44 md:h-full">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent md:bg-gradient-to-r md:from-card md:via-card/30 md:to-transparent" />
                    </div>
                    <div className="p-6 md:p-8">
                      <header className="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold shadow-gold">
                            <Icon className="h-5 w-5 text-ink" />
                          </span>
                          <div>
                            <h2 className="font-display text-2xl text-foreground md:text-[1.65rem]">
                              {cat.title}
                            </h2>
                            <p className="mt-1 text-sm italic text-muted-foreground">
                              {cat.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <BookingDialog
                            category={cat.title}
                            serviceOptions={serviceNames}
                            trigger={
                              <button
                                type="button"
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
                              >
                                <CalendarHeart className="h-3.5 w-3.5" />
                                Book
                              </button>
                            }
                          />
                          <PayDepositDialog
                            category={cat.title}
                            service={cat.items[0]?.name}
                            trigger={
                              <button
                                type="button"
                                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gold/60 px-4 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
                              >
                                Pay deposit <ArrowRight className="h-3 w-3" />
                              </button>
                            }
                          />
                        </div>
                      </header>

                      {cat.note && (
                        <p className="mt-5 inline-flex rounded-full bg-blush/40 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-foreground/70">
                          ✦ {cat.note}
                        </p>
                      )}

                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {cat.items.map((item) => (
                          <li
                            key={item.name}
                            className="group flex flex-col gap-3 rounded-xl border border-border/40 bg-background px-4 py-3 transition-colors hover:border-gold/60 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-foreground break-words">
                                {item.name}
                              </div>
                              {item.note && (
                                <div className="mt-0.5 text-[11px] text-muted-foreground">
                                  {item.note}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between gap-2 sm:justify-end">
                              <span className="shrink-0 font-display text-base text-gradient-gold whitespace-nowrap">
                                {item.price}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <BookingDialog
                                  category={cat.title}
                                  serviceOptions={serviceNames}
                                  defaultService={item.name}
                                  trigger={
                                    <button
                                      type="button"
                                      aria-label={`Book ${item.name}`}
                                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                                    >
                                      <CalendarHeart className="h-3.5 w-3.5" />
                                    </button>
                                  }
                                />
                                <PayDepositDialog
                                  category={cat.title}
                                  service={item.name}
                                  trigger={
                                    <button
                                      type="button"
                                      aria-label={`Pay deposit for ${item.name}`}
                                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-ink"
                                    >
                                      <Wallet className="h-3.5 w-3.5" />
                                    </button>
                                  }
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-20 px-6 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-ink p-10 text-center text-background shadow-luxe md:p-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              Ready When You Are
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Reserve your <span className="italic text-gradient-gold">slot</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-background/70">
              Pay a 50% deposit to confirm your booking — the balance is settled
              in studio.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Browse services
              </Link>
              <PayDepositDialog />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}