import { Link } from "@tanstack/react-router";
import { Scissors, Sparkles, Footprints, Flower2, HeartPulse, Smile } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Brow Artistry", desc: "Microblading, ombré and powder brow techniques.", to: "brows" },
  { icon: Flower2, title: "Facial Treatments", desc: "Cleansing, hydrating and anti-aging facials.", to: "facials" },
  { icon: Footprints, title: "Pedicures & Foot Care", desc: "Royal, jelly and detox pedicures with free back massage.", to: "pedicures" },
  { icon: HeartPulse, title: "Body & Massage", desc: "Hot stone, deep tissue and reflexology therapy.", to: "massage" },
  { icon: Smile, title: "Lash · Teeth · Piercing", desc: "Editorial lashes, whitening and piercings.", to: "additional" },
  { icon: Scissors, title: "Hair Styling", desc: "Wig installs, braids, locks and hair tinting.", to: "hair" },
] as const;

export function Services() {
  return (
    <section id="services" className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">What We Offer</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
            Curated <span className="italic text-gradient-gold">Services</span>
          </h2>
          <span className="mt-5 inline-block gold-divider" />
          <p className="mt-5 text-muted-foreground">
            A complete menu of beauty and wellness, delivered with the precision and
            warmth you deserve.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, to }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-soft opacity-0 blur-2xl transition-opacity group-hover:opacity-60" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gradient-gold/0 transition-colors group-hover:border-gold">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="relative mt-6 font-display text-xl text-foreground">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <Link
                to="/services/$categoryId"
                params={{ categoryId: to }}
                className="relative mt-6 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-gold transition-colors hover:text-foreground"
              >
                Discover <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
