import { deliveryAreas } from "@/data/order-options";

const selectClass = "h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]";

export default function DeliveryLocationSelector({ city, neighborhood, onCityChange, onNeighborhoodChange, cityError, neighborhoodError, compact = false }) {
  const areas = deliveryAreas[city] ?? [];

  return (
    <div className={compact ? "grid gap-3 sm:grid-cols-2" : "space-y-4"}>
      <label className="block"><span className="mb-2 block text-xs font-semibold">Ville</span><select value={city} onChange={(event) => onCityChange(event.target.value)} aria-invalid={Boolean(cityError)} className={`${selectClass} ${cityError ? "border-[var(--color-brand)]" : ""}`}>{Object.keys(deliveryAreas).map((name) => <option key={name} value={name}>{name}</option>)}</select>{cityError && <span className="mt-1 block text-xs text-[var(--color-brand)]">{cityError}</span>}</label>
      <label className="block"><span className="mb-2 block text-xs font-semibold">Quartier</span><select value={neighborhood} onChange={(event) => onNeighborhoodChange(event.target.value)} aria-invalid={Boolean(neighborhoodError)} className={`${selectClass} ${neighborhoodError ? "border-[var(--color-brand)]" : ""}`}>{areas.map((area) => <option key={area} value={area}>{area}</option>)}</select>{neighborhoodError && <span className="mt-1 block text-xs text-[var(--color-brand)]">{neighborhoodError}</span>}</label>
    </div>
  );
}
