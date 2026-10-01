"use client";

import { useEffect, useState } from "react";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import CookCard from "@/components/home/cook-card";
import MealCard from "@/components/home/meal-card";
import { cooks, meals } from "@/data/homepage";
import { readFavorites } from "@/utils/customer-storage";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const refresh = () => setFavorites(readFavorites());
    refresh();
    window.addEventListener("homefood:favorites-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("homefood:favorites-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const favoriteMeals = favorites.filter((favorite) => favorite.type === "meal").map((favorite) => meals.find((meal) => meal.id === favorite.id)).filter(Boolean);
  const favoriteCooks = favorites.filter((favorite) => favorite.type === "cook").map((favorite) => cooks.find((cook) => cook.id === favorite.id)).filter(Boolean);

  return (
    <CustomerAccountLayout title="المفضلة" description="خلي الأطباق والطباخات لي عجبوك مجموعين هنا.">
      {favoriteMeals.length || favoriteCooks.length ? <div className="space-y-7">
        {favoriteMeals.length > 0 && <section><div className="mb-3"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">ترجع ليهم</p><h2 className="mt-1 text-base font-semibold">الأطباق لي عجبوك</h2></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{favoriteMeals.map((meal) => <MealCard key={meal.id} meal={meal} />)}</div></section>}
        {favoriteCooks.length > 0 && <section><div className="mb-3"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">تابعهم</p><h2 className="mt-1 text-base font-semibold">الطباخات لي عجبوك</h2></div><div className="rounded-2xl border border-[var(--color-line)] bg-white px-4 sm:px-5">{favoriteCooks.map((cook) => <CookCard key={cook.id} cook={cook} />)}</div></section>}
      </div> : <EmptyState type="favorites" message="مازال ما عندك حتى شي حاجة فالمفضلة." explanation="ضغط على القلب ديال شي طبق ولا طباخة باش تلقاهم هنا." cta="شوف الماكلة" href="/meals" />}
    </CustomerAccountLayout>
  );
}