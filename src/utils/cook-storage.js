import { demoCookMeals, demoCookOrders, demoCookProfile } from "@/data/cook-demo";

export const COOK_STORAGE_KEYS = {
  onboarding: "homefood_cook_onboarding",
  profile: "homefood_cook_profile",
  meals: "homefood_cook_meals",
  orders: "homefood_cook_orders",
};

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readCookOnboarding() {
  return readStorage(COOK_STORAGE_KEYS.onboarding, {
    firstName: "",
    lastName: "",
    phone: "",
    city: "Rabat",
    neighborhood: "Agdal",
    photo: "",
    description: "",
    cuisineType: "مغربي",
    specialties: [],
    availabilityDays: [],
    availabilityHours: "",
    portionsPerDay: 12,
  });
}

export function writeCookOnboarding(value) {
  return writeStorage(COOK_STORAGE_KEYS.onboarding, value);
}

export function readCookProfile() {
  return readStorage(COOK_STORAGE_KEYS.profile, demoCookProfile);
}

export function writeCookProfile(value) {
  return writeStorage(COOK_STORAGE_KEYS.profile, value);
}

export function readCookMeals() {
  return readStorage(COOK_STORAGE_KEYS.meals, demoCookMeals);
}

export function writeCookMeals(value) {
  return writeStorage(COOK_STORAGE_KEYS.meals, value);
}

export function readCookOrders() {
  return readStorage(COOK_STORAGE_KEYS.orders, demoCookOrders);
}

export function writeCookOrders(value) {
  return writeStorage(COOK_STORAGE_KEYS.orders, value);
}
