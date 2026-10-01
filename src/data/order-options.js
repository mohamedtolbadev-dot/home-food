export const CART_STORAGE_KEY = "homefood_cart";
export const LAST_ORDER_STORAGE_KEY = "homefood_last_order";
export const DELIVERY_FEE_DH = 10;

export const deliveryTimes = [
  "12:00 – 12:30",
  "12:30 – 13:00",
  "13:00 – 13:30",
  "13:30 – 14:00",
];

export const deliveryAreas = {
  Rabat: ["Agdal", "Hassan", "Hay Riad", "L'Océan", "Souissi"],
  Casablanca: ["Maarif", "Gauthier", "Bourgogne", "Anfa"],
  Fès: ["Ville Nouvelle", "Saïss", "Médina", "Narjiss"],
};

export function getOrderTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = items.length ? DELIVERY_FEE_DH : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
