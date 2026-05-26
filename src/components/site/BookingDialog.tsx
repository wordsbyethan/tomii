import type { ReactNode } from "react";
import { CalendarHeart } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/business";

type BookingDialogProps = {
  category: string;
  serviceOptions: string[];
  defaultService?: string;
  trigger?: ReactNode;
};

/**
 * Despite the legacy name, this no longer opens a form dialog.
 * Clicking the trigger opens WhatsApp directly with a prefilled message,
 * matching the user's request: "book → WhatsApp directly".
 */
export function BookingDialog({
  category,
  serviceOptions,
  defaultService,
  trigger,
}: BookingDialogProps) {
  const service = defaultService ?? serviceOptions[0] ?? "an appointment";
  const message = [
    `Hello ${BUSINESS.shortName}, I'd like to book an appointment.`,
    ``,
    `• Service: ${service}`,
    `• Category: ${category}`,
    ``,
    `Please let me know the next available slot. Thank you!`,
  ].join("\n");
  const href = waLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Book ${service} on WhatsApp`}
    >
      {trigger ?? (
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5">
          <CalendarHeart className="h-4 w-4" />
          Book Your Service
        </span>
      )}
    </a>
  );
}
