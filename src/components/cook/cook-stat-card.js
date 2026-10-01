export default function CookStatCard({ label, value, helper, accent = false }) {
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${accent ? "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5" : "border-[var(--color-line)] bg-white"}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--color-muted)]">{helper}</p>
    </div>
  );
}
