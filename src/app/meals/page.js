import { Suspense } from "react";
import MealsPage from "@/components/meals/meals-page";

export const metadata = {
  title: "ماكلة الدار قراب ليك",
  description: "شوف الوجبات ديال الدار لي كيوجدوها الطباخات فالمغرب.",
};

function MealsFallback() {
  return <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8"><p className="text-sm text-[var(--color-muted)]">كنحملو الأطباق…</p></main>;
}

export default function MealsRoute() {
  return <Suspense fallback={<MealsFallback />}><MealsPage /></Suspense>;
}
