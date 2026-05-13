import heroImg from "@/assets/hero-spa.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-blush opacity-60" />
      <div className="absolute -top-40 -left-40 -z-10 h-96 w-96 rounded-full bg-gold-soft blur-3xl opacity-40" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Luxury Beauty &amp; Spa
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            Bringing Out Your{" "}
            <span className="italic text-gradient-gold">Natural Beauty</span> &amp;
            Confidence
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Experience luxury beauty treatments, advanced skincare and wellness
            rituals — tailored to perfection by certified specialists in the heart
            of Arepo, Ogun State.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-transparent px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-gold/10"
            >
              View Services
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="font-display text-3xl text-foreground">5<span className="text-gold">+</span></div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Years Crafted</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-3xl text-foreground">10<span className="text-gold">+</span></div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Specialists</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-3xl text-foreground">98<span className="text-gold">%</span></div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Happy Clients</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-gold opacity-20 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] shadow-luxe">
            <img
              src={heroImg}
              alt="Luxury spa with white towels, gold tray and rose petals"
              width={1280}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold">
              <Sparkles className="h-4 w-4 text-ink" />
            </div>
            <div>
              <div className="text-sm font-semibold">Signature Glow Ritual</div>
              <div className="text-xs text-muted-foreground">90 min · From ₦35,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
