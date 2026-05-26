import type { ReactNode, MouseEvent } from "react";
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
 * Clicking the trigger opens WhatsApp directly with a prefilled message.
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

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(href, "_blank", "noopener,noreferrer");
        }
      }}
      aria-label={`Book ${service} on WhatsApp`}
      className="inline-flex cursor-pointer"
    >
      {trigger ?? (
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5">
          <CalendarHeart className="h-4 w-4" />
          Book Your Service
        </span>
      )}
    </span>
  );
}
