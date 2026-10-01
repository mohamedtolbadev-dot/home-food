import Image from "next/image";
import { PencilLine } from "lucide-react";
import StatusBadge from "@/components/cook/status-badge";

function getMealStatus(quantityAvailable) {
  if (quantityAvailable === 0) return "سالاو";
  if (quantityAvailable <= 3) return "باقي قليل";
  return "متوفرة";
}

const categoryLabels = {
  Marocain: "مغربي",
  Traditionnel: "تقليدي",
  "Petit-déjeuner": "الفطور",
  Végétarien: "نباتي",
  Dessert: "حلويات",
  Sandwich: "ساندويتش",
  Healthy: "صحي",
};

export default function CookMealCard({ meal, onEdit }) {
  const status = getMealStatus(meal.quantityAvailable);

  return (
    <article className="card-surface min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-3 sm:p-4">
      <div className="flex gap-3 sm:gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[#f2f2f4] sm:h-24 sm:w-24">
          <Image src={meal.image} alt={meal.name} fill className="object-cover" sizes="96px" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{meal.name}</h3>
              <p className="mt-1 text-[11px] text-[var(--color-muted)]">{categoryLabels[meal.category] ?? meal.category}</p>
            </div>
            <button type="button" onClick={() => onEdit(meal)} className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-white px-2 py-1 text-[10px] font-semibold text-[var(--color-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
              <PencilLine size={12} aria-hidden="true" /> بدل
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[var(--color-muted)]">
            <span>{meal.price} DH</span>
            <span>{meal.quantityAvailable} وجبات</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <StatusBadge status={status} />
            <span className="text-[11px] text-[var(--color-muted)]">{meal.preparationTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
