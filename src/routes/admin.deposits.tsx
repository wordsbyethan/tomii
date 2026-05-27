import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, ExternalLink, LogOut, RefreshCw, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin/deposits")({
  component: AdminDeposits,
  head: () => ({ meta: [{ title: "Deposits · Admin · Tomi Beauty & Spa" }] }),
});

type Deposit = {
  id: string;
  reference: string;
  service: string | null;
  category: string | null;
  amount: number;
  customer_name: string | null;
  customer_phone: string | null;
  payment_method: string;
  proof_url: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  received_at: string | null;
};

function AdminDeposits() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [items, setItems] = useState<Deposit[]>([]);

  async function load() {
    setLoading(true);
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) {
      navigate({ to: "/admin/login" });
      return;
    }
    const uid = sess.session.user.id;
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid);
    const admin = !!roles?.some((r) => r.role === "admin");
    setIsAdmin(admin);
    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Deposit[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markReceived(id: string) {
    const { error } = await supabase
      .from("deposits")
      .update({ status: "received", received_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Marked as received");
    load();
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/" className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold">
              ← Back to site
            </Link>
            <h1 className="mt-2 font-display text-3xl">
              Deposit <span className="text-gradient-gold">Confirmations</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:bg-accent"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:bg-accent"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>

        {isAdmin === false && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <ShieldAlert className="mt-0.5 h-4 w-4" />
            <div>
              You're signed in but don't have the <strong>admin</strong> role yet. You can view deposits
              but cannot mark them as received. Ask the owner to grant your account admin access in the
              backend (user_roles table).
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No deposits submitted yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Reference</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Method</th>
                  <th className="px-4 py-3 text-left">Proof</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => (
                  <tr key={d.id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-xs">{d.reference}</td>
                    <td className="px-4 py-3">
                      <div>{d.customer_name ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{d.customer_phone ?? ""}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{d.service ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{d.category ?? ""}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ₦{d.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 capitalize">{d.payment_method}</td>
                    <td className="px-4 py-3">
                      {d.proof_url ? (
                        <button
                          onClick={async () => {
                            const key = d.proof_url!.includes("/deposit-proofs/")
                              ? d.proof_url!.split("/deposit-proofs/")[1]
                              : d.proof_url!;
                            const { data, error } = await supabase.storage
                              .from("deposit-proofs")
                              .createSignedUrl(key, 300);
                            if (error || !data?.signedUrl) {
                              toast.error(error?.message ?? "Could not open proof");
                              return;
                            }
                            window.open(data.signedUrl, "_blank", "noopener,noreferrer");
                          }}
                          className="inline-flex items-center gap-1 text-gold hover:underline"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground">none</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                          d.status === "received"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {d.status !== "received" && isAdmin && (
                        <button
                          onClick={() => markReceived(d.id)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-3 py-1.5 text-xs font-medium text-ink shadow-gold"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Mark received
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
