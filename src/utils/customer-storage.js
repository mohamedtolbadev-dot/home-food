import { cooks, meals } from "@/data/homepage";
import { demoAddresses, demoCustomer, demoCustomerOrders, emptyFavorites } from "@/data/customer-account";

export const CUSTOMER_STORAGE_KEYS = {
  customer: "homefood_customer",
  addresses: "homefood_addresses",
  orders: "homefood_orders",
  favorites: "homefood_favorites",
};

function readValue(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeValue(key, value) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readCustomer() {
  return readValue(CUSTOMER_STORAGE_KEYS.customer, demoCustomer);
}

export function writeCustomer(customer) {
  return writeValue(CUSTOMER_STORAGE_KEYS.customer, customer);
}

export function readAddresses() {
  const addresses = readValue(CUSTOMER_STORAGE_KEYS.addresses, demoAddresses);
  return Array.isArray(addresses) ? addresses : demoAddresses;
}

export function writeAddresses(addresses) {
  return writeValue(CUSTOMER_STORAGE_KEYS.addresses, addresses);
}

export function readCustomerOrders() {
  const orders = readValue(CUSTOMER_STORAGE_KEYS.orders, demoCustomerOrders);
  return Array.isArray(orders) ? orders : demoCustomerOrders;
}

export function writeCustomerOrders(orders) {
  return writeValue(CUSTOMER_STORAGE_KEYS.orders, orders);
}

export function appendCustomerOrder(order) {
  if (!order?.orderNumber || !Array.isArray(order.items)) return false;

  const items = order.items.map((item) => {
    const meal = meals.find((entry) => entry.id === item.mealId);
    const cook = cooks.find((entry) => entry.id === item.cookId);
    const snapshot = item.mealSnapshot;
    return {
      mealId: item.mealId,
      name: snapshot?.name ?? meal?.name ?? "طبق",
      image: snapshot?.image ?? meal?.image ?? "",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      cookId: item.cookId,
      cookName: snapshot?.cook ?? cook?.name ?? "طباخة",
      cookImage: cook?.image ?? "",
    };
  });
  const firstItem = items[0];
  const cook = cooks.find((entry) => entry.id === firstItem?.cookId);
  const deliveryAddress = {
    label: "عنوان التوصيل",
    ...order.delivery,
  };
  const customerOrder = {
    id: order.orderNumber.toLocaleLowerCase(),
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    items,
    cook: { id: firstItem?.cookId, name: firstItem?.cookName, image: cook?.image ?? "" },
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    deliveryAddress,
    deliveryTime: order.deliveryTime,
    paymentMethod: order.paymentMethod,
    status: "Commande reçue",
  };

  const existing = readCustomerOrders();
  const nextOrders = [customerOrder, ...existing.filter((entry) => entry.orderNumber !== order.orderNumber)];
  return writeCustomerOrders(nextOrders);
}

export function readFavorites() {
  const favorites = readValue(CUSTOMER_STORAGE_KEYS.favorites, emptyFavorites);
  return Array.isArray(favorites) ? favorites : emptyFavorites;
}

export function writeFavorites(favorites) {
  return writeValue(CUSTOMER_STORAGE_KEYS.favorites, favorites);
}