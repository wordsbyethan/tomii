import { useMemo, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Banknote, Copy, Check, MessageCircle, ShieldCheck, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { BUSINESS, waLink, makeAppointmentRef } from "@/lib/business";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Method = "transfer";

type PayDepositDialogProps = {
  service?: string;
  category?: string;
  defaultAmount?: number;
  trigger?: ReactNode;
  defaultMethod?: Method;
};

const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

function CopyChip({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-2.5 py-1 text-[11px] font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
    >
      {done ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

const MAX_PROOF_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_PROOF_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "application/pdf"];
const COMPRESS_THRESHOLD = 1.5 * 1024 * 1024; // compress images bigger than 1.5 MB
const MAX_DIMENSION = 1600;

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/heic") return file;
  if (file.size <= COMPRESS_THRESHOLD) return file;
  try {
    const dataUrl: string = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    const img: HTMLImageElement = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = dataUrl;
    });
    const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, w, h);
    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob((b) => res(b), "image/jpeg", 0.82),
    );
    if (!blob || blob.size >= file.size) return file;
    const newName = file.name.replace(/\.(png|jpg|jpeg|webp)$/i, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg", lastModified: Date.now() });
  } catch (e) {
    console.warn("[PayDeposit] image compression failed, using original", e);
    return file;
  }
}

function validateProofFile(file: File): string | null {
  if (file.size > MAX_PROOF_BYTES) {
    return `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 5 MB.`;
  }
  // Some mobile browsers report empty type — fall back to extension check.
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const okExt = ["jpg", "jpeg", "png", "webp", "heic", "pdf"].includes(ext);
  if (file.type && !ALLOWED_PROOF_TYPES.includes(file.type) && !okExt) {
    return "Unsupported file type. Please upload JPG, PNG, WEBP or PDF.";
  }
  if (!file.type && !okExt) {
    return "Unsupported file type. Please upload JPG, PNG, WEBP or PDF.";
  }
  return null;
}

