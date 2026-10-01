import { MapPin } from "lucide-react";

export default function CookLocation({ cook }) {
  return (
    <section aria-labelledby="location-title" className="border-b border-[var(--color-line)] py-7 sm:py-8">
      <h2 id="location-title" className="text-lg font-semibold tracking-[-0.03em]">Zone de préparation</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.15fr]">
        <div className="relative min-h-36 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[#f2f2f4]" aria-hidden="true">
          <span className="absolute left-[22%] top-0 h-full w-[3px] bg-white" /><span className="absolute left-[68%] top-0 h-full w-[3px] bg-white" />
          <span className="absolute left-0 top-[28%] h-[3px] w-full bg-white" /><span className="absolute left-0 top-[72%] h-[3px] w-full bg-white" />
          <span className="absolute left-[45%] top-0 h-full w-[2px] rotate-[19deg] bg-white" />
          <div className="absolute left-[54%] top-[46%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-2.5 py-2 text-[10px] font-medium text-[var(--color-ink)]"><span className="size-2 rounded-full bg-[var(--color-brand)]" />{cook.neighborhood}</div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold"><MapPin size={15} className="text-[var(--color-brand)]" aria-hidden="true" /> {cook.neighborhood}, {cook.city}</p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">Distance approximative : {cook.approximateDistance}</p>
          <p className="mt-3 max-w-md text-[11px] leading-5 text-[var(--color-muted)]">La zone est approximative. L’adresse personnelle de la cuisinière n’est pas affichée.</p>
        </div>
      </div>
    </section>
  );
}
