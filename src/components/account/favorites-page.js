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
    <CustomerAccountLayout title="Mes favoris" description="Gardez vos plats et cuisinières préférés à portée de main.">
      {favoriteMeals.length || favoriteCooks.length ? <div className="space-y-7">
        {favoriteMeals.length > 0 && <section><div className="mb-3"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">À retrouver</p><h2 className="mt-1 text-base font-semibold">Plats favoris</h2></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{favoriteMeals.map((meal) => <MealCard key={meal.id} meal={meal} />)}</div></section>}
        {favoriteCooks.length > 0 && <section><div className="mb-3"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">À suivre</p><h2 className="mt-1 text-base font-semibold">Cuisinières favorites</h2></div><div className="rounded-2xl border border-[var(--color-line)] bg-white px-4 sm:px-5">{favoriteCooks.map((cook) => <CookCard key={cook.id} cook={cook} />)}</div></section>}
      </div> : <EmptyState type="favorites" message="Vous n'avez encore aucun favori." explanation="Enregistrez un plat ou une cuisinière avec le cœur pour les retrouver ici." cta="Découvrir les plats" href="/meals" />}
    </CustomerAccountLayout>
  );
}