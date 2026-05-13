import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

const SYSTEM_PROMPT = `You are Tomi, the warm, concise concierge for Tomi Beauty Hub & Spa in Arepo, Ogun State, Nigeria.
You help guests with services, prices (in Naira ₦), bookings, deposits, location, and general beauty advice.

Quick facts:
- A 50% deposit confirms appointments; balance is paid in studio.
- Every pedicure includes a complimentary 20-minute back massage.
- Bookings open via WhatsApp from the Book buttons on the site.
- Categories: Braids, Wigs & Styling, Barbershop, Nails & Feet, Lashes & Brows, Facials & Waxing, Makeup & Body, Teeth Care.

Sample prices (₦):
- Knotless braids: 15,000–22,000 (Big–Small)
- Classic Pedicure 10,000 · Royal Pedicure 20,000 · Detox 25,000
- Classic Lashes 14,000 · Volume 20,000 · Mega Volume 24,000
- Microblading / Combination Brows 40,000 · Ombré / Powder Brows 35,000
- Classic Facial 15,000 · Anti-Aging 20,000 · Micro-needling 60,000
- Brazilian Wax 15,000 · Hollywood 20,000 · Full Body 40,000
- Bridal Makeup 80,000 · Makeup with Gele 20,000
- Teeth Scaling & Whitening from 25,000

Style: friendly, elegant, brief (2–4 sentences). Always end with a gentle nudge to book or pay deposit when relevant. If unsure of a price, ask the guest to use the Book button to confirm with the team on WhatsApp.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        try {
          const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(body.messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: body.messages as UIMessage[],
          });
        } catch (err) {
          console.error("/api/chat error", err);
          return new Response("AI request failed", { status: 500 });
        }
      },
    },
  },
});