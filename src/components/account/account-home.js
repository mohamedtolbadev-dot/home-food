"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import OrderCard from "@/components/account/order-card";
import ProfileCard from "@/components/account/profile-card";
import { readCustomer, readCustomerOrders, writeCustomer } from "@/utils/customer-storage";

export default function AccountHome() {
  const [customer, setCustomer] = useState(readCustomer);
  const [orders, setOrders] = useState([]);
  const [editSection, setEditSection] = useState("");
  const [draft, setDraft] = useState(customer);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const storedCustomer = readCustomer();
      setCustomer(storedCustomer);
      setDraft(storedCustomer);
      setOrders(readCustomerOrders());
    });
    return () => { cancelled = true; };
  }, []);

  const activeOrder = orders.find((order) => !["Livrée", "Annulée"].includes(order.status));

  function openEditor(section) {
    setDraft(customer);
    setEditSection(section);
    setError("");
    setSaved(false);
  }

  function saveProfile(event) {
    event.preventDefault();
    if (editSection === "profile" && !draft.name.trim()) {
      setError("Renseignez votre nom complet.");
      return;
    }
    if (!draft.phone.trim() || !/^\S+@\S+\.\S+$/.test(draft.email.trim())) {
      setError("Renseignez un téléphone et une adresse e-mail valides.");
      return;
    }
    const nextCustomer = { ...draft, name: draft.name.trim(), phone: draft.phone.trim(), email: draft.email.trim() };
    if (!writeCustomer(nextCustomer)) {
      setError("Impossible d’enregistrer les modifications dans ce navigateur.");
      return;
    }
    setCustomer(nextCustomer);
    setEditSection("");
    setSaved(true);
  }

  return (
    <CustomerAccountLayout title="Mon profil" description="Vos informations et votre activité sur Dar Matbakh.">
      <div className="space-y-5">
        {editSection && <form onSubmit={saveProfile} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">Modifier</p><h2 className="mt-1 text-lg font-semibold text-[var(--color-ink)]">{editSection === "profile" ? "Mon profil" : "Mes coordonnées"}</h2></div>
            <button type="button" onClick={() => setEditSection("")} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-[var(--color-muted)] hover:bg-[#f8f8f9]">Annuler</button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {editSection === "profile" && <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">Nom complet</span><input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]" autoComplete="name" /></label>}
            <label className="block"><span className="mb-2 block text-xs font-semibold">Téléphone</span><input type="tel" value={draft.phone} onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]" autoComplete="tel" /></label>
            <label className="block"><span className="mb-2 block text-xs font-semibold">E-mail</span><input type="email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]" autoComplete="email" /></label>
          </div>
          {error && <p role="alert" className="mt-3 text-xs text-[var(--color-brand)]">{error}</p>}
          <button type="submit" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)]">Enregistrer</button>
        </form>}

        {saved && <p role="status" className="rounded-xl border border-[var(--color-line)] bg-[#f8f8f9] px-3 py-2 text-xs text-[var(--color-ink)]">Votre profil a été mis à jour.</p>}
        <ProfileCard customer={customer} onEditProfile={() => openEditor("profile")} onEditContact={() => openEditor("contact")} />

        <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">Livraison</p><h2 className="mt-1 text-base font-semibold text-[var(--color-ink)]">Mes adresses enregistrées</h2></div>
            <Link href="/account/addresses" className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--color-line)] px-3 text-xs font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">Gérer mes adresses <ArrowRight size={13} aria-hidden="true" /></Link>
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[var(--color-muted)]"><MapPin size={15} className="mt-1 shrink-0" aria-hidden="true" />{customer.neighborhood}, {customer.city}</p>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">Commandes</p><h2 className="mt-1 text-base font-semibold text-[var(--color-ink)]">Votre commande en cours</h2></div><Link href="/account/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand)]">Toutes les commandes <ArrowRight size={13} aria-hidden="true" /></Link></div>
          {activeOrder ? <OrderCard order={activeOrder} /> : <EmptyState type="orders" message="Aucune commande en cours." explanation="Vos prochaines commandes et leur suivi apparaîtront ici." cta="Découvrir les plats" href="/meals" />}
        </section>
      </div>
    </CustomerAccountLayout>
  );
}