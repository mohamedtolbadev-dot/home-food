import { deliveryAreas, deliveryTimes } from "@/data/order-options";

export function validateCheckout(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "دخل سميتك كاملة.";
  const digits = form.phone.replace(/\D/g, "");
  if (!/^[+()\d\s.-]+$/.test(form.phone) || digits.length < 8 || digits.length > 15) errors.phone = "دخل رقم هاتف صحيح.";
  if (!Object.hasOwn(deliveryAreas, form.city)) errors.city = "ختار المدينة.";
  if (!(deliveryAreas[form.city] ?? []).includes(form.neighborhood)) errors.neighborhood = "ختار الحي.";
  if (form.address.trim().length < 5) errors.address = "دخل عنوان التوصيل كامل.";
  if (!deliveryTimes.includes(form.deliveryTime)) errors.deliveryTime = "ختار وقت التوصيل.";
  return errors;
}
