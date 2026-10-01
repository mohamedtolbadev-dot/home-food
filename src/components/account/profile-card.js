import { CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react";

export default function ProfileCard({ customer, onEditProfile, onEditContact }) {
  const memberDate = new Date(`${customer.memberSince}T12:00:00`).toLocaleDateString("ar-MA", { month: "long", year: "numeric" });

  return (
    <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-brand)]"><UserRound size={22} aria-hidden="true" /></span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">بروفايل الزبون</p>
            <h2 className="mt-1 truncate text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">{customer.name}</h2>
            <p className="mt-1 text-xs text-[var(--color-muted)]">معانا من {memberDate}</p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 px-2.5 py-1 text-[10px] font-semibold text-[var(--color-brand)]"><span className="size-1.5 rounded-full bg-[var(--color-brand)]" /> البروفايل كامل</span>
      </div>

      <div className="mt-5 grid gap-3 border-t border-[var(--color-line)] pt-5 sm:grid-cols-2">
        <p className="flex min-w-0 items-start gap-2.5 text-sm text-[var(--color-ink)]"><Phone size={15} className="mt-0.5 shrink-0 text-[var(--color-muted)]" aria-hidden="true" /><span className="break-words">{customer.phone || "زيد رقم الهاتف"}</span></p>
        <p className="flex min-w-0 items-start gap-2.5 text-sm text-[var(--color-ink)]"><Mail size={15} className="mt-0.5 shrink-0 text-[var(--color-muted)]" aria-hidden="true" /><span className="break-all">{customer.email || "زيد البريد الإلكتروني"}</span></p>
        <p className="flex min-w-0 items-start gap-2.5 text-sm text-[var(--color-ink)]"><MapPin size={15} className="mt-0.5 shrink-0 text-[var(--color-muted)]" aria-hidden="true" /><span className="break-words">{customer.neighborhood}, {customer.city}</span></p>
        <p className="flex min-w-0 items-start gap-2.5 text-sm text-[var(--color-ink)]"><CalendarDays size={15} className="mt-0.5 shrink-0 text-[var(--color-muted)]" aria-hidden="true" /><span>معانا من {memberDate}</span></p>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4 sm:flex-row">
        <button type="button" onClick={onEditProfile} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">بدل البروفايل ديالي</button>
        <button type="button" onClick={onEditContact} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-4 text-xs font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">بدل معلومات التواصل</button>
      </div>
    </section>
  );
}