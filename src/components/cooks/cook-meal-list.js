import MealCard from "@/components/home/meal-card";

export default function CookMealList({ meals, cookName }) {
  return (
    <section id="plats-du-jour" aria-labelledby="cook-meals-title" className="scroll-mt-24 border-b border-[var(--color-line)] py-7 sm:py-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Cuisiné en petites quantités</p><h2 id="cook-meals-title" className="text-lg font-semibold tracking-[-0.03em]">Plats disponibles aujourd’hui</h2></div>
        <span className="text-xs text-[var(--color-muted)]">{meals.length} plat{meals.length === 1 ? "" : "s"} de {cookName}</span>
      </div>
      {meals.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}</div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-5 py-9 text-center"><p className="text-sm font-medium">Pas de plat disponible aujourd’hui.</p><p className="mt-1.5 text-xs text-[var(--color-muted)]">Consultez les prochains jours ou découvrez d’autres cuisinières du quartier.</p></div>
      )}
      <p className="mt-3 text-[10px] text-[var(--color-muted)]">Plats et disponibilités présentés à titre de démonstration.</p>
    </section>
  );
}
