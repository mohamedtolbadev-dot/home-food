import { CalendarDays, Check, Clock3 } from "lucide-react";

export default function CookAvailability({ days }) {
  return (
    <section aria-labelledby="availability-title" className="border-b border-[var(--color-line)] py-7 sm:py-8">
      <div className="flex items-center gap-2"><CalendarDays size={16} className="text-[var(--color-brand)]" aria-hidden="true" /><h2 id="availability-title" className="text-lg font-semibold tracking-[-0.03em]">أوقات الخدمة</h2></div>
      <p className="mt-1.5 text-xs text-[var(--color-muted)]">الأوقات ديال الأيام الجاية.</p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {days.map(({ day, available }) => <li key={day} className="flex min-h-16 items-center justify-between gap-2 card-surface rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5"><div><p className="text-xs font-medium">{day}</p><p className="mt-1 text-[10px] text-[var(--color-muted)]">{available ? "كاينين أطباق" : "راحة"}</p></div><span aria-label={available ? "كاينين أطباق" : "ما كاين حتى طبق"} className={available ? "text-[var(--color-brand)]" : "text-[var(--color-muted)]"}>{available ? <Check size={15} aria-hidden="true" /> : <Clock3 size={14} aria-hidden="true" />}</span></li>)}
      </ul>
    </section>
  );
}
