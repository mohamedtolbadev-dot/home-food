export const DEFAULT_MEAL_FILTERS = {
  q: "",
  location: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  distance: "",
  rating: "",
  availability: "",
  sort: "recent",
};

const filterKeys = Object.keys(DEFAULT_MEAL_FILTERS);

export function getMealFilters(params = {}) {
  return Object.fromEntries(
    filterKeys.map((key) => {
      const value = params[key];
      return [key, Array.isArray(value) ? value[0] ?? "" : value ?? DEFAULT_MEAL_FILTERS[key]];
    }),
  );
}

function normalize(value) {
  return value
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterMeals(meals, filters) {
  const query = normalize(filters.q.trim());
  const location = normalize(filters.location.trim());
  const minPrice = filters.minPrice === "" ? null : Number(filters.minPrice);
  const maxPrice = filters.maxPrice === "" ? null : Number(filters.maxPrice);
  const maxDistance = filters.distance === "" ? null : Number(filters.distance);
  const minRating = filters.rating === "" ? null : Number(filters.rating);

  const results = meals.filter((meal) => {
    const searchable = normalize(`${meal.name} ${meal.description} ${meal.cook} ${meal.category}`);
    if (query && !searchable.includes(query)) return false;
    if (location && !normalize(meal.area).includes(location)) return false;
    if (filters.category && meal.category !== filters.category) return false;
    if (minPrice !== null && meal.price < minPrice) return false;
    if (maxPrice !== null && meal.price > maxPrice) return false;
    if (maxDistance !== null && meal.distanceKm > maxDistance) return false;
    if (minRating !== null && meal.rating < minRating) return false;
    if (filters.availability === "now" && meal.availability !== "now") return false;
    if (filters.availability === "today" && !["now", "today"].includes(meal.availability)) return false;
    if (filters.availability === "preorder" && meal.availability !== "preorder") return false;
    return true;
  });

  const sorters = {
    recent: (a, b) => b.createdAt.localeCompare(a.createdAt),
    distance: (a, b) => a.distanceKm - b.distanceKm,
    rating: (a, b) => b.rating - a.rating,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
  };

  return [...results].sort(sorters[filters.sort] ?? sorters.recent);
}

export function countMealFilters(filters) {
  return ["q", "location", "category", "minPrice", "maxPrice", "distance", "rating", "availability"].filter((key) => Boolean(filters[key])).length;
}
