import { CalendarHeart } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function CTA() {
  return (
    <section id="book" className="px-6 pb-24 lg:px-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-ink p-10 text-primary-foreground shadow-luxe lg:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-gold opacity-25 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-blush opacity-20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Reserve Today</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Ready for Your <span className="italic text-gradient-gold">Glow Up</span>?
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/75">
              Book your appointment and let our specialists craft a ritual just for
              you. Walk-ins welcome — but reservations get the gold treatment.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-gold px-8 py-4 text-base font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
            >
              <CalendarHeart className="h-5 w-5" />
              Book on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="text-sm text-primary-foreground/80 underline-offset-4 hover:underline"
            >
              or call {BUSINESS.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
