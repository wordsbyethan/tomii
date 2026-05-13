import cleanse from "@/assets/step-cleanse.jpg";
import nourish from "@/assets/step-nourish.jpg";
import treat from "@/assets/step-treat.jpg";
import glow from "@/assets/step-glow.jpg";

const steps = [
  { n: "01", title: "Cleanse", img: cleanse, desc: "Gentle purification to reveal fresh skin." },
  { n: "02", title: "Nourish", img: nourish, desc: "Botanical oils restore the moisture barrier." },
  { n: "03", title: "Treat", img: treat, desc: "Targeted serums and aloe-rich actives." },
  { n: "04", title: "Glow", img: glow, desc: "A radiant finish that lasts all day." },
];

export function Steps() {
  return (
    <section className="bg-gradient-blush/40 px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Your Ritual</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
            4 Steps for Your <span className="italic text-gradient-gold">Skin Care</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A signature four-step ritual designed by our specialists for visibly
            healthier, luminous skin.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="relative mx-auto h-44 w-44">
                <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-20 blur-xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-card shadow-luxe">
                  <img
                    src={s.img}
                    alt={s.title}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="absolute -top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-xs font-semibold text-ink shadow-gold">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl uppercase tracking-[0.2em] text-foreground">
                {s.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[14rem] text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
