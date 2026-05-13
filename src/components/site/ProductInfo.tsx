import productsImg from "@/assets/products-hero.jpg";
import { Leaf } from "lucide-react";

const days = [
  { d: "Day 1", title: "Renewing Cleanse", desc: "Botanical foam lifts impurities without stripping." },
  { d: "Day 2", title: "Hydration Boost", desc: "Hyaluronic-rich serum locks in deep moisture." },
  { d: "Day 3", title: "Radiance Reveal", desc: "Vitamin C complex unveils your natural glow." },
];

export function ProductInfo() {
  return (
    <section className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Ingredients</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
            Product <span className="italic text-gradient-gold">Information</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Formulated with natural ingredients for radiant, healthy skin — clean,
            potent and effective.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-blush opacity-60 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] shadow-luxe">
              <img
                src={productsImg}
                alt="Luxury serum bottles with gold droppers"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            {days.map((d, i) => (
              <div
                key={d.d}
                className={`flex gap-5 rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 ${
                  i === 1 ? "border-gold/40 shadow-gold" : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold">
                  <Leaf className="h-5 w-5 text-ink" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gold">{d.d}</div>
                  <h3 className="mt-1 font-display text-xl text-foreground">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
