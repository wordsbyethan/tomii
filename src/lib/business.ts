export const BUSINESS = {
  name: "Tomi Beauty Hub & Spa",
  shortName: "Tomi Beauty",
  location: "Arepo Road, inside Julanky Filling Station, Ogun State",
  whatsapp: "2349166033749",
  whatsappDisplay: "+234 916 603 3749",
  phoneTel: "+2349166033749",
  socials: {
    instagram: "https://www.instagram.com/tomibeauty_hub_and_spa?igsh=Z2h2dGloaTh6bjZi",
    tiktok: "https://www.tiktok.com/@tomi.beauty.hubspa?_r=1&_t=ZS-96GEYU7xawW",
  },
  bank: {
    bankName: "Zenith Bank",
    accountNumber: "1311555683",
    accountName: "Tomi Beauty Hub",
  },
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function makeAppointmentRef(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TBH-${ymd}-${rand}`;
}