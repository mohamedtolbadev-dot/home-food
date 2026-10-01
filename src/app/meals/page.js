import { Suspense } from "react";
import MealsPage from "@/components/meals/meals-page";

export const metadata = {
  title: "Plats faits maison près de vous",
  description: "Découvrez des repas faits maison par des cuisinières locales au Maroc.",
};

function MealsFallback() {
  return <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8"><p className="text-sm text-[var(--color-muted)]">Chargement des plats…</p></main>;
}

export default function MealsRoute() {
  return <Suspense fallback={<MealsFallback />}><MealsPage /></Suspense>;
}
