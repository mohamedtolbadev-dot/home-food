export default function StatusBadge({ status }) {
  const palette = {
    متوفرة: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "باقي قليل": "border-amber-200 bg-amber-50 text-amber-700",
    سالاو: "border-slate-200 bg-slate-100 text-slate-700",
    جديدة: "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
    تأكدات: "border-sky-200 bg-sky-50 text-sky-700",
    "كنوجدو فيها": "border-amber-200 bg-amber-50 text-amber-700",
    واجدة: "border-violet-200 bg-violet-50 text-violet-700",
    تسالات: "border-slate-200 bg-slate-100 text-slate-700",
    Disponible: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Presque épuisé": "border-amber-200 bg-amber-50 text-amber-700",
    Épuisé: "border-slate-200 bg-slate-100 text-slate-700",
    Nouvelle: "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
    Confirmée: "border-sky-200 bg-sky-50 text-sky-700",
    "En préparation": "border-amber-200 bg-amber-50 text-amber-700",
    Prête: "border-violet-200 bg-violet-50 text-violet-700",
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
