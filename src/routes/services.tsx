import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { BookingDialog } from "@/components/site/BookingDialog";
import { PayDepositDialog } from "@/components/site/PayDepositDialog";
import { CATEGORIES, type Service } from "@/data/services";
import { BUSINESS, waLink } from "@/lib/business";
import {
  Landmark,
  Banknote,
  Wallet,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Service Menu — Tomi Beauty Hub & Spa, Arepo, Ogun State" },
      {
        name: "description",
        content:
          "Explore the full Tomi Beauty Hub & Spa service menu: brow artistry, facials, pedicures, massages, lashes, teeth whitening, piercings and hair styling.",
      },
      { property: "og:title", content: "Service Menu — Tomi Beauty Hub & Spa" },
      {
        property: "og:description",
        content:
          "A complete luxury menu of beauty, skin, body and hair services in Arepo, Ogun State.",
      },
    ],
  }),
});

const categories = CATEGORIES;

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">The Service Menu</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-foreground leading-tight">
              Tomi Beauty Hub <span className="italic text-gradient-gold">& Spa</span>
            </h1>
            <span className="mt-6 inline-block gold-divider" />
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              A curated menu of luxury beauty, skin, body and hair rituals — designed to communicate true value while keeping the experience effortlessly elegant.
            </p>
            <nav className="mt-10 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium text-foreground/80 transition-all hover:border-gold hover:text-gold hover:shadow-gold"
                >
                  {c.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="mt-20 space-y-20 px-6 lg:px-10">
          {categories.map(({ id, number, title, tagline, icon: Icon, items, note, image }) => (
            <section key={id} id={id} className="scroll-mt-28">
              <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-border/60 bg-card p-8 shadow-soft md:p-12 lg:p-16">
                <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
                  <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
                    <img
                      src={image}
                      alt={title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-72 w-full object-cover md:h-96"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground backdrop-blur">
                      {number} · Tomi Beauty
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/40">
                        <Icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
                      </span>
                      <span className="font-display text-4xl text-gradient-gold leading-none">{number}</span>
                    </div>
                    <h2 className="mt-5 font-display text-3xl md:text-4xl text-foreground">{title}</h2>
                    <p className="mt-3 text-sm md:text-base text-muted-foreground italic">{tagline}</p>
                    {note && (
                      <p className="mt-4 inline-flex rounded-full bg-blush/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground/70">
                        {note}
                      </p>
                    )}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <BookingDialog
                        category={title}
                        serviceOptions={items.map((i: Service) => i.name)}
                        defaultService={items[0]?.name}
                      />
                      <PayDepositDialog
                        category={title}
                        service={items[0]?.name}
                      />
                      <Link
                        to="/services/$categoryId"
                        params={{ categoryId: id }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
                      >
                        Discover <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                <span className="mt-8 block h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {items.map((item: Service) => (
                    <article
                      key={item.name}
                      className="group rounded-2xl border border-border/60 bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-luxe"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg text-foreground leading-snug">{item.name}</h3>
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold shadow-gold" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <BookingDialog
                          category={title}
                          serviceOptions={items.map((i: Service) => i.name)}
                          defaultService={item.name}
                          trigger={
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-ink shadow-gold transition-transform hover:-translate-y-0.5"
                            >
                              Book
                            </button>
                          }
                        />
                        <PayDepositDialog
                          category={title}
                          service={item.name}
                          trigger={
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
                            >
                              Pay Deposit
                            </button>
                          }
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section id="payments" className="mt-24 px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Secure Payments</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
                How to <span className="italic text-gradient-gold">Pay</span>
              </h2>
              <span className="mt-5 inline-block gold-divider" />
              <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
                A 50% deposit secures your appointment. Choose the option most convenient for you — confirmation is sent via WhatsApp.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-1 md:max-w-xl md:mx-auto">
              <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-soft flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/40">
                  <Landmark className="h-5 w-5 text-gold" strokeWidth={1.4} />
                </span>
                <h3 className="mt-5 font-display text-xl text-foreground">Bank Transfer</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Direct transfer to our verified business account.
                </p>
                <dl className="mt-5 space-y-2 rounded-2xl bg-background p-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Bank</dt>
                    <dd className="font-medium text-foreground">{BUSINESS.bank.bankName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Account</dt>
                    <dd className="font-medium text-foreground">{BUSINESS.bank.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd className="font-medium text-foreground">{BUSINESS.bank.accountName}</dd>
                  </div>
                </dl>
                <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/70">
                  <ShieldCheck className="h-4 w-4 text-gold" /> 100% Secure
                </p>
                <div className="mt-5">
                  <PayDepositDialog defaultMethod="transfer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 px-6 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-ink p-12 text-center text-background shadow-luxe md:p-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Reserve Your Experience</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Ready for your <span className="italic text-gradient-gold">luxury ritual?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-background/70">
              Our team will help you choose the perfect service. Booking takes less than a minute.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                hash="book"
                className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-7 py-3 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
              >
                Book an Appointment
              </Link>
              <a
                href={waLink(`Hi ${BUSINESS.shortName}, I'd like to chat about a booking.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-background/30 px-7 py-3 text-sm font-medium text-background transition-colors hover:border-gold hover:text-gold"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
