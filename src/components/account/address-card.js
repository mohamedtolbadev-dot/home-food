import { Check, MapPin, PencilLine, Trash2 } from "lucide-react";

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <article className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-brand)]"><MapPin size={16} aria-hidden="true" /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-[var(--color-ink)]">{address.label}</h2>
              {address.isDefault && <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 px-2 py-0.5 text-[9px] font-semibold text-[var(--color-brand)]"><Check size={10} aria-hidden="true" /> Principale</span>}
            </div>
            <p className="mt-2 break-words text-sm leading-6 text-[var(--color-ink)]">{address.address}</p>
            <p className="mt-1 break-words text-xs text-[var(--color-muted)]">{address.neighborhood}, {address.city}</p>
            {address.instructions && <p className="mt-2 break-words text-xs leading-5 text-[var(--color-muted)]">Instructions : {address.instructions}</p>}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-3">
        <button type="button" onClick={() => onEdit(address)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--color-line)] px-3 text-xs font-medium text-[var(--color-ink)] hover:border-[#d2d2d7]"><PencilLine size={13} aria-hidden="true" /> Modifier</button>
        {!address.isDefault && <button type="button" onClick={() => onSetDefault(address.id)} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-[var(--color-brand)] hover:bg-[var(--color-brand)]/5">Définir comme principale</button>}
        <button type="button" onClick={() => onDelete(address.id)} className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-[var(--color-muted)] hover:bg-[#f8f8f9] hover:text-[var(--color-brand)]"><Trash2 size={13} aria-hidden="true" /> Supprimer</button>
      </div>
    </article>
  );
}