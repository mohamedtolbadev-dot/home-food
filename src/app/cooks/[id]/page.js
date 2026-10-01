import { notFound } from "next/navigation";
import SiteHeader from "@/components/home/site-header";
import CookAbout from "@/components/cooks/cook-about";
import CookAvailability from "@/components/cooks/cook-availability";
import CookLocation from "@/components/cooks/cook-location";
import CookMealList from "@/components/cooks/cook-meal-list";
import CookProfileHeader from "@/components/cooks/cook-profile-header";
import CookReviews from "@/components/cooks/cook-reviews";
import CookTrustIndicators from "@/components/cooks/cook-trust-indicators";
import { cooks, meals } from "@/data/homepage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return cooks.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const cook = cooks.find((item) => item.id === id);
  return cook
    ? { title: `${cook.name} — طباخة من الحومة`, description: cook.introduction }
    : { title: "ما لقيناش الطباخة" };
}

export default async function CookProfilePage({ params }) {
  const { id } = await params;
  const cook = cooks.find((item) => item.id === id);
  if (!cook) notFound();

  const cookMeals = meals.filter((meal) => meal.cookId === cook.id);
  const availableToday = cookMeals.filter((meal) => meal.portionsAvailable > 0 && ["now", "today"].includes(meal.availability));

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--color-canvas)] pb-20 sm:pb-0">
        <CookProfileHeader cook={cook} />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.55fr_.75fr] lg:gap-14 lg:px-10">
          <div>
            <CookAbout cook={cook} />
            <CookMealList meals={availableToday} cookName={cook.name} />
            <CookAvailability days={cook.weeklyAvailability} />
            <CookReviews cook={cook} />
          </div>
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <CookLocation cook={cook} />
            <CookTrustIndicators cook={cook} />
          </aside>
        </div>
      </main>
      {availableToday.length > 0 && <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-[var(--color-canvas)] p-3 sm:hidden"><Link href="#plats-du-jour" className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-sm font-semibold text-white action-feedback">شوف الماكلة <ArrowRight size={15} aria-hidden="true" /></Link></div>}
      <footer className={`border-t border-[var(--color-line)] bg-[#f8f8f9] px-5 py-5 text-center text-[11px] text-[var(--color-muted)] sm:px-8 ${availableToday.length > 0 ? "pb-20 sm:pb-5" : ""}`}>البروفايل والآراء والتوفر غير أمثلة للتجربة.</footer>
    </>
  );
}
