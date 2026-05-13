import { useState, type ReactNode } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarHeart, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const WHATSAPP_NUMBER = BUSINESS.whatsapp;

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  date: z.string().trim().min(1, "Pick a preferred date").max(20),
  time: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

type BookingDialogProps = {
  category: string;
  serviceOptions: string[];
  defaultService?: string;
  trigger?: ReactNode;
};

export function BookingDialog({
  category,
  serviceOptions,
  defaultService,
  trigger,
}: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(defaultService ?? serviceOptions[0] ?? "");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = bookingSchema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      date: fd.get("date"),
      time: fd.get("time"),
      service,
      category,
      notes: fd.get("notes"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    const d = parsed.data;
    const lines = [
      `Hello Tomi Beauty & Spa, I'd like to book an appointment.`,
      ``,
      `• Service: ${d.service}`,
      `• Category: ${d.category}`,
      `• Name: ${d.name}`,
      `• Phone: ${d.phone}`,
      `• Preferred date: ${d.date}${d.time ? ` at ${d.time}` : ""}`,
      d.notes ? `• Notes: ${d.notes}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <CalendarHeart className="h-4 w-4" />
            Book Your Service
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl border-border/60 bg-card p-0 sm:rounded-3xl">
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-ink px-7 py-6 text-background">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-gold opacity-30 blur-2xl" />
          <DialogHeader className="relative">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              {category}
            </span>
            <DialogTitle className="font-display text-2xl text-background">
              Reserve Your <span className="italic text-gradient-gold">Ritual</span>
            </DialogTitle>
            <DialogDescription className="text-background/70">
              Confirm your details — we'll send the request straight to our team on WhatsApp.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 px-7 py-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
              Selected service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
            >
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
                Full name
              </label>
              <input
                name="name"
                required
                maxLength={80}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
                Phone
              </label>
              <input
                name="phone"
                required
                maxLength={20}
                placeholder="+234 800 000 0000"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
                Preferred date
              </label>
              <input
                name="date"
                type="date"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
                Preferred time
              </label>
              <input
                name="time"
                type="time"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              maxLength={500}
              placeholder="Anything we should know?"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Send Booking via WhatsApp
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            Your details are only used to confirm your appointment.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}