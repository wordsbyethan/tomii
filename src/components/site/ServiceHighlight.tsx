import highlightImg from "@/assets/service-highlight.jpg";
import { ArrowRight } from "lucide-react";

export function ServiceHighlight() {
  return (
    <section className="relative -mt-10 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-border/60 bg-card shadow-luxe overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative">
            <img
              src={highlightImg}
              alt="Aromatherapy diffuser with eucalyptus"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-10 lg:p-14">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Introducing</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">
              Premium Beauty Services for You
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Crafted rituals, world-class products and certified hands. Every visit
              is an immersion into calm, confidence and radiant skin.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "98%", l: "Satisfaction" },
                { v: "10+", l: "Specialists" },
                { v: "5+", l: "Years" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-gradient-gold">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#book"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-gold/10"
            >
              Try It Free <ArrowRight className="h-4 w-4 text-gold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
