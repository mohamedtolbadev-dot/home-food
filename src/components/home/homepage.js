"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Clock3, CookingPot,
  Heart, MapPin, Search, ShieldCheck, ShoppingBag, Soup,
} from "lucide-react";
import { cooks, meals } from "@/data/homepage";
import CookCard from "@/components/home/cook-card";
import MealCard from "@/components/home/meal-card";
import SiteHeader from "@/components/home/site-header";

const steps = [
  { icon: Search, number: "01", title: "Découvrez", description: "Explorez les plats préparés aujourd'hui par des cuisinières autour de vous." },
  { icon: ShoppingBag, number: "02", title: "Commandez", description: "Choisissez votre repas et réservez votre portion en quelques instants." },
  { icon: Soup, number: "03", title: "Savourez", description: "Récupérez votre plat frais à l'heure et au point convenus." },
];

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const visibleMeals = useMemo(() => {
    const normalized = submittedTerm.trim().toLocaleLowerCase("fr");
    if (!normalized) return meals;
    return meals.filter((meal) =>
      [meal.name, meal.description, meal.cook, meal.area].some((value) =>
        value.toLocaleLowerCase("fr").includes(normalized),
      ),
    );
  }, [submittedTerm]);

  function handleSearch(event) {
    event.preventDefault();
    setSubmittedTerm(searchTerm);
    document.getElementById("plats-du-jour")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <SiteHeader />
      <main id="accueil">
        <section className="border-b border-[var(--color-line)]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_.96fr] lg:gap-12 lg:px-10 lg:pb-24 lg:pt-20">
            <div className="max-w-xl">
              <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand)]"><span className="size-1.5 rounded-full bg-[var(--color-brand)]" /> Le fait maison, tout près</p>
              <h1 className="text-[2.75rem] font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-[4.1rem]">Le goût du fait maison, <span className="text-[var(--color-brand)]">près de vous.</span></h1>
              <p className="mt-5 max-w-lg text-[15px] leading-7 text-[var(--color-muted)] sm:text-base sm:leading-7">Découvrez des plats préparés aujourd’hui par des cuisinières de votre quartier. Un vrai repas, même quand vos journées vont vite.</p>

              <form onSubmit={handleSearch} className="mt-8 flex max-w-[540px] flex-col gap-2 rounded-2xl border border-[var(--color-line)] bg-white p-2 sm:flex-row sm:items-center sm:gap-0">
                <label htmlFor="meal-search" className="sr-only">Rechercher un plat, une cuisinière ou un quartier</label>
                <span className="hidden pl-3 text-[var(--color-brand)] sm:block"><MapPin size={18} aria-hidden="true" /></span>
                <input
                  id="meal-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Plat, cuisinière ou quartier…"
                  className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[#85858c]"
                />
                <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
                  <Search size={16} aria-hidden="true" /> Rechercher
                </button>
              </form>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-[var(--color-brand)]" aria-hidden="true" /> Cuisines vérifiées</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-[var(--color-brand)]" aria-hidden="true" /> Préparé aujourd’hui</span>
                <span className="inline-flex items-center gap-1.5"><Heart size={14} className="text-[var(--color-brand)]" aria-hidden="true" /> À votre rythme</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#plats-du-jour" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Découvrir les plats <ArrowRight size={15} aria-hidden="true" /></a>
                <a href="#devenir-cuisinier" className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)]">Je cuisine <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
              <div className="grid grid-cols-[1fr_.76fr] items-center gap-3 sm:gap-4">
                <figure className="relative overflow-hidden rounded-2xl bg-[#f1f1f2]">
                  <Image src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=950&q=90" alt="Un repas maison marocain dressé sur la table" width={950} height={1140} priority sizes="(max-width: 1024px) 60vw, 32vw" className="aspect-[.84/1] w-full object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-white/95 px-3 py-3 sm:px-4 sm:py-3.5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">Préparé ce matin</p>
                    <p className="mt-1 text-xs font-semibold sm:text-sm">Le déjeuner de Khadija</p>
                  </figcaption>
                </figure>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <figure className="overflow-hidden rounded-2xl bg-[#f1f1f2]">
                    <Image src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85" alt="Légumes et herbes fraîches pour un plat du jour" width={700} height={625} sizes="(max-width: 1024px) 35vw, 24vw" className="aspect-[1.12/1] w-full object-cover" />
                  </figure>
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold"><span className="flex size-8 items-center justify-center rounded-full bg-[#f5f5f6] text-[var(--color-brand)]"><MapPin size={15} aria-hidden="true" /></span> À deux pas de vous</div>
                    <p className="mt-2.5 text-[11px] leading-5 text-[var(--color-muted)]">Des cuisinières de quartier, des repas faits avec soin.</p>
                  </div>
                </div>
              </div>
              <a href="#plats-du-jour" className="absolute -bottom-5 left-4 inline-flex items-center gap-2 card-surface rounded-xl border border-[var(--color-line)] bg-white px-3.5 py-3 text-xs font-semibold sm:bottom-4 sm:left-[-2.5rem] sm:px-4"><span className="flex size-8 items-center justify-center rounded-full bg-[#f5f5f6] text-[var(--color-brand)]"><CookingPot size={16} aria-hidden="true" /></span> Fait maison, chaque jour <ArrowDown size={14} className="ml-1 text-[var(--color-muted)]" aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="plats-du-jour" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">Du quartier à votre table</p>
                <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">Les plats du jour</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">Des repas préparés aujourd’hui, disponibles près de vous.</p>
              </div>
              <a href="#cuisinieres" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand)] hover:underline">Rencontrer les cuisinières <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
            {submittedTerm && <p className="mb-5 text-sm text-[var(--color-muted)]" aria-live="polite">{visibleMeals.length ? `${visibleMeals.length} plat${visibleMeals.length > 1 ? "s" : ""} trouvé${visibleMeals.length > 1 ? "s" : ""} pour « ${submittedTerm} »` : `Aucun plat trouvé pour « ${submittedTerm} ».`} <button type="button" className="ml-2 font-semibold text-[var(--color-brand)] underline" onClick={() => { setSearchTerm(""); setSubmittedTerm(""); }}>Effacer</button></p>}
            {visibleMeals.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">{visibleMeals.map((meal) => <MealCard key={meal.id} meal={meal} />)}</div> : <div className="rounded-2xl border border-dashed border-[var(--color-line)] px-5 py-12 text-center"><p className="text-sm font-semibold">Pas encore de plat dans ce quartier.</p><p className="mt-2 text-sm text-[var(--color-muted)]">Essayez « Rabat », « Agdal » ou le nom d’un plat.</p></div>}
            <p className="mt-5 text-[11px] leading-5 text-[var(--color-muted)]">Exemples de plats et disponibilités présentés à titre de démonstration.</p>
          </div>
        </section>

        <section id="cuisinieres" className="scroll-mt-20 border-y border-[var(--color-line)] bg-[#f8f8f9] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div className="max-w-md">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">Des mains derrière chaque plat</p>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">Des cuisinières près de vous</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Des personnes passionnées qui partagent leur cuisine et les recettes qu’elles aiment préparer.</p>
              <a href="#devenir-cuisinier" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand)] hover:underline">En savoir plus <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
            <div className="card-surface rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-7">
              {cooks.slice(0, 3).map((cook) => <CookCard key={cook.id} cook={cook} />)}
            </div>
          </div>
        </section>

        <section id="comment-ca-marche" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto mb-10 max-w-xl text-center sm:mb-14">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">Simple comme bonjour</p>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">Un bon repas, en trois étapes</h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">Vous choisissez le plat qui vous fait envie. C’est tout.</p>
            </div>
            <div className="grid gap-7 sm:grid-cols-3 sm:gap-8">
              {steps.map(({ icon: Icon, number, title, description }) => <article key={number} className="border-t border-[var(--color-line)] pt-5 sm:pt-6"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold tracking-[0.12em] text-[var(--color-brand)]">{number}</span><Icon size={19} strokeWidth={1.7} className="text-[var(--color-muted)]" aria-hidden="true" /></div><h3 className="mt-5 text-lg font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[var(--color-muted)]">{description}</p></article>)}
            </div>
          </div>
        </section>

        <section id="devenir-cuisinier" className="scroll-mt-20 border-y border-[var(--color-line)] bg-[#f7f7f8] py-14 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">Pour celles et ceux qui cuisinent</p>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">Vous cuisinez avec passion ? Vendez vos plats.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-muted)]">Transformez votre cuisine en activité et proposez vos plats faits maison aux personnes de votre quartier.</p>
            </div>
            <a href="#contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] px-5 text-sm font-semibold transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">Devenir cuisinière <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <div className="max-w-2xl"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">À l’heure du déjeuner</p><h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">Votre prochain déjeuner peut être fait maison.</h2><p className="mt-2 text-sm text-[var(--color-muted)]">Un plat préparé près de vous, à savourer quand vous le souhaitez.</p></div>
            <a href="#plats-du-jour" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Découvrir les plats <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer id="footer" className="scroll-mt-16 border-t border-[var(--color-line)] bg-[#f8f8f9]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
            <div id="contact">
              <a href="#accueil" className="inline-flex items-center gap-2.5" aria-label="Dar Matbakh, accueil"><span className="flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white"><CookingPot size={17} aria-hidden="true" /></span><span className="text-base font-semibold tracking-[-0.04em]">dar matbakh</span></a>
              <p className="mt-3 max-w-xs text-xs leading-5 text-[var(--color-muted)]">La cuisine de quartier, préparée avec cœur et partagée près de chez vous.</p>
              <a href="mailto:bonjour@darmatbakh.ma" className="mt-3 inline-block text-xs font-medium text-[var(--color-brand)] hover:underline">Nous écrire</a>
            </div>
            <div><h2 className="text-xs font-semibold">Découvrir</h2><ul className="mt-3 space-y-2.5 text-xs text-[var(--color-muted)]"><li><a href="#plats-du-jour" className="hover:text-[var(--color-brand)]">Les plats du jour</a></li><li><a href="#cuisinieres" className="hover:text-[var(--color-brand)]">Les cuisinières</a></li><li><a href="#comment-ca-marche" className="hover:text-[var(--color-brand)]">Comment ça marche</a></li></ul></div>
            <div><h2 className="text-xs font-semibold">Pour les cuisinières</h2><ul className="mt-3 space-y-2.5 text-xs text-[var(--color-muted)]"><li><a href="#devenir-cuisinier" className="hover:text-[var(--color-brand)]">Rejoindre Dar Matbakh</a></li><li><a href="#devenir-cuisinier" className="hover:text-[var(--color-brand)]">Nos engagements</a></li></ul></div>
            <div><h2 className="text-xs font-semibold">Informations</h2><ul className="mt-3 space-y-2.5 text-xs text-[var(--color-muted)]"><li><a href="#mentions" className="hover:text-[var(--color-brand)]">Mentions légales</a></li><li><a href="#confidentialite" className="hover:text-[var(--color-brand)]">Confidentialité</a></li></ul></div>
          </div>
          <div className="mt-9 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4 text-[10px] leading-5 text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Dar Matbakh. Fait avec soin au Maroc.</span><span id="mentions">Exemples de plats et profils à titre de démonstration.</span><span id="confidentialite" className="sr-only">Informations de confidentialité à venir.</span></div>
        </div>
      </footer>
    </>
  );
}
