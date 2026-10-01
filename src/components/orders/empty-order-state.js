import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";

export default function EmptyOrderState() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-brand)]"><ShoppingBasket size={20} aria-hidden="true" /></span>
      <h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Votre commande est vide</h1>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-muted)]">Découvrez les plats maison disponibles près de vous.</p>
      <Link href="/meals" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Découvrir les plats <ArrowRight size={15} aria-hidden="true" /></Link>
    </main>
  );
}
