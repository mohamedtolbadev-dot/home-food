export default function PriceFilter({ min, max, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-semibold">الثمن (DH)</legend>
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="price-min">أقل ثمن</label>
        <input id="price-min" type="number" min="0" inputMode="numeric" value={min} onChange={(event) => onChange("minPrice", event.target.value)} placeholder="من" className="h-10 w-full min-w-0 rounded-xl border border-[var(--color-line)] bg-white px-2.5 text-sm outline-none focus:border-[var(--color-brand)]" />
        <span className="text-xs text-[var(--color-muted)]">حتى</span>
        <label className="sr-only" htmlFor="price-max">أعلى ثمن</label>
        <input id="price-max" type="number" min="0" inputMode="numeric" value={max} onChange={(event) => onChange("maxPrice", event.target.value)} placeholder="لـ" className="h-10 w-full min-w-0 rounded-xl border border-[var(--color-line)] bg-white px-2.5 text-sm outline-none focus:border-[var(--color-brand)]" />
      </div>
    </fieldset>
  );
}
