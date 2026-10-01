import { Clock3 } from "lucide-react";
import { deliveryTimes } from "@/data/order-options";

export default function DeliveryTimeSelector({ value, onChange, mode = "select", error }) {
  return mode === "radio" ? (
    <fieldset>
      <legend className="text-sm font-semibold">وقت التوصيل</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">{deliveryTimes.map((time) => <label key={time} className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 text-xs ${value === time ? "border-[var(--color-brand)] bg-white" : "border-[var(--color-line)] bg-white"}`}><input type="radio" name="deliveryTime" value={time} checked={value === time} onChange={() => onChange(time)} className="accent-[var(--color-brand)]" />{time}</label>)}</div>
      {error && <p className="mt-1.5 text-xs text-[var(--color-brand)]">{error}</p>}
    </fieldset>
  ) : (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold">الوقت لي بغيتي</span>
      <span className="relative block"><Clock3 size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand)]" aria-hidden="true" /><select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full appearance-none border border-[var(--color-line)] bg-white pl-9 pr-3 text-sm outline-none focus:border-[var(--color-brand)]">{deliveryTimes.map((time) => <option key={time} value={time}>{time}</option>)}</select></span>
    </label>
  );
}
