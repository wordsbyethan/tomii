import { Instagram, MapPin, Music2, Phone, Sparkles } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold shadow-gold">
              <Sparkles className="h-4 w-4 text-ink" />
            </span>
            <span className="font-display text-xl tracking-wide">
              Tomi <span className="text-gradient-gold">Beauty</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A luxury beauty &amp; wellness sanctuary in Arepo, Ogun State. Crafted rituals,
            certified specialists, premium care.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-foreground">
            <Phone className="h-4 w-4 text-gold" /> {BUSINESS.whatsappDisplay}
          </div>
          <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 text-gold" />
            <span>{BUSINESS.location}</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-gold">Services</a></li>
            <li><a href="#book" className="hover:text-gold">Book Appointment</a></li>
            <li><a href="#" className="hover:text-gold">About Us</a></li>
            <li><a href="#" className="hover:text-gold">Gallery</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-foreground">Care</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-gold">Booking Policy</a></li>
            <li><a href="#" className="hover:text-gold">Gift Cards</a></li>
            <li><a href="#" className="hover:text-gold">Memberships</a></li>
            <li><a href="#" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-foreground">Follow Us</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            Daily inspiration, transformations and behind the scenes.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={BUSINESS.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Tomi Beauty on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="Tomi Beauty on TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Tomi Beauty &amp; Spa. All rights reserved.</p>
        <p>Crafted with care on Arepo Road · Ogun State</p>
      </div>
    </footer>
  );
}
