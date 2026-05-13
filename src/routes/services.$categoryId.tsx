import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { BookingDialog } from "@/components/site/BookingDialog";
import { PayDepositDialog } from "@/components/site/PayDepositDialog";
import { ArrowLeft, Sparkles, ShieldCheck, Clock, HeartHandshake } from "lucide-react";
import { CATEGORIES, type Service } from "@/data/services";

export const Route = createFileRoute("/services/$categoryId")({
  component: CategoryDetail,
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.id === params.categoryId);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => {
    const cat = loaderData?.cat;
    return {
      meta: [
        { title: cat ? `${cat.title} — Tomi Beauty Hub & Spa` : "Service — Tomi Beauty" },
        {
          name: "description",
          content: cat?.tagline ?? "Discover our luxury beauty services in Arepo, Ogun State.",
        },
        { property: "og:title", content: cat?.title ?? "Service — Tomi Beauty" },
        { property: "og:description", content: cat?.tagline ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-gold underline">
          Back to all services
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function CategoryDetail() {
  const { cat } = Route.useLoaderData();
  const Icon = cat.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all services
            </Link>

            <div className="mt-8 grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-center">
              <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
                <img
                  src={cat.image}
                  alt={cat.title}
                  width={1280}
                  height={1024}
                  className="h-80 w-full object-cover md:h-[28rem]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground backdrop-blur">
                  {cat.number} · Tomi Beauty
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                  <Icon className="h-3.5 w-3.5 text-gold" /> Signature Category
                </span>
                <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
                  {cat.title}
                </h1>
                <p className="mt-4 text-base text-muted-foreground italic">{cat.tagline}</p>
                {cat.note && (
                  <p className="mt-4 inline-flex rounded-full bg-blush/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground/70">
                    ✦ {cat.note}
                  </p>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Sparkles, label: "Premium products" },
                    { icon: ShieldCheck, label: "Hygiene-certified" },
                    { icon: HeartHandshake, label: "Tailored to you" },
                  ].map(({ icon: I, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs text-foreground"
                    >
                      <I className="h-4 w-4 text-gold" />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <BookingDialog
                    category={cat.title}
                    serviceOptions={cat.items.map((i: Service) => i.name)}
                    defaultService={cat.items[0]?.name}
                  />
                  <PayDepositDialog
                    category={cat.title}
                    service={cat.items[0]?.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">The Menu</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">
                Choose Your <span className="italic text-gradient-gold">Ritual</span>
              </h2>
              <span className="mt-5 inline-block gold-divider" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {cat.items.map((item: Service) => (
                <article
                  key={item.name}
                  className="group rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-luxe"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl text-foreground leading-snug">{item.name}</h3>
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold shadow-gold" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

                  <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-widest text-foreground/60">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3 text-gold" /> 60–90 min</span>
                    <span className="h-3 w-px bg-border" />
                    <span>By appointment</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <BookingDialog
                      category={cat.title}
                      serviceOptions={cat.items.map((i: Service) => i.name)}
                      defaultService={item.name}
                      trigger={
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
                        >
                          Book this service
                        </button>
                      }
                    />
                    <PayDepositDialog
                      category={cat.title}
                      service={item.name}
                      trigger={
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
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

        <section className="mt-24 px-6 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-ink p-12 text-center text-background shadow-luxe md:p-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Sweet Reminder</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              You deserve the <span className="italic text-gradient-gold">gold treatment</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-background/70">
              Reserve your spot today — a 50% deposit secures your appointment, and our team
              will personally guide you through every step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingDialog
                category={cat.title}
                serviceOptions={cat.items.map((i: Service) => i.name)}
                defaultService={cat.items[0]?.name}
              />
              <PayDepositDialog
                category={cat.title}
                service={cat.items[0]?.name}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}