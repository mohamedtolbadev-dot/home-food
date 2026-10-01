"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChartColumnBig, ChefHat, Clock3, MapPin, PencilLine, Plus, ShoppingBag } from "lucide-react";
import CookHeader from "@/components/cook/cook-header";
import CookMealCard from "@/components/cook/cook-meal-card";
import CookOrderList from "@/components/cook/cook-order-list";
import CookSidebar from "@/components/cook/cook-sidebar";
import CookStatCard from "@/components/cook/cook-stat-card";
import MealForm from "@/components/cook/meal-form";
import { readCookMeals, readCookOrders, readCookProfile, writeCookMeals, writeCookOrders } from "@/utils/cook-storage";

const navItems = [
  { href: "#overview", label: "Tableau de bord" },
  { href: "#meals", label: "Mes plats" },
  { href: "#orders", label: "Commandes" },
  { href: "#availability", label: "Disponibilités" },
  { href: "#profile", label: "Mon profil" },
];

export default function CookDashboard() {
  const [profile, setProfile] = useState(readCookProfile);
  const [meals, setMeals] = useState(readCookMeals);
  const [orders, setOrders] = useState(readCookOrders);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMealFormOpen, setIsMealFormOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);

  useEffect(() => {
    setProfile(readCookProfile());
    setMeals(readCookMeals());
    setOrders(readCookOrders());
  }, []);

  useEffect(() => {
    writeCookMeals(meals);
  }, [meals]);

  useEffect(() => {
    writeCookOrders(orders);
  }, [orders]);

  const today = useMemo(() => new Date(), []);
  const todayKey = today.toISOString().slice(0, 10);

  const overview = useMemo(() => {
    const todaysOrders = orders.filter((order) => order.createdAt?.slice(0, 10) === todayKey);
    const todaysMeals = meals.filter((meal) => meal.createdAt?.slice(0, 10) === todayKey);
    const availablePortions = meals.reduce((total, meal) => total + Number(meal.quantityAvailable || 0), 0);
    const todaysRevenue = todaysOrders.reduce((total, order) => total + Number(order.total || 0), 0);

    return {
      todaysOrders: todaysOrders.length,
      mealsPublishedToday: todaysMeals.length,
      availablePortions,
      todaysRevenue,
    };
  }, [meals, orders, todayKey]);

  function handleMealSubmit(nextMeal) {
    const safeMeal = {
      ...nextMeal,
      quantityAvailable: Number(nextMeal.quantityAvailable),
      price: Number(nextMeal.price),
    };

    setMeals((currentMeals) => {
      const exists = currentMeals.some((meal) => meal.id === safeMeal.id);
      if (!exists) return [safeMeal, ...currentMeals];
      return currentMeals.map((meal) => (meal.id === safeMeal.id ? safeMeal : meal));
    });
    setIsMealFormOpen(false);
    setEditingMeal(null);
  }

  function handleOrderStatusChange(orderId, nextStatus) {
    setOrders((currentOrders) => currentOrders.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order)));
  }

  function openCreateMealModal() {
    setEditingMeal(null);
    setIsMealFormOpen(true);
  }

  function openEditMealModal(meal) {
    setEditingMeal(meal);
    setIsMealFormOpen(true);
  }

  return (
    <>
      <CookHeader title="Mon tableau de bord" mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} navItems={navItems} />

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <div className="flex gap-8">
          <CookSidebar />

          <div className="min-w-0 flex-1 space-y-6">
            <section id="overview" className="rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative size-14 overflow-hidden rounded-full border border-[var(--color-line)] bg-[#f8f8f9]">
                    {profile?.photo ? <img src={profile.photo} alt="Votre photo" className="h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-[var(--color-muted)]">PP</span>}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Bienvenue</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">{profile ? `${profile.firstName} ${profile.lastName}` : "Votre profil"}</h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={openCreateMealModal} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
                    <Plus size={15} aria-hidden="true" /> Ajouter un plat
                  </button>
                  <Link href="/cook/onboarding" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">
                    <PencilLine size={15} aria-hidden="true" /> Modifier mon profil
                  </Link>
                </div>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <CookStatCard label="Commandes aujourd'hui" value={overview.todaysOrders} helper="Réceptionnées" accent />
              <CookStatCard label="Plats publiés" value={overview.mealsPublishedToday} helper="Aujourd’hui" />
              <CookStatCard label="Portions dispo." value={overview.availablePortions} helper="En stock" />
              <CookStatCard label="Revenus estimés" value={`${overview.todaysRevenue} DH`} helper="Aujourd’hui" />
            </section>

            <section id="meals" className="rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Aujourd’hui</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">Mes plats</h2>
                </div>
                <button type="button" onClick={openCreateMealModal} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">
                  <Plus size={14} aria-hidden="true" /> Ajouter un plat
                </button>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {meals.map((meal) => <CookMealCard key={meal.id} meal={meal} onEdit={openEditMealModal} />)}
              </div>
            </section>

            <section id="orders" className="rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Suivi</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">Commandes</h2>
                </div>
                <button type="button" onClick={() => document.getElementById("orders")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">
                  <ShoppingBag size={14} aria-hidden="true" /> Voir les commandes
                </button>
              </div>
              <div className="mt-5">
                <CookOrderList orders={orders} onStatusChange={handleOrderStatusChange} />
              </div>
            </section>

            <section id="availability" className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
                <div className="flex items-center gap-2 text-[var(--color-brand)]">
                  <CalendarDays size={15} aria-hidden="true" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Disponibilités</p>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">Planning</h3>
                <div className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                  <p><span className="font-semibold text-[var(--color-ink)]">Jours :</span> {profile?.availabilityDays?.join(", ") || "À définir"}</p>
                  <p><span className="font-semibold text-[var(--color-ink)]">Horaires :</span> {profile?.availabilityHours || "À définir"}</p>
                  <p><span className="font-semibold text-[var(--color-ink)]">Portions :</span> {profile?.portionsPerDay || 0} / jour</p>
                </div>
              </div>

              <div id="profile" className="rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
                <div className="flex items-center gap-2 text-[var(--color-brand)]">
                  <ChartColumnBig size={15} aria-hidden="true" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Mon profil</p>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">Présentation</h3>
                <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-[#f8f8f9] p-3">
                  <p className="text-sm leading-6 text-[var(--color-ink)]">{profile?.description || "Votre description cuisine apparaîtra ici."}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(profile?.specialties || []).map((specialty) => (
                      <span key={specialty} className="rounded-full border border-[var(--color-line)] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{specialty}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted)]">
                  <span className="inline-flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" /> {profile?.neighborhood || "Quartier"}, {profile?.city || "Ville"}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 size={12} aria-hidden="true" /> {profile?.availabilityHours || "Horaires"}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {isMealFormOpen && (
        <MealForm
          initialData={editingMeal}
          onClose={() => {
            setIsMealFormOpen(false);
            setEditingMeal(null);
          }}
          onSubmit={handleMealSubmit}
        />
      )}
    </>
  );
}
