import Link from "next/link";
import { ArrowRight, Heart, MapPin, PackageOpen } from "lucide-react";

const icons = { orders: PackageOpen, addresses: MapPin, favorites: Heart };

export default function EmptyState({ type = "orders", message, explanation, cta, href, onAction }) {
  const Icon = icons[type] ?? PackageOpen;
  return (
    <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-5 py-10 text-center sm:px-8">
      <span className="mx-auto flex size-11 items-center justify-center rounded-2xl border border-[var(--color-line)] text-[var(--color-brand)]"><Icon size={18} aria-hidden="true" /></span>
      <h2 className="mt-4 text-base font-semibold text-[var(--color-ink)]">{message}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">{explanation}</p>
      {cta && (onAction ? <button type="button" onClick={onAction} className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">{cta}<ArrowRight size={14} aria-hidden="true" /></button> : href ? <Link href={href} className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">{cta}<ArrowRight size={14} aria-hidden="true" /></Link> : null)}
    </div>
  );
}