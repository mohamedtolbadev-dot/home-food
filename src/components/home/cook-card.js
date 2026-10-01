import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import FavoriteButton from "@/components/account/favorite-button";

export default function CookCard({ cook }) {
  return (
    <article className="flex gap-4 border-t border-[var(--color-line)] py-5 first:border-t-0 first:pt-0 last:pb-0 sm:gap-5">
      <Image src={cook.image} alt={cook.imageAlt} width={76} height={76} sizes="76px" className="size-[68px] shrink-0 rounded-full border border-[var(--color-line)] object-cover sm:size-[76px]" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-sm font-semibold tracking-[-0.02em]"><Link href={`/cooks/${cook.id}`} className="hover:text-[var(--color-brand)]">{cook.name}</Link></h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--color-brand)]"><BadgeCheck size={13} aria-hidden="true" /> بروفايل موثوق</span>
          </div>
          <FavoriteButton type="cook" id={cook.id} />
        </div>
        <p className="mt-1.5 text-xs text-[var(--color-muted)]">{cook.area} <span aria-hidden="true">·</span> {cook.specialty}</p>
        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1 font-medium text-[var(--color-ink)]"><Star size={12} fill="currentColor" className="text-[var(--color-brand)]" aria-hidden="true" /> {cook.rating}</span>
          <span>{cook.meals}</span>
        </div>
      </div>
    </article>
  );
}
