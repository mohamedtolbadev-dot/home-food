"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChefHat } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/home/site-header";
import FilterBar from "@/components/meals/filter-bar";
import MealGrid from "@/components/meals/meal-grid";
import { meals } from "@/data/homepage";
import { countMealFilters, DEFAULT_MEAL_FILTERS, filterMeals, getMealFilters } from "@/utils/meal-filters";

export default function MealsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const filters = useMemo(() => getMealFilters(Object.fromEntries(new URLSearchParams(queryString))), [queryString]);
  const filteredMeals = useMemo(() => filterMeals(meals, filters), [filters]);
  const activeCount = countMealFilters(filters);

  function setFilter(key, value) {
    const params = new URLSearchParams(queryString);
    if (!value || (key === "sort" && value === DEFAULT_MEAL_FILTERS.sort)) params.delete(key);
    else params.set(key, value);
    const search = params.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  }

  function resetFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[75vh] bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-9 sm:px-8 sm:pb-20 sm:pt-12 lg:px-10">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">ماكلة الدار قراب ليك</p>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">شوف الماكلة لي كاينة حدّاك</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">تفرج فالوجبات لي كيوجدوها الطباخات ديال الحومة اليوم.</p>
            </div>
            <p className="text-xs text-[var(--color-muted)]">كنوجدو غير كميات قليلة</p>
          </div>

          <FilterBar filters={filters} onFilterChange={setFilter} onReset={resetFilters} activeCount={activeCount} />

          <div className="mb-4 mt-7 flex items-center justify-between gap-3 border-b border-[var(--color-line)] pb-3">
            <p aria-live="polite" className="text-xs text-[var(--color-muted)]"><span className="font-semibold text-[var(--color-ink)]">{filteredMeals.length}</span> وجبة {activeCount ? "على حساب البحث ديالك" : "تقدر تكتاشفها"}</p>
            {activeCount > 0 && <button type="button" onClick={resetFilters} className="text-xs font-semibold text-[var(--color-brand)] underline underline-offset-2">مسح كلشي</button>}
          </div>

          <MealGrid meals={filteredMeals} onReset={resetFilters} />

          <section className="mt-14 flex flex-col justify-between gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-brand)]"><ChefHat size={17} aria-hidden="true" /></span><p className="text-sm font-medium">كتطيب فالدار؟</p></div>
            <Link href="/#devenir-cuisinier" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand)] hover:underline">عرض الماكلة ديالك <ArrowRight size={14} aria-hidden="true" /></Link>
          </section>
        </div>
      </main>
      <footer className="border-t border-[var(--color-line)] bg-[#f8f8f9] px-5 py-5 text-center text-[11px] text-[var(--color-muted)] sm:px-8"><Link href="/" className="font-semibold text-[var(--color-ink)]">دار مطبخ</Link><span className="mx-2">·</span>الأطباق والتوفر غير أمثلة للتجربة.</footer>
    </>
  );
}
