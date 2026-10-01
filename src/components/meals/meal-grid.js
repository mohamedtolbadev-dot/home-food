import MealCard from "@/components/home/meal-card";
import EmptyState from "@/components/meals/empty-state";

export default function MealGrid({ meals, onReset }) {
  if (!meals.length) return <EmptyState onReset={onReset} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
    </div>
  );
}
