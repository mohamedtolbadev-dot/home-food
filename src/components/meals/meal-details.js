"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BadgeCheck, Clock3, MapPin, Star } from "lucide-react";
import SiteHeader from "@/components/home/site-header";
import DeliveryLocationSelector from "@/components/orders/delivery-location-selector";
import DeliveryTimeSelector from "@/components/orders/delivery-time-selector";
import OrderSummary from "@/components/orders/order-summary";
import QuantitySelector from "@/components/orders/quantity-selector";
import { deliveryAreas, deliveryTimes, getOrderTotals } from "@/data/order-options";
import { useOrder } from "@/context/order-context";

export default function MealDetails({ meal }) {
  const router = useRouter();
  const { items, isReady, addItem } = useOrder();
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [deliveryTime, setDeliveryTime] = useState(deliveryTimes[1]);
  const cityInMealArea = meal.area.split(",").at(-1).trim();
  const [city, setCity] = useState(Object.hasOwn(deliveryAreas, cityInMealArea) ? cityInMealArea : "Rabat");
  const areaInMeal = meal.area.split(",")[0].trim();
  const [neighborhood, setNeighborhood] = useState(deliveryAreas[cityInMealArea]?.includes(areaInMeal) ? areaInMeal : deliveryAreas.Rabat[0]);
  const [message, setMessage] = useState("");
  const currentQuantity = items.find((item) => item.mealId === meal.id)?.quantity ?? 0;
  const remainingQuantity = Math.max(0, meal.portionsAvailable - currentQuantity);
  const quantity = Math.min(requestedQuantity, remainingQuantity);
  const isSoldOut = meal.portionsAvailable === 0;
  const availabilityLabel = isSoldOut
    ? "Épuisé"
    : meal.availability === "preorder"
      ? "Disponible en précommande"
      : meal.availability === "today"
        ? "Préparé pour aujourd'hui"
        : "Disponible aujourd'hui";

  const summaryItems = useMemo(() => {
    if (quantity <= 0) return items;
    let didMergeCurrentMeal = false;
    const nextItems = items.map((item) => {
      if (item.mealId !== meal.id) return item;
      didMergeCurrentMeal = true;
      return { ...item, quantity: item.quantity + quantity };
    });
    if (!didMergeCurrentMeal) nextItems.push({ mealId: meal.id, cookId: meal.cookId, unitPrice: meal.price, quantity });
    return nextItems;
  }, [items, meal, quantity]);
  const orderTotal = getOrderTotals(summaryItems).total;

  function handleOrder() {
    if (!isReady) return;
    if (isSoldOut) {
      setMessage("Ce plat n'est plus disponible.");
      return;
    }
    if (quantity < 1) {
      setMessage(`Vous avez déjà ajouté les ${currentQuantity} portions disponibles.`);
      return;
    }
    const result = addItem(meal, quantity, { deliveryTime, city, neighborhood });
    if (!result.ok) {
      setMessage(result.reason === "limit" ? `Il ne reste que ${remainingQuantity} portion${remainingQuantity === 1 ? "" : "s"} disponible${remainingQuantity === 1 ? "" : "s"}.` : "Ce plat n'est plus disponible.");
      return;
    }
    router.push("/checkout");
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[75vh] max-w-7xl px-5 pb-24 pt-7 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10">
        <Link href="/meals" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand)]"><ArrowLeft size={15} aria-hidden="true" /> Tous les plats</Link>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="relative aspect-[1.15/1] overflow-hidden rounded-2xl bg-[#f1f1f2] sm:aspect-[1.25/1] lg:col-start-1 lg:row-start-1">
            <Image src={meal.image} alt={meal.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-[var(--color-canvas)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em]">Fait maison</span>
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:pt-1">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">{meal.category} · {meal.area}</p>
            <h1 className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">{meal.name}</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{meal.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[var(--color-line)] pb-5 text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium"><Star size={14} fill="currentColor" className="text-[var(--color-brand)]" aria-hidden="true" /> {meal.rating.toLocaleString("fr-FR")}</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]"><MapPin size={14} aria-hidden="true" /> {meal.distance} · {meal.area}</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]"><Clock3 size={14} aria-hidden="true" /> {meal.readyAt}</span>
            </div>

            <div className="flex items-center gap-3 border-b border-[var(--color-line)] py-5">
              <Image src={meal.cookAvatar} alt={`Portrait de ${meal.cook}`} width={48} height={48} className="size-12 rounded-full border border-[var(--color-line)] object-cover" />
              <div className="min-w-0 flex-1"><Link href={`/cooks/${meal.cookId}`} className="text-sm font-semibold hover:text-[var(--color-brand)]">{meal.cook}</Link><p className="mt-1 text-xs text-[var(--color-muted)]">Cuisinière locale · {meal.area}</p></div>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--color-brand)]"><BadgeCheck size={14} aria-hidden="true" /> Profil vérifié</span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <p className="text-2xl font-semibold tracking-[-0.04em]">{meal.price} <span className="text-sm font-medium tracking-normal text-[var(--color-muted)]">DH / portion</span></p>
              <span className={`text-xs font-medium ${isSoldOut ? "text-[var(--color-muted)]" : meal.portionsAvailable <= 2 ? "text-[var(--color-brand)]" : "text-[var(--color-ink)]"}`}>
                {isSoldOut ? "Épuisé" : meal.portionsAvailable <= 2 ? `Plus que ${remainingQuantity} portions` : `${remainingQuantity} portions disponibles`}
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">{availabilityLabel}</p>

            {!isSoldOut && <div className="mt-4 border-y border-[var(--color-line)] py-4"><QuantitySelector value={quantity} max={remainingQuantity} onChange={setRequestedQuantity} /></div>}
            {currentQuantity > 0 && <p className="mt-2 text-xs text-[var(--color-muted)]">Déjà dans votre commande : {currentQuantity} portion{currentQuantity > 1 ? "s" : ""}.</p>}
            {remainingQuantity === 0 && !isSoldOut && <p className="mt-3 text-xs text-[var(--color-brand)]">Vous avez déjà ajouté toutes les portions disponibles.</p>}

            <div className="mt-5 space-y-4">
              <DeliveryTimeSelector value={deliveryTime} onChange={setDeliveryTime} />
              <div><p className="mb-2 text-xs font-semibold">Votre zone de livraison</p><DeliveryLocationSelector city={city} neighborhood={neighborhood} onCityChange={(nextCity) => { setCity(nextCity); setNeighborhood(deliveryAreas[nextCity][0]); }} onNeighborhoodChange={setNeighborhood} compact /></div>
            </div>

            <div className="mt-5"><OrderSummary items={summaryItems} compact /></div>
            {isSoldOut ? <p className="mt-4 rounded-xl border border-[var(--color-line)] bg-[#f8f8f9] p-3 text-xs text-[var(--color-muted)]">Ce plat est épuisé et ne peut pas être commandé.</p> : <button type="button" onClick={handleOrder} disabled={!isReady || remainingQuantity < 1} className="mt-5 hidden min-h-12 w-full items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] disabled:cursor-not-allowed disabled:bg-[#d1d1d6] sm:inline-flex action-feedback">{!isReady ? "Chargement…" : "Commander"}</button>}
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs leading-5 text-[var(--color-brand)]">{message}</p>
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <section className="border-t border-[var(--color-line)] pt-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Ingrédients</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Préparé avec des ingrédients sélectionnés par {meal.cook}.</p>
              <ul className="mt-4 flex flex-wrap gap-2">{meal.ingredients.map((ingredient) => <li key={ingredient} className="rounded-xl border border-[var(--color-line)] bg-white px-3 py-2 text-xs text-[var(--color-ink)]">{ingredient}</li>)}</ul>
            </section>
            <section className="mt-7 border-t border-[var(--color-line)] pt-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Préparé avec soin</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Un plat cuisiné en petite quantité dans une cuisine de quartier. Comptez environ {meal.preparationMinutes} minutes de préparation. {meal.readyAt}.</p>
            </section>
          </div>
        </div>
      </main>
      {!isSoldOut && <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-[var(--color-canvas)] p-3 sm:hidden"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3"><div><p className="text-[10px] text-[var(--color-muted)]">Total avec livraison</p><p className="text-sm font-semibold">{orderTotal.toLocaleString("fr-FR")} DH</p></div><button type="button" onClick={handleOrder} disabled={!isReady || remainingQuantity < 1} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#d1d1d6] action-feedback">Commander</button></div></div>}
      <footer className={`border-t border-[var(--color-line)] bg-[#f8f8f9] px-5 py-5 text-center text-[11px] text-[var(--color-muted)] sm:px-8 ${isSoldOut ? "" : "pb-20 sm:pb-5"}`}>Plats et disponibilités à titre de démonstration.</footer>
    </>
  );
}
