import { SearchX } from "lucide-react";

export default function EmptyState({ onReset }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-5 py-12 text-center">
      <SearchX size={25} strokeWidth={1.6} className="text-[var(--color-muted)]" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em]">Aucun plat trouvé</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-muted)]">Essayez de modifier votre recherche ou vos filtres pour découvrir d’autres plats faits maison.</p>
      <button type="button" onClick={onReset} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Réinitialiser les filtres</button>
    </div>
  );
}
