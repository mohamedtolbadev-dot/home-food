"use client";

import { useState } from "react";
import { ListFilter, Search, SlidersHorizontal } from "lucide-react";
import CategoryFilter from "@/components/meals/category-filter";
import LocationSelector from "@/components/meals/location-selector";
import PriceFilter from "@/components/meals/price-filter";

const selectClass = "h-10 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-xs text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]";

function FilterSelect({ id, label, value, onChange, children }) {
  return (
    <label htmlFor={id} className="block min-w-0">
      <span className="mb-2 block text-xs font-semibold">{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>{children}</select>
    </label>
  );
}

export default function FilterBar({ filters, onFilterChange, onReset, activeCount }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  function update(key, value) {
    onFilterChange(key, value);
  }

  return (
    <section aria-label="البحث والتصفية" className="space-y-4">
      <form onSubmit={(event) => event.preventDefault()} className="grid gap-2 sm:grid-cols-[1.1fr_1fr_auto]">
        <label className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl border border-[var(--color-line)] bg-white px-3.5">
          <Search size={16} className="shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
          <span className="sr-only">قلب على طبق ولا طباخة</span>
          <input value={filters.q} onChange={(event) => update("q", event.target.value)} placeholder="قلب على طبق ولا طباخة" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#85858c]" />
        </label>
        <LocationSelector value={filters.location} onChange={(value) => update("location", value)} />
        <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback"><Search size={15} aria-hidden="true" /> قلب</button>
      </form>

      <CategoryFilter value={filters.category} onChange={(value) => update("category", value)} />

      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3.5 text-xs font-semibold"><SlidersHorizontal size={15} aria-hidden="true" /> صفي{activeCount > 0 ? ` (${activeCount})` : ""}</button>
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]"><ListFilter size={14} aria-hidden="true" /> قرب النتائج ليك</span>
      </div>

      <div className={`${filtersOpen ? "grid" : "hidden"} grid-cols-2 gap-3 rounded-2xl border border-[var(--color-line)] bg-[#f8f8f9] p-4 sm:grid-cols-3 lg:grid lg:grid-cols-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0`}>
        <PriceFilter min={filters.minPrice} max={filters.maxPrice} onChange={update} />
        <FilterSelect id="distance" label="البعد" value={filters.distance} onChange={(value) => update("distance", value)}>
          <option value="">أي بعد</option><option value="2">حتى لـ 2 km</option><option value="5">حتى لـ 5 km</option><option value="10">حتى لـ 10 km</option>
        </FilterSelect>
        <FilterSelect id="rating" label="أقل تقييم" value={filters.rating} onChange={(value) => update("rating", value)}>
          <option value="">أي تقييم</option><option value="4.5">4.5 ولا كثر</option><option value="4.8">4.8 ولا كثر</option><option value="5">5.0</option>
        </FilterSelect>
        <FilterSelect id="availability" label="التوفر" value={filters.availability} onChange={(value) => update("availability", value)}>
          <option value="">أي وقت</option><option value="now">متوفر دابا</option><option value="today">اليوم</option><option value="preorder">طلب مسبق</option>
        </FilterSelect>
        <FilterSelect id="sort" label="رتب حسب" value={filters.sort} onChange={(value) => update("sort", value)}>
          <option value="recent">الجديد الأول</option><option value="distance">الأقرب ليك</option><option value="rating">الأعلى تقييما</option><option value="price-asc">الثمن من القليل للكثير</option><option value="price-desc">الثمن من الكثير للقليل</option>
        </FilterSelect>
        {activeCount > 0 && <button type="button" onClick={onReset} className="self-end justify-self-start pb-2 text-xs font-semibold text-[var(--color-brand)] underline underline-offset-2">رجع التصفية كيف كانت</button>}
      </div>
    </section>
  );
}
