import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Adesuwa O.",
    role: "Lagos",
    quote:
      "Tomi Beauty & Spa is a sanctuary. The signature facial left my skin glowing for weeks — every detail is pure luxury.",
  },
  {
    name: "Chinaza E.",
    role: "Arepo, Ogun",
    quote:
      "From the gold-rimmed décor to the warm welcome, it feels like a five-star ritual. The aromatherapy massage is unmatched.",
  },
  {
    name: "Tomilola B.",
    role: "Ibadan",
    quote:
      "Their attention to detail and premium products keep me coming back. Truly the best spa experience in Nigeria.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-ink px-6 py-28 lg:px-10 text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Kind Words</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-primary-foreground">
            Loved by Our <span className="italic text-gradient-gold">Clients</span>
          </h2>
          <span className="mt-5 inline-block gold-divider" />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-colors hover:border-gold/40"
            >
              <Quote className="h-8 w-8 text-gold" />
              <blockquote className="mt-5 font-display text-lg leading-relaxed text-primary-foreground/90">
                "{r.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-primary-foreground">{r.name}</span>
                <span className="text-primary-foreground/60"> · {r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
