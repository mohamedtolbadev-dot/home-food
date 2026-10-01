import { deliveryAreas, deliveryTimes } from "@/data/order-options";

export function validateCheckout(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Indiquez votre nom complet.";
  const digits = form.phone.replace(/\D/g, "");
  if (!/^[+()\d\s.-]+$/.test(form.phone) || digits.length < 8 || digits.length > 15) errors.phone = "Entrez un numéro de téléphone valide.";
  if (!Object.hasOwn(deliveryAreas, form.city)) errors.city = "Choisissez une ville.";
  if (!(deliveryAreas[form.city] ?? []).includes(form.neighborhood)) errors.neighborhood = "Choisissez un quartier.";
  if (form.address.trim().length < 5) errors.address = "Indiquez une adresse de livraison complète.";
  if (!deliveryTimes.includes(form.deliveryTime)) errors.deliveryTime = "Choisissez un créneau de livraison.";
  return errors;
}
