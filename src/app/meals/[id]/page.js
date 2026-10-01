import { notFound } from "next/navigation";
import MealDetails from "@/components/meals/meal-details";
import { meals } from "@/data/homepage";

export function generateStaticParams() {
  return meals.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const meal = meals.find((item) => item.id === id);
  return meal ? { title: meal.name, description: meal.description } : { title: "ما لقيناش الطبق" };
}

export default async function MealPage({ params }) {
  const { id } = await params;
  const meal = meals.find((item) => item.id === id);
  if (!meal) notFound();

  return <MealDetails meal={meal} />;
}