export function PayDepositDialog({
  service,
  category,
  defaultAmount = 20000,
  defaultMethod = "transfer",
  trigger,
}: PayDepositDialogProps) {
  const [open, setOpen] = useState(false);
  const method: Method = "transfer";
  void defaultMethod;
  const [amount, setAmount] = useState<number>(defaultAmount);
  const reference = useMemo(() => makeAppointmentRef(), [open]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submitProof() {
    if (!proofFile) {
      toast.error("Please attach your transfer proof first");
      return;
    }
    let fileToUpload = proofFile;
    if (fileToUpload.type.startsWith("image/") && fileToUpload.size > COMPRESS_THRESHOLD) {
      const compressed = await compressImage(fileToUpload);
      if (compressed !== fileToUpload) {
        toast.message(
          `Optimised image: ${(fileToUpload.size / 1024 / 1024).toFixed(1)} MB → ${(compressed.size / 1024 / 1024).toFixed(1)} MB`,
        );
      }
      fileToUpload = compressed;
    }
    const validationError = validateProofFile(fileToUpload);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSubmitting(true);
    try {
      const ext = fileToUpload.name.split(".").pop() || "jpg";
      const path = `${reference}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("deposit-proofs")
        .upload(path, fileToUpload, { contentType: fileToUpload.type, upsert: false });
      if (upErr) {
        console.error("[PayDeposit] storage.upload failed", {
          name: (upErr as any)?.name,
          message: upErr.message,
          status: (upErr as any)?.statusCode ?? (upErr as any)?.status,
          error: (upErr as any)?.error,
          path,
          size: fileToUpload.size,
          type: fileToUpload.type,
        });
        const msg = /row-level security|permission|unauthorized/i.test(upErr.message)
          ? "Upload blocked by storage permissions. Please send the proof on WhatsApp instead."
          : `Upload failed: ${upErr.message}`;
        toast.error(msg);
        return;
      }
      const { data: pub } = supabase.storage.from("deposit-proofs").getPublicUrl(path);
      const { error: insErr } = await supabase.from("deposits").insert({
        reference,
        service: service ?? null,
        category: category ?? null,
        amount,
        customer_name: name || null,
        customer_phone: phone || null,
        payment_method: method,
        proof_url: pub.publicUrl,
        status: "pending",
      });
      if (insErr) {
        console.error("[PayDeposit] deposits.insert failed", {
          message: insErr.message,
          code: (insErr as any)?.code,
          details: (insErr as any)?.details,
          hint: (insErr as any)?.hint,
        });
        const msg = /row-level security|policy/i.test(insErr.message)
          ? "We couldn't save your deposit (permissions). Please notify us on WhatsApp."
          : `Could not save deposit: ${insErr.message}`;
        toast.error(msg);
        return;
      }
      setSubmitted(true);
      toast.success("Proof submitted! We'll mark your reference as received shortly.");
    } catch (e) {
      console.error("[PayDeposit] unexpected error", e);
      const message = e instanceof Error ? e.message : "Unknown error";
      toast.error(`Could not submit proof: ${message}. Please try WhatsApp instead.`);
    } finally {
      setSubmitting(false);
    }
  }

  const summary = [
    `Hello ${BUSINESS.shortName}, I'd like to pay my deposit.`,
    ``,
    `• Reference: ${reference}`,
    service ? `• Service: ${service}` : "",
    category ? `• Category: ${category}` : "",
    `• Deposit amount: ${formatNaira(amount)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const transferMessage = [
    summary,
    ``,
    `I'm paying via Bank Transfer:`,
    `Bank: ${BUSINESS.bank.bankName}`,
    `Account: ${BUSINESS.bank.accountNumber}`,
    `Name: ${BUSINESS.bank.accountName}`,
    ``,
    `Please confirm once received. Thank you!`,
  ].join("\n");


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-gold px-3 py-1.5 text-[11px] font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <Banknote className="h-3.5 w-3.5" /> Pay Deposit
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl border-border/60 bg-card p-0 sm:rounded-3xl">
        <div className="sticky top-0 z-10 overflow-hidden rounded-t-3xl bg-gradient-ink px-7 py-5 text-background">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-gold opacity-30 blur-2xl" />
          <DialogHeader className="relative">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Secure Deposit</span>
            <DialogTitle className="font-display text-2xl text-background">
              Pay Your <span className="italic text-gradient-gold">Deposit</span>
            </DialogTitle>
            <DialogDescription className="text-background/70">
              A 50% deposit confirms your slot. Reference is auto-generated for tracking.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 px-7 py-6">
          <div className="rounded-2xl border border-gold/30 bg-gold-soft/30 px-4 py-3">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest text-foreground/60">Reference</span>
              <CopyChip value={reference} />
            </div>
            <div className="mt-1 font-display text-lg text-foreground">{reference}</div>
            {service && (
              <div className="mt-1 text-xs text-muted-foreground">{service}</div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-widest text-foreground/70">
              Deposit amount (₦)
            </label>
            <input
              type="number"
              min={1000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
            <p className="text-[11px] text-muted-foreground">Suggested: 50% of your service price.</p>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Bank</div>
                <div className="text-sm font-medium text-foreground">{BUSINESS.bank.bankName}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Account number</div>
                <div className="font-display text-lg text-foreground">{BUSINESS.bank.accountNumber}</div>
              </div>
              <CopyChip value={BUSINESS.bank.accountNumber} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Account name</div>
                <div className="text-sm font-medium text-foreground">{BUSINESS.bank.accountName}</div>
              </div>
              <CopyChip value={BUSINESS.bank.accountName} />
            </div>
            <p className="rounded-xl bg-blush/40 px-3 py-2 text-[11px] text-foreground/80">
              Use <strong>{reference}</strong> as your transfer narration so we can match your payment instantly.
            </p>
          </div>

          {method === "transfer" && (
            <div className="space-y-3 rounded-2xl border border-gold/40 bg-gold-soft/20 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                Confirm payment — upload proof
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 80))}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.slice(0, 20))}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-gold/60 bg-background px-3 py-3 text-xs text-foreground/80 hover:bg-gold-soft/30">
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-gold" />
                  {proofFile ? proofFile.name : "Attach screenshot of transfer (PNG/JPG/PDF)"}
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    if (f) {
                      const err = validateProofFile(f);
                      if (err) {
                        toast.error(err);
                        e.target.value = "";
                        setProofFile(null);
                        return;
                      }
                    }
                    setProofFile(f);
                  }}
                />
              </label>
              {submitted ? (
                <div className="flex items-center justify-center gap-2 rounded-full bg-green-100 px-4 py-2.5 text-xs font-medium text-green-800">
                  <CheckCircle2 className="h-4 w-4" /> Proof received — pending admin confirmation
                </div>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submitProof}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold bg-background px-5 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {submitting ? "Uploading..." : "Submit proof for confirmation"}
                </button>
              )}
            </div>
          )}

          <a
            href={waLink(transferMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-medium text-ink shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            I've Sent the Transfer — Notify on WhatsApp
          </a>

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-gold" /> 100% secure · Verified business account
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}