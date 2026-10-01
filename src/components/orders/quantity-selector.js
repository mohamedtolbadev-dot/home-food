import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, min = 1, max, onChange, label = "الكمية" }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-semibold">{label}</span>
      <div className="inline-flex items-center rounded-xl border border-[var(--color-line)]">
        <button type="button" aria-label="نقص وجبة" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} className="flex size-10 items-center justify-center text-[var(--color-ink)] hover:bg-[#f8f8f9] disabled:cursor-not-allowed disabled:text-[#c5c5cb]"><Minus size={15} aria-hidden="true" /></button>
        <output aria-live="polite" className="min-w-10 text-center text-sm font-semibold">{value}</output>
        <button type="button" aria-label="زيد وجبة" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} className="flex size-10 items-center justify-center text-[var(--color-ink)] hover:bg-[#f8f8f9] disabled:cursor-not-allowed disabled:text-[#c5c5cb]"><Plus size={15} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
