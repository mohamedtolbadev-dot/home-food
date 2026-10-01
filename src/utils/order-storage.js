import { meals } from "@/data/homepage";
import { CART_STORAGE_KEY, LAST_ORDER_STORAGE_KEY, deliveryAreas, deliveryTimes, getOrderTotals } from "@/data/order-options";

function getMeal(mealId) {
  return meals.find((meal) => meal.id === mealId);
}

export function normalizeCart(value) {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const meal = getMeal(item.mealId);
    const quantity = Number(item.quantity);
    if (!meal || meal.portionsAvailable < 1 || !Number.isInteger(quantity) || quantity < 1 || quantity > meal.portionsAvailable) return [];

    const city = Object.hasOwn(deliveryAreas, item.city) ? item.city : "Rabat";
    const validAreas = deliveryAreas[city];
    const neighborhood = validAreas.includes(item.neighborhood) ? item.neighborhood : validAreas[0];

    return [{
      mealId: meal.id,
      cookId: meal.cookId,
      quantity,
      unitPrice: meal.price,
      deliveryTime: deliveryTimes.includes(item.deliveryTime) ? item.deliveryTime : deliveryTimes[1],
      city,
      neighborhood,
    }];
  });
}

export function addMealToCart(items, meal, quantity, preferences) {
  if (!meal || meal.portionsAvailable < 1) return { ok: false, reason: "unavailable" };
  if (!Number.isInteger(quantity) || quantity < 1) return { ok: false, reason: "invalid-quantity" };
  const current = items.find((item) => item.mealId === meal.id)?.quantity ?? 0;
  if (current + quantity > meal.portionsAvailable) return { ok: false, reason: "limit" };

  const nextItem = {
    mealId: meal.id,
    cookId: meal.cookId,
    quantity: current + quantity,
    unitPrice: meal.price,
    deliveryTime: preferences.deliveryTime,
    city: preferences.city,
    neighborhood: preferences.neighborhood,
  };
  const exists = items.some((item) => item.mealId === meal.id);
  const nextItems = normalizeCart(exists
    ? items.map((item) => item.mealId === meal.id ? nextItem : item)
    : [...items, nextItem]);
  return { ok: true, items: nextItems, quantity: nextItem.quantity };
}

export function changeCartQuantity(items, mealId, quantity) {
  const meal = getMeal(mealId);
  if (!meal) return items;
  const nextQuantity = Math.max(0, Math.min(meal.portionsAvailable, Math.floor(Number(quantity) || 0)));
  return nextQuantity === 0
    ? items.filter((item) => item.mealId !== mealId)
    : items.map((item) => item.mealId === mealId ? { ...item, quantity: nextQuantity } : item);
}

export function readCart(storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const raw = target.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const normalized = normalizeCart(parsed);
    if (!Array.isArray(parsed) || normalized.length !== parsed.length) target.removeItem(CART_STORAGE_KEY);
    return normalized;
  } catch {
    try { (storage ?? globalThis.localStorage).removeItem(CART_STORAGE_KEY); } catch {}
    return [];
  }
}

export function writeCart(items, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCart(items)));
    return true;
  } catch {
    return false;
  }
}

export function readLastOrder(storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const raw = target.getItem(LAST_ORDER_STORAGE_KEY);
    if (!raw) return null;
    const order = JSON.parse(raw);
    const validItems = Array.isArray(order?.items) && order.items.length > 0 && order.items.every((item) => {
      const meal = getMeal(item?.mealId);
      const snapshot = item?.mealSnapshot;
      const itemIsValid = snapshot
        ? snapshot.id === item.mealId && snapshot.cookId === item.cookId && typeof snapshot.name === "string" && typeof snapshot.cook === "string" && typeof snapshot.image === "string"
        : meal && item.cookId === meal.cookId && item.unitPrice === meal.price && item.quantity <= meal.portionsAvailable;
      return itemIsValid && Number.isInteger(item.quantity) && item.quantity > 0 && Number.isFinite(item.unitPrice) && item.unitPrice > 0;
    });
    const validDelivery = Object.hasOwn(deliveryAreas, order?.delivery?.city)
      && deliveryAreas[order.delivery.city].includes(order.delivery.neighborhood)
      && typeof order.delivery.address === "string"
      && typeof order.delivery.instructions === "string";
    const totals = validItems ? getOrderTotals(order.items) : null;
    const valid = typeof order?.orderNumber === "string"
      && order.customer && typeof order.customer.name === "string" && typeof order.customer.phone === "string"
      && validDelivery && deliveryTimes.includes(order.deliveryTime)
      && order.paymentMethod === "Paiement à la livraison" && order.status === "received"
      && totals && order.subtotal === totals.subtotal && order.deliveryFee === totals.deliveryFee && order.total === totals.total;
    if (!valid) {
      target.removeItem(LAST_ORDER_STORAGE_KEY);
      return null;
    }
    return order;
  } catch {
    try { (storage ?? globalThis.localStorage).removeItem(LAST_ORDER_STORAGE_KEY); } catch {}
    return null;
  }
}

export function writeLastOrder(order, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
    return true;
  } catch {
    return false;
  }
}
