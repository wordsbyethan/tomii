import facial from "@/assets/best-facial.jpg";
import massage from "@/assets/best-massage.jpg";
import pedicure from "@/assets/best-pedicure.jpg";
import teeth from "@/assets/best-teeth.jpg";
import { Star } from "lucide-react";

const items = [
  { img: facial, title: "Signature Facial Treatment", price: "₦35,000 – ₦55,000", rating: 4.9 },
  { img: massage, title: "Full Body Aromatherapy Massage", price: "₦45,000 – ₦70,000", rating: 5.0 },
  { img: teeth, title: "Professional Teeth Whitening", price: "₦60,000", rating: 4.8 },
  { img: pedicure, title: "Luxury Spa Pedicure", price: "₦18,000", rating: 4.9 },
];

export function BestSellers() {
  return (
    <section className="px-6 pb-28 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-border/60 bg-card p-10 shadow-luxe lg:p-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Book Now</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
            Our <span className="italic text-gradient-gold">Best Sellers</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article
              key={it.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-blush">
                <img
                  src={it.img}
                  alt={it.title}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 text-center">
                <h3 className="font-display text-lg text-foreground leading-snug">{it.title}</h3>
                <div className="mt-3 flex items-center justify-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">{it.rating}</span>
                </div>
                <div className="mt-3 font-display text-lg text-gradient-gold">{it.price}</div>
                <a
                  href="#book"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
                >
                  Book Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
