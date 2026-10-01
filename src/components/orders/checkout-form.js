"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, MapPin, UserRound } from "lucide-react";
import DeliveryLocationSelector from "@/components/orders/delivery-location-selector";
import DeliveryTimeSelector from "@/components/orders/delivery-time-selector";
import { deliveryAreas, deliveryTimes, getOrderTotals } from "@/data/order-options";
import { meals } from "@/data/homepage";
import { writeLastOrder } from "@/utils/order-storage";
import { validateCheckout } from "@/utils/checkout-validation";

const fieldClass = "h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]";

function FieldError({ children, id }) {
  return children ? <p id={id} className="mt-1.5 text-xs text-[var(--color-brand)]">{children}</p> : null;
}

export default function CheckoutForm({ items, onConfirmed, total }) {
  const router = useRouter();
  const firstItem = items[0];
  const initialCity = deliveryAreas[firstItem?.city] ? firstItem.city : "Rabat";
  const initialNeighborhood = deliveryAreas[initialCity].includes(firstItem?.neighborhood) ? firstItem.neighborhood : deliveryAreas[initialCity][0];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: initialCity,
    neighborhood: initialNeighborhood,
    address: "",
    instructions: "",
    deliveryTime: deliveryTimes.includes(firstItem?.deliveryTime) ? firstItem.deliveryTime : deliveryTimes[1],
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSubmitError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    const nextErrors = validateCheckout(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const orderItems = items.flatMap((item) => {
      const meal = meals.find((entry) => entry.id === item.mealId);
      return meal ? [{
        mealId: meal.id,
        cookId: meal.cookId,
        quantity: item.quantity,
        unitPrice: meal.price,
        mealSnapshot: { id: meal.id, cookId: meal.cookId, name: meal.name, cook: meal.cook, image: meal.image, imageAlt: meal.imageAlt },
      }] : [];
    });
    if (!orderItems.length) {
      setSubmitError("Cette commande ne contient plus de plats disponibles.");
      return;
    }

    const totals = getOrderTotals(orderItems);
    const order = {
      orderNumber: `HF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: { name: form.name.trim(), phone: form.phone.trim() },
      delivery: { city: form.city, neighborhood: form.neighborhood, address: form.address.trim(), instructions: form.instructions.trim() },
      deliveryTime: form.deliveryTime,
      paymentMethod: "Paiement à la livraison",
      items: orderItems,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      status: "received",
      createdAt: new Date().toISOString(),
    };

    if (!writeLastOrder(order)) {
      setSubmitError("Votre navigateur ne permet pas d’enregistrer la confirmation. Vérifiez ses réglages de stockage puis réessayez.");
      return;
    }
    onConfirmed();
    router.push("/checkout/confirmation");
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-7">
      <section aria-labelledby="contact-info-title">
        <div className="mb-4 flex items-center gap-2"><UserRound size={16} className="text-[var(--color-brand)]" aria-hidden="true" /><h2 id="contact-info-title" className="text-base font-semibold">Vos coordonnées</h2></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="mb-2 block text-xs font-semibold">Nom complet</span><input autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={`${fieldClass} ${errors.name ? "border-[var(--color-brand)]" : ""}`} placeholder="Votre nom" />{errors.name && <FieldError id="name-error">{errors.name}</FieldError>}</label>
          <label className="block"><span className="mb-2 block text-xs font-semibold">Téléphone</span><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={`${fieldClass} ${errors.phone ? "border-[var(--color-brand)]" : ""}`} placeholder="06 00 00 00 00" />{errors.phone && <FieldError id="phone-error">{errors.phone}</FieldError>}</label>
        </div>
      </section>

      <section aria-labelledby="delivery-info-title">
        <div className="mb-4 flex items-center gap-2"><MapPin size={16} className="text-[var(--color-brand)]" aria-hidden="true" /><h2 id="delivery-info-title" className="text-base font-semibold">Adresse de livraison</h2></div>
        <DeliveryLocationSelector city={form.city} neighborhood={form.neighborhood} onCityChange={(city) => { updateField("city", city); updateField("neighborhood", deliveryAreas[city][0]); }} onNeighborhoodChange={(value) => updateField("neighborhood", value)} cityError={errors.city} neighborhoodError={errors.neighborhood} compact />
        <label className="mt-4 block"><span className="mb-2 block text-xs font-semibold">Adresse</span><input autoComplete="street-address" value={form.address} onChange={(event) => updateField("address", event.target.value)} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "address-error" : undefined} className={`${fieldClass} ${errors.address ? "border-[var(--color-brand)]" : ""}`} placeholder="Rue, numéro, résidence…" />{errors.address && <FieldError id="address-error">{errors.address}</FieldError>}</label>
        <label className="mt-4 block"><span className="mb-2 block text-xs font-semibold">Instructions de livraison <span className="font-normal text-[var(--color-muted)]">(facultatif)</span></span><textarea value={form.instructions} onChange={(event) => updateField("instructions", event.target.value)} rows={2} className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Étage, point de repère…" /></label>
      </section>

      <section><DeliveryTimeSelector value={form.deliveryTime} onChange={(value) => updateField("deliveryTime", value)} mode="radio" error={errors.deliveryTime} /></section>

      <section aria-labelledby="payment-title" className="border-t border-[var(--color-line)] pt-5">
        <div className="mb-3 flex items-center gap-2"><Banknote size={16} className="text-[var(--color-brand)]" aria-hidden="true" /><h2 id="payment-title" className="text-base font-semibold">Paiement</h2></div>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-brand)] bg-white px-3.5"><input type="radio" name="payment" checked readOnly className="accent-[var(--color-brand)]" /><span className="text-sm">Paiement à la livraison</span></label>
        <p className="mt-2 text-[11px] text-[var(--color-muted)]">Aucun paiement en ligne n’est demandé dans cette démonstration.</p>
      </section>

      {submitError && <p role="alert" className="rounded-xl border border-[var(--color-line)] bg-[#f8f8f9] p-3 text-xs leading-5 text-[var(--color-brand)]">{submitError}</p>}
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Confirmer la commande · {total.toLocaleString("fr-FR")} DH</button>
      <p className="text-center text-[10px] leading-4 text-[var(--color-muted)]">Cette commande est une démonstration locale et ne sera pas transmise à un service de livraison.</p>
    </form>
  );
}
