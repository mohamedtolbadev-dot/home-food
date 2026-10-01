import { MapPin } from "lucide-react";

export default function LocationSelector({ value, onChange }) {
  return (
    <label className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl border border-[var(--color-line)] bg-white px-3.5">
      <MapPin size={16} className="shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
      <span className="sr-only">المدينة ولا الحي ديالك</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="المدينة ولا الحي ديالك" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#85858c]" />
    </label>
  );
}
