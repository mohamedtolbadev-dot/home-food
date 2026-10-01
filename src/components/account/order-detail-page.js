"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import OrderStatusTimeline from "@/components/account/order-status-timeline";
import { readCustomerOrders } from "@/utils/customer-storage";

export default function OrderDetailPage({ orderId }) {
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const found = readCustomerOrders().find((entry) => entry.id === decodeURIComponent(orderId) || entry.orderNumber === decodeURIComponent(orderId));
      setOrder(found ?? null);
      setReady(true);
    });
    return () => { cancelled = true; };
  }, [orderId]);

  if (!ready) return <CustomerAccountLayout title="Détail de la commande"><p className="text-sm text-[var(--color-muted)]">Chargement…</p></CustomerAccountLayout>;
  if (!order) return <CustomerAccountLayout title="Commande introuvable"><EmptyState type="orders" message="Cette commande est introuvable." explanation="Elle n’est peut-être plus enregistrée sur cet appareil." cta="Voir mes commandes" href="/account/orders" /></CustomerAccountLayout>;

  const orderDate = new Date(order.createdAt).toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <CustomerAccountLayout title="Détail de la commande" description={`${order.orderNumber} · ${orderDate}`}>
      <div className="space-y-4">
        <Link href="/account/orders" className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand)]"><ArrowLeft size={14} aria-hidden="true" /> Retour aux commandes</Link>
        <OrderStatusTimeline status={order.status} />

        <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex items-center gap-2 border-b border-[var(--color-line)] pb-3"><UserRound size={15} className="text-[var(--color-brand)]" aria-hidden="true" /><h2 className="text-sm font-semibold">Plats et cuisinière</h2></div>
          <div className="mt-4 flex min-w-0 items-center gap-3">
            {order.cook.image && <Image src={order.cook.image} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full border border-[var(--color-line)] object-cover" />}
            <div className="min-w-0"><p className="text-xs text-[var(--color-muted)]">Préparé par</p><p className="break-words text-sm font-semibold">{order.cook.name}</p></div>
          </div>
          <div className="mt-4 space-y-3">
            {order.items.map((item, index) => <div key={`${item.mealId}-${index}`} className="flex min-w-0 gap-3 border-t border-[var(--color-line)] pt-3">
              {item.image && <Image src={item.image} alt="" width={60} height={60} className="size-[60px] shrink-0 rounded-xl border border-[var(--color-line)] object-cover" />}
              <div className="min-w-0 flex-1"><h3 className="break-words text-sm font-semibold">{item.name}</h3><p className="mt-1 text-xs text-[var(--color-muted)]">Quantité : {item.quantity}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{item.unitPrice} DH l’unité</p></div>
              <p className="shrink-0 text-sm font-semibold">{item.unitPrice * item.quantity} DH</p>
            </div>)}
          </div>
          <div className="mt-4 space-y-2 border-t border-[var(--color-line)] pt-4 text-xs">
            <p className="flex justify-between gap-3 text-[var(--color-muted)]"><span>Sous-total</span><span className="font-medium text-[var(--color-ink)]">{order.subtotal} DH</span></p>
            <p className="flex justify-between gap-3 text-[var(--color-muted)]"><span>Frais de livraison</span><span className="font-medium text-[var(--color-ink)]">{order.deliveryFee} DH</span></p>
            <p className="flex justify-between gap-3 border-t border-[var(--color-line)] pt-2 text-sm font-semibold"><span>Total</span><span>{order.total} DH</span></p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
            <div className="flex items-center gap-2"><MapPin size={15} className="text-[var(--color-brand)]" aria-hidden="true" /><h2 className="text-sm font-semibold">Livraison</h2></div>
            <p className="mt-3 break-words text-sm font-medium leading-6">{order.deliveryAddress.address}</p>
            <p className="break-words text-xs text-[var(--color-muted)]">{order.deliveryAddress.neighborhood}, {order.deliveryAddress.city}</p>
            {order.deliveryAddress.instructions && <p className="mt-2 break-words text-xs leading-5 text-[var(--color-muted)]">{order.deliveryAddress.instructions}</p>}
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Créneau</p><p className="mt-1 text-sm font-medium">{order.deliveryTime}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold">Paiement</h2>
            <p className="mt-3 text-xs text-[var(--color-muted)]">Méthode</p><p className="mt-1 break-words text-sm font-medium">{order.paymentMethod}</p>
            <p className="mt-4 text-[10px] leading-5 text-[var(--color-muted)]">Les informations de paiement sont conservées localement pour cette démonstration. Aucun paiement réel n’est effectué.</p>
          </div>
        </section>
      </div>
    </CustomerAccountLayout>
  );
}