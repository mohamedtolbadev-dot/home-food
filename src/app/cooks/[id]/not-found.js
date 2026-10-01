import Link from "next/link";
import { ArrowRight, ChefHat } from "lucide-react";

export default function CookNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-canvas)] px-5 text-center">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-white"><ChefHat size={21} aria-hidden="true" /></span>
      <h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">هاد الطباخة ما كايناش.</h1>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-muted)]">ما لقيناش هاد البروفايل. شوف الماكلة لي كاينة حدّاك.</p>
      <Link href="/meals" className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">شوف الماكلة <ArrowRight size={14} aria-hidden="true" /></Link>
    </main>
  );
}
