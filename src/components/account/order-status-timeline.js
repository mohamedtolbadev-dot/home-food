const steps = ["Commande reçue", "Confirmée", "En préparation", "En livraison", "Livrée"];

export default function OrderStatusTimeline({ status }) {
  const activeIndex = steps.indexOf(status);
  const cancelled = status === "Annulée";

  return (
    <section aria-label="Étapes de la commande" className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[var(--color-ink)]">Suivi de commande</h2>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${cancelled ? "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-muted)]" : "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]"}`}>{status}</span>
      </div>
      {cancelled ? <p className="mt-3 text-xs leading-5 text-[var(--color-muted)]">Cette commande a été annulée.</p> : (
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
          {steps.map((step, index) => {
            const complete = activeIndex >= 0 && index <= activeIndex;
            const current = index === activeIndex;
            return <li key={step} className="relative flex min-w-0 items-center gap-2.5 sm:flex-col sm:items-start sm:gap-2">
              {index < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[9px] top-5 h-[calc(100%+8px)] w-px sm:left-5 sm:top-[9px] sm:h-px sm:w-[calc(100%-4px)] ${activeIndex > index ? "bg-[var(--color-brand)]" : "bg-[var(--color-line)]"}`} />}
              <span className={`relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold ${current ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : complete ? "border-[var(--color-brand)] bg-white text-[var(--color-brand)]" : "border-[var(--color-line)] bg-white text-[var(--color-muted)]"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className={`min-w-0 break-words text-[11px] leading-4 ${current ? "font-semibold text-[var(--color-ink)]" : complete ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}>{step}</span>
            </li>;
          })}
        </ol>
      )}
      <p className="mt-4 text-[10px] leading-4 text-[var(--color-muted)]">Les étapes sont indicatives et ne sont pas suivies en temps réel.</p>
    </section>
  );
}