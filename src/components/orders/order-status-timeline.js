const steps = ["Commande reçue", "Préparation", "En livraison", "Livrée"];

export default function OrderStatusTimeline() {
  return (
    <section aria-labelledby="tracking-title" className="border-t border-[var(--color-line)] pt-5">
      <h2 id="tracking-title" className="text-base font-semibold">Suivi de commande</h2>
      <ol className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-2">
        {steps.map((step, index) => <li key={step} className="relative flex items-start gap-2.5 sm:flex-col sm:gap-2">
          {index < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[9px] top-5 h-[calc(100%+2px)] w-px sm:left-5 sm:top-[9px] sm:h-px sm:w-[calc(100%-4px)] ${index === 0 ? "bg-[var(--color-brand)]" : "bg-[var(--color-line)]"}`} />}
          <span className={`relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold ${index === 0 ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-muted)]"}`}>{String(index + 1).padStart(2, "0")}</span>
          <span className={`text-[11px] leading-5 ${index === 0 ? "font-semibold text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}>{step}</span>
        </li>)}
      </ol>
      <p className="mt-3 text-[10px] text-[var(--color-muted)]">Les prochaines étapes sont indicatives et ne sont pas encore suivies en temps réel.</p>
    </section>
  );
}
