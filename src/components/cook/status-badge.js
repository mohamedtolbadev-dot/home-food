export default function StatusBadge({ status }) {
  const palette = {
    متوفرة: "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    "باقي قليل": "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    سالاو: "border-slate-200 bg-slate-100 text-slate-700",
    جديدة: "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
    تأكدات: "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-secondary)]",
    "كنوجدو فيها": "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    واجدة: "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    تسالات: "border-slate-200 bg-slate-100 text-slate-700",
    Disponible: "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    "Presque épuisé": "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    Épuisé: "border-slate-200 bg-slate-100 text-slate-700",
    Nouvelle: "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
    Confirmée: "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-secondary)]",
    "En préparation": "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    Prête: "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[var(--color-secondary)]",
    Terminée: "border-slate-200 bg-slate-100 text-slate-700",
  };
  const labels = {
    Disponible: "متوفرة",
    "Presque épuisé": "باقي قليل",
    Épuisé: "سالاو",
    Nouvelle: "جديدة",
    Confirmée: "تأكدات",
    "En préparation": "كنوجدو فيها",
    Prête: "واجدة",
    Terminée: "تسالات",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${palette[status] ?? "border-slate-200 bg-slate-100 text-slate-700"}`}>
      {labels[status] ?? status}
    </span>
  );
}
