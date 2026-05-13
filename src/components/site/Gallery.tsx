import facial from "@/assets/best-facial.jpg";
import massage from "@/assets/best-massage.jpg";
import pedicure from "@/assets/best-pedicure.jpg";
import teeth from "@/assets/best-teeth.jpg";
import glow from "@/assets/step-glow.jpg";
import diffuser from "@/assets/service-highlight.jpg";

const shots = [
  { src: facial, label: "Facial Care" },
  { src: glow, label: "Radiant Glow" },
  { src: massage, label: "Massage Studio" },
  { src: diffuser, label: "Aroma Suite" },
  { src: pedicure, label: "Mani · Pedi" },
  { src: teeth, label: "Bright Smile" },
];

export function Gallery() {
  return (
    <section className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Before &amp; After</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
            A Glimpse Inside Our <span className="italic text-gradient-gold">Studio</span>
          </h2>
        </div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {shots.map((s, i) => (
            <div
              key={s.label}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${
                i === 0 ? "row-span-2" : ""
              } ${i === 3 ? "md:row-span-2" : ""}`}
            >
              <img
                src={s.src}
                alt={s.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
