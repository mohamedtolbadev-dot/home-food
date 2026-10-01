import { Star } from "lucide-react";

export default function CookReviews({ cook }) {
  return (
    <section aria-labelledby="reviews-title" className="border-b border-[var(--color-line)] py-7 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Retours de la communauté</p><h2 id="reviews-title" className="text-lg font-semibold tracking-[-0.03em]">Avis clients</h2></div>
        <p className="inline-flex items-center gap-1.5 text-sm font-semibold"><Star size={15} fill="currentColor" className="text-[var(--color-brand)]" aria-hidden="true" /> {cook.rating} <span className="text-xs font-normal text-[var(--color-muted)]">/ 5 · {cook.reviewsCount} avis</span></p>
      </div>
      <div className="mt-4 divide-y divide-[var(--color-line)]">
        {cook.reviews.map((review) => <article key={review.id} className="py-4 first:pt-0 last:pb-0"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-xs font-semibold">{review.name}</h3><div role="img" className="flex items-center gap-0.5" aria-label={`${review.rating} sur 5`}>
          {Array.from({ length: 5 }, (_, index) => <Star key={index} size={11} fill={index < review.rating ? "currentColor" : "none"} className={index < review.rating ? "text-[var(--color-brand)]" : "text-[var(--color-line)]"} aria-hidden="true" />)}
          <span className="ml-2 text-[10px] text-[var(--color-muted)]">{review.date}</span>
        </div></div><p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{review.text}</p></article>)}
      </div>
      <p className="mt-3 text-[10px] text-[var(--color-muted)]">Extraits d’avis de démonstration.</p>
    </section>
  );
}
