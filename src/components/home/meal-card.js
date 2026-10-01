import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";
import FavoriteButton from "@/components/account/favorite-button";

export default function MealCard({ meal }) {
  return (
    <article className="group card-surface card-interactive overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white hover:border-[#dedee2]">
      <div className="relative">
        <Link href={`/meals/${meal.id}`} aria-label={`شوف ${meal.name}`} className="relative block aspect-[1.38/1] overflow-hidden bg-[#f1f1f2]">
          <Image src={meal.image} alt={meal.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-canvas)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink)]">ماكلة ديال الدار</span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-canvas)] px-2 py-1.5 text-xs font-semibold"><Star size={12} fill="currentColor" className="text-[var(--color-brand)]" aria-hidden="true" /> {meal.rating}</span>
        </Link>
        <FavoriteButton type="meal" id={meal.id} className="absolute right-3 top-12" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold leading-5 tracking-[-0.02em]">{meal.name}</h3>
            <p className="mt-1.5 min-h-10 text-xs leading-5 text-[var(--color-muted)]">{meal.description}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold">{meal.price} <span className="text-[11px] font-medium text-[var(--color-muted)]">DH</span></p>
        </div>
        <div className="mt-4 border-t border-[var(--color-line)] pt-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex min-w-0 items-center gap-2 font-medium"><Image src={meal.cookAvatar} alt="" width={24} height={24} className="size-6 rounded-full object-cover" /> <Link href={`/cooks/${meal.cookId}`} className="truncate hover:text-[var(--color-brand)]">{meal.cook}</Link></span>
            <span className="inline-flex items-center gap-1 text-[var(--color-muted)]"><MapPin size={12} aria-hidden="true" /> {meal.distance}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--color-muted)]">
            <span className={meal.portionsAvailable === 0 ? "text-[var(--color-muted)]" : meal.portionsAvailable <= 2 ? "font-medium text-[var(--color-brand)]" : ""}>
              {meal.portionsAvailable === 0 ? "سالاو" : meal.portionsAvailable <= 2 ? `باقي غير ${meal.portionsAvailable}` : `${meal.portionsAvailable} وجبات متوفرة`}
            </span>
            <span className="inline-flex items-center gap-1"><Clock3 size={12} aria-hidden="true" /> {meal.readyAt}</span>
          </div>
          <Link href={`/meals/${meal.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand)] hover:underline">
            شوف الطبق <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
