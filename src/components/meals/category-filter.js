import { mealCategories } from "@/data/homepage";

export default function CategoryFilter({ value, onChange }) {
  return (
    <div role="group" aria-label="أنواع الماكلة" className="flex flex-wrap gap-2">
      <button type="button" onClick={() => onChange("")} aria-pressed={!value} className={`min-h-10 shrink-0 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${!value ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[#d2d2d7] hover:text-[var(--color-ink)]"}`}>كولشي</button>
      {mealCategories.map((category) => (
        <button type="button" key={category} onClick={() => onChange(value === category ? "" : category)} aria-pressed={value === category} className={`min-h-10 shrink-0 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${value === category ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[#d2d2d7] hover:text-[var(--color-ink)]"}`}>{category}</button>
      ))}
    </div>
  );
}
