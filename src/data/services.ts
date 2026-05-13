import {
  Sparkles,
  Flower2,
  Footprints,
  HeartPulse,
  Smile,
  Scissors,
} from "lucide-react";
import catBrows from "@/assets/cat-brows.jpg";
import catFacials from "@/assets/cat-facials.jpg";
import catPedicures from "@/assets/cat-pedicures.jpg";
import catMassage from "@/assets/cat-massage.jpg";
import catAdditional from "@/assets/cat-additional.jpg";
import catHair from "@/assets/cat-hair.jpg";

export type Service = { name: string; desc: string };
export type Category = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: typeof Sparkles;
  items: Service[];
  note?: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "brows",
    number: "01",
    title: "Professional Brow Artistry",
    tagline: "Choose the technique that fits your style and needs.",
    icon: Sparkles,
    image: catBrows,
    items: [
      { name: "Microblading — Hair Strokes Only", desc: "A very natural, feathered look that mimics real brow hairs. Ideal for a subtle enhancement." },
      { name: "Combination Brows — Hair Strokes + Shading", desc: "A perfect blend of microblading and shading for fullness, definition and a soft, dimensional finish." },
      { name: "Ombré Brows — Soft Shaded Finish", desc: "Lighter front fading to a darker tail for a soft, makeup-like gradient. Suits all skin types and corrects previous work." },
      { name: "Powder Brows — Full Shaded Look", desc: "A bold, uniform 'makeup' effect. Long-lasting and excellent for covering old brow work." },
    ],
  },
  {
    id: "facials",
    number: "02",
    title: "Specialized Facial Treatments",
    tagline: "Cleanse, hydrate and rejuvenate with tailored facials.",
    icon: Flower2,
    image: catFacials,
    items: [
      { name: "Classic Facial", desc: "Our tried-and-true favorite. Deep cleanses and clears clogged pores. Perfect for first-timers with normal to dry skin." },
      { name: "Microdermabrasion Facial", desc: "A handheld device buffs away dead skin layers for non-invasive complexion perfection." },
      { name: "Hydrating Facial", desc: "Massage and exfoliation deliver a much-needed moisture boost. Best for dry, dehydrated skin." },
      { name: "Anti-Aging Facial", desc: "Cleansing, resurfacing and hydrating to turn back the signs of time. The perfect instant pick-me-up." },
      { name: "Deep Cleansing / Gentlemen's Facial", desc: "Removes blackheads with a deep cleanse of the beard area, finished with a conditioning mask." },
    ],
  },
  {
    id: "pedicures",
    number: "03",
    title: "Premium Pedicure & Foot Care",
    tagline: "Every pedicure includes a complimentary 20-minute back massage.",
    icon: Footprints,
    note: "All pedicures include a 20-minute free back massage.",
    image: catPedicures,
    items: [
      { name: "Detox Pedicure", desc: "Cleanses, exfoliates and hydrates with natural ingredients like Epsom salts, green tea and clay to reduce inflammation." },
      { name: "Paraffin Pedicure", desc: "Luxurious warm-wax treatment that hydrates, softens dry or cracked skin and soothes aching joints." },
      { name: "Jelly Pedicure", desc: "Transforms water into a fluffy, translucent gel that retains heat four times longer for intense relief." },
      { name: "Royal Pedicure", desc: "Our ultimate ritual: royal foot cleansing, hard skin removal, scrub, nail grooming, cuticle treatment and a royal foot massage." },
      { name: "Classic Pedicure", desc: "A fundamental foot-care routine combining cosmetic enhancement with therapeutic hygiene." },
      { name: "Hot Stone Pedicure", desc: "Promotes circulation, relieves pain and encourages deep relaxation and detoxification." },
    ],
  },
  {
    id: "massage",
    number: "04",
    title: "Body Therapy & Massage",
    tagline: "Relieve stress and improve circulation with our expert therapists.",
    icon: HeartPulse,
    image: catMassage,
    items: [
      { name: "Hot Stone Massage", desc: "Water-heated stones placed at key points deliver warmth and deep muscle relaxation." },
      { name: "Deep Tissue Massage", desc: "Focused therapy using healthy, restorative techniques to release deep tension." },
      { name: "Relaxation Massage", desc: "Improves circulation, promotes better sleep and reduces overall pain and fatigue." },
      { name: "Body Massage Therapy", desc: "Relieves the body from stress and stiffness at its very best." },
      { name: "Reflexology", desc: "Targeted therapy that channels energy flow by massaging specific pressure points." },
    ],
  },
  {
    id: "additional",
    number: "05",
    title: "Additional Beauty Services",
    tagline: "Signature finishing touches for an elevated everyday.",
    icon: Smile,
    image: catAdditional,
    items: [
      { name: "Lash Extensions", desc: "Adds volume and length for a youthful, awake look. Weightless, water-resistant and long-lasting." },
      { name: "Teeth Scaling & Whitening", desc: "Professional treatment that removes plaque, tartar and surface stains for a healthier, brighter smile." },
      { name: "Piercings", desc: "Professional, safe and hygienic piercing services for nose, mouth, ears and body." },
    ],
  },
  {
    id: "hair",
    number: "06",
    title: "Hair Styling & Treatment",
    tagline: "Comprehensive hair solutions for every look.",
    icon: Scissors,
    image: catHair,
    items: [
      { name: "Styling", desc: "Frontal installation with styling, 360 installations, fixing with closure, washing and setting, relaxing and straightening." },
      { name: "Maintenance", desc: "Wig revamping, wig and hair straightening, relocking and locking of dreads." },
      { name: "Treatments & Braid Styles", desc: "Crochet with weaving or braid, low-cut tint, hair-tip tint, full hair tint and Ghana weaving." },
    ],
  },
];