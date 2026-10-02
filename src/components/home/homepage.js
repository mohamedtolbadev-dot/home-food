"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, Clock3, CookingPot,
  Heart, MapPin, Search, ShieldCheck, ShoppingBag, Soup,
} from "lucide-react";
import { cooks, meals } from "@/data/homepage";
import CookCard from "@/components/home/cook-card";
import MealCard from "@/components/home/meal-card";
import SiteHeader from "@/components/home/site-header";

const steps = [
  { icon: Search, number: "01", title: "شوف", description: "قلب على الماكلة لي وجدات اليوم الطباخات لي قراب ليك." },
  { icon: ShoppingBag, number: "02", title: "طلب", description: "ختار الوجبة ديالك وحجز الكمية لي بغيتي بسهولة." },
  { icon: Soup, number: "03", title: "بالصحة", description: "خد ماكلتك واجدة فالوقت والمكان لي اتفقتو عليهم." },
];

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const visibleMeals = useMemo(() => {
    const normalized = submittedTerm.trim().toLocaleLowerCase("ar-MA");
    if (!normalized) return meals;
    return meals.filter((meal) =>
      [meal.name, meal.description, meal.cook, meal.area].some((value) =>
        value.toLocaleLowerCase("ar-MA").includes(normalized),
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
          <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-x-3 gap-y-8 px-5 pb-16 pt-14 sm:gap-x-5 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.9fr)_minmax(0,.8fr)] lg:gap-x-8 lg:gap-y-0 lg:px-10 lg:pb-24 lg:pt-20">
            <div className="order-1 col-span-2 mx-auto w-full max-w-[680px] text-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
              <p className="mx-auto mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand)]"><span className="size-1.5 rounded-full bg-[var(--color-brand)]" /> بنين بحال ديال الدار</p>
              <h1 className="text-[2.75rem] font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-[4.1rem]">كتقلب على ماكلة ديال الدار؟ <span className="text-[var(--color-brand)]">راه قراب ليك.</span></h1>
              <p className="mx-auto mt-5 max-w-lg text-[15px] leading-7 text-[var(--color-muted)] sm:text-base sm:leading-7">شوف الماكلة لي كيوجدوها الطباخات ديال الحومة كل نهار. ماكلة بنينة وموجدة بعناية.</p>

              <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-[540px] flex-col gap-2 rounded-2xl border border-[var(--color-line)] bg-white p-2 sm:flex-row sm:items-center sm:gap-0">
                <label htmlFor="meal-search" className="sr-only">قلب على طبق ولا طباخة ولا حي</label>
                <span className="hidden pl-3 text-[var(--color-brand)] sm:block"><MapPin size={18} aria-hidden="true" /></span>
                <input
                  id="meal-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="طبق، طباخة ولا الحي…"
                  className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[#85858c]"
                />
                <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
                  <Search size={16} aria-hidden="true" /> قلب
                </button>
              </form>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-[var(--color-brand)]" aria-hidden="true" /> طباخات موثوقات</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-[var(--color-brand)]" aria-hidden="true" /> واجدة اليوم</span>
                <span className="inline-flex items-center gap-1.5"><Heart size={14} className="text-[var(--color-brand)]" aria-hidden="true" /> على خاطرك</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#plats-du-jour" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">شوف الماكلة <ArrowRight size={15} aria-hidden="true" /></a>
                <a href="#devenir-cuisinier" className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)]">كنطيب فالدار <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>

            <figure className="relative order-2 col-span-1 mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl bg-[#f1f1f2] lg:col-start-1 lg:row-start-1">
              <Image src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=950&q=90" alt="ماكلة مغربية ديال الدار فوق الميدة" width={950} height={1140} priority sizes="(max-width: 1024px) 42vw, 22vw" className="aspect-[1.08/1] w-full object-cover lg:aspect-[.84/1]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-white/95 px-3 py-3 sm:px-4 sm:py-3.5">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">وجدات هاد الصباح</p>
                <p className="mt-1 text-xs font-semibold sm:text-sm">غدا خديجة</p>
              </figcaption>
            </figure>

            <div className="contents lg:order-3 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:mx-auto lg:flex lg:w-full lg:max-w-[260px] lg:flex-col lg:gap-3">
              <figure className="order-3 col-span-1 mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl bg-[#f1f1f2] lg:order-none lg:col-span-1 lg:mx-0 lg:max-w-none">
                <Image src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85" alt="خضرة ومكونات طريين ديال طبق اليوم" width={700} height={625} sizes="(max-width: 1024px) 42vw, 22vw" className="aspect-[1.08/1] w-full object-cover lg:aspect-[1.12/1]" />
              </figure>
              <div className="order-4 col-span-2 rounded-2xl border border-[var(--color-line)] bg-white p-3.5 sm:p-4 lg:order-none lg:col-span-1">
                <div className="flex items-center gap-2 text-xs font-semibold"><span className="flex size-8 items-center justify-center rounded-full bg-[#f5f5f6] text-[var(--color-brand)]"><MapPin size={15} aria-hidden="true" /></span> حدّاك غير بخطوات</div>
                <p className="mt-2.5 text-[11px] leading-5 text-[var(--color-muted)]">طباخات ديال الحومة وماكلة موجدة بعناية.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="plats-du-jour" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">من الحومة للميدة ديالك</p>
                <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">الماكلة ديال اليوم</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">وجبات طايبين اليوم وكاينين حدّاك.</p>
              </div>
              <a href="#cuisinieres" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand)] hover:underline">تعرف على الطباخات <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
            {submittedTerm && <p className="mb-5 text-sm text-[var(--color-muted)]" aria-live="polite">{visibleMeals.length ? `${visibleMeals.length} طبق لقينا على « ${submittedTerm} »` : `ما لقينا حتى طبق على « ${submittedTerm} ».`} <button type="button" className="ml-2 font-semibold text-[var(--color-brand)] underline" onClick={() => { setSearchTerm(""); setSubmittedTerm(""); }}>مسح</button></p>}
            {visibleMeals.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">{visibleMeals.map((meal) => <MealCard key={meal.id} meal={meal} />)}</div> : <div className="rounded-2xl border border-dashed border-[var(--color-line)] px-5 py-12 text-center"><p className="text-sm font-semibold">ما كاين حتى طبق فهاد الحومة دابا.</p><p className="mt-2 text-sm text-[var(--color-muted)]">جرب تقلب على الرباط، أكدال ولا سميّة شي طبق.</p></div>}
            <p className="mt-5 text-[11px] leading-5 text-[var(--color-muted)]">الأطباق والتوفر غير أمثلة للتجربة.</p>
          </div>
        </section>

        <section id="cuisinieres" className="scroll-mt-20 border-y border-[var(--color-line)] bg-[#f8f8f9] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div className="max-w-md">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">الناس لي مور كل طبق</p>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">الطباخات لي قراب ليك</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">طباخات كيبغيو يشاركو معاك الماكلة ديالهم ووصفات كيعزو عليهم.</p>
              <a href="#devenir-cuisinier" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand)] hover:underline">عرف كثر <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
            <div className="card-surface rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-7">
              {cooks.slice(0, 3).map((cook) => <CookCard key={cook.id} cook={cook} />)}
            </div>
          </div>
        </section>

        <section id="comment-ca-marche" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto mb-10 max-w-xl text-center sm:mb-14">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">الأمر ساهل</p>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">وجبة بنينة فثلاث خطوات</h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">ختار الطبق لي عجبك وصافي.</p>
            </div>
            <div className="grid gap-7 sm:grid-cols-3 sm:gap-8">
              {steps.map(({ icon: Icon, number, title, description }) => <article key={number} className="border-t border-[var(--color-line)] pt-5 sm:pt-6"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold tracking-[0.12em] text-[var(--color-brand)]">{number}</span><Icon size={19} strokeWidth={1.7} className="text-[var(--color-muted)]" aria-hidden="true" /></div><h3 className="mt-5 text-lg font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[var(--color-muted)]">{description}</p></article>)}
            </div>
          </div>
        </section>

        <section id="devenir-cuisinier" className="scroll-mt-20 border-y border-[var(--color-line)] bg-[#f7f7f8] py-14 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">للي كيوجدو الماكلة</p>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">كتبغي تطيب؟ بيع الماكلة ديالك.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-muted)]">خلي الطبخ ديالك يولي خدمة، وقدم الماكلة ديال الدار لناس الحومة.</p>
            </div>
            <a href="#contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] px-5 text-sm font-semibold transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">سجل كطباخة <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <div className="max-w-2xl"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">وقت الغدا</p><h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">الغدا الجاي يكون ماكلة ديال الدار.</h2><p className="mt-2 text-sm text-[var(--color-muted)]">طبق واجد حدّاك، كولو فالوقت لي ناسبك.</p></div>
            <a href="#plats-du-jour" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">شوف الماكلة <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer id="footer" className="scroll-mt-16 border-t border-[var(--color-line)] bg-[#f8f8f9]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
            <div id="contact">
              <a href="#accueil" className="inline-flex items-center gap-2.5" aria-label="دار مطبخ، الرئيسية"><span className="flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white"><CookingPot size={17} aria-hidden="true" /></span><span className="text-base font-semibold tracking-[-0.04em]">دار مطبخ</span></a>
              <p className="mt-3 max-w-xs text-xs leading-5 text-[var(--color-muted)]">ماكلة ديال الحومة، طايبة بالقلب وقريبة ليك.</p>
              <a href="mailto:bonjour@darmatbakh.ma" className="mt-3 inline-block text-xs font-medium text-[var(--color-brand)] hover:underline">كتب لينا</a>
            </div>
            <div><h2 className="text-xs font-semibold">تصفح</h2><ul className="mt-3 space-y-2.5 text-xs text-[var(--color-muted)]"><li><a href="#plats-du-jour" className="hover:text-[var(--color-brand)]">الماكلة ديال اليوم</a></li><li><a href="#cuisinieres" className="hover:text-[var(--color-brand)]">الطباخات</a></li><li><a href="#comment-ca-marche" className="hover:text-[var(--color-brand)]">كيفاش خدامة</a></li></ul></div>
            <div><h2 className="text-xs font-semibold">للطباخات</h2><ul className="mt-3 space-y-2.5 text-xs text-[var(--color-muted)]"><li><a href="#devenir-cuisinier" className="hover:text-[var(--color-brand)]">انضم لدار مطبخ</a></li><li><a href="#devenir-cuisinier" className="hover:text-[var(--color-brand)]">التزاماتنا</a></li></ul></div>
            <div><h2 className="text-xs font-semibold">معلومات</h2><ul className="mt-3 space-y-2.5 text-xs text-[var(--color-muted)]"><li><a href="#mentions" className="hover:text-[var(--color-brand)]">الشروط القانونية</a></li><li><a href="#confidentialite" className="hover:text-[var(--color-brand)]">الخصوصية</a></li></ul></div>
          </div>
          <div className="mt-9 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4 text-[10px] leading-5 text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 دار مطبخ. تدار بعناية فالمغرب.</span><span id="mentions">الأطباق والبروفايلات غير أمثلة للتجربة.</span><span id="confidentialite" className="sr-only">معلومات الخصوصية غادي تزيد من بعد.</span></div>
        </div>
      </footer>
    </>
  );
}
