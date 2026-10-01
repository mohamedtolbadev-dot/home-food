import StatusBadge from "@/components/cook/status-badge";

export default function CookOrderList({ orders, onStatusChange }) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <article key={order.id} className="rounded-2xl border border-[var(--color-line)] bg-white p-3.5 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">{order.id}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{order.customer}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          <div className="mt-3 grid gap-2 text-xs text-[var(--color-muted)] sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Plat</p>
              <p className="mt-1 text-sm text-[var(--color-ink)]">{order.meal}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Quantité</p>
              <p className="mt-1 text-sm text-[var(--color-ink)]">{order.quantity}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Total</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">{order.total} DH</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Livraison</p>
              <p className="mt-1 text-sm text-[var(--color-ink)]">{order.deliveryTime}</p>
            </div>
          </div>

          <label className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Modifier le statut
            <select
              value={order.status}
              onChange={(event) => onStatusChange(order.id, event.target.value)}
              className="mt-2 h-10 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
            >
              {[
                "Nouvelle",
                "Confirmée",
                "En préparation",
                "Prête",
                "Terminée",
              ].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        </article>
      ))}
    </div>
  );
}
