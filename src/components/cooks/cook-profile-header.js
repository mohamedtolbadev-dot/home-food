import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, BadgeCheck, MapPin, Star } from "lucide-react";

export default function CookProfileHeader({ cook }) {
  return (
    <section className="border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-9 lg:px-10">
        <Link href="/meals" className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand)]"><ArrowLeft size={14} aria-hidden="true" /> رجع للماكلة</Link>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <Image src={cook.image} alt={cook.imageAlt} width={152} height={152} priority sizes="(max-width: 640px) 104px, 152px" className="size-[104px] shrink-0 rounded-full border border-[var(--color-line)] object-cover sm:size-[132px] lg:size-[152px]" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h1 className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">{cook.name}</h1>
              {cook.verified && <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-brand)]"><BadgeCheck size={15} aria-hidden="true" /> بروفايل موثوق</span>}
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">{cook.cuisineStyle}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]"><MapPin size={13} aria-hidden="true" /> {cook.neighborhood} · {cook.city}</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-ink)]">{cook.introduction}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold"><Star size={14} fill="currentColor" className="text-[var(--color-brand)]" aria-hidden="true" /> {cook.rating} <span className="font-normal text-[var(--color-muted)]">· {cook.reviewsCount} رأي</span></span>
              <span className="text-[var(--color-muted)]">{cook.ordersCount} طبق تشارك</span>
              <span className="text-[var(--color-muted)]">البعد تقريبا: {cook.approximateDistance}</span>
            </div>
            <Link href="#plats-du-jour" className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">شوف الماكلة ديال اليوم <ArrowDown size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
