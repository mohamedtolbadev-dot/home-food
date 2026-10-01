import { SearchX } from "lucide-react";

export default function EmptyState({ onReset }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-5 py-12 text-center">
      <SearchX size={25} strokeWidth={1.6} className="text-[var(--color-muted)]" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em]">ما لقينا حتى طبق</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-muted)]">بدل البحث ولا التصفية باش تكتاشف أطباق خرين ديال الدار.</p>
      <button type="button" onClick={onReset} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">رجع التصفية كيف كانت</button>
    </div>
  );
}
