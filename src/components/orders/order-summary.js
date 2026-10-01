import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { DELIVERY_FEE_DH, getOrderTotals } from "@/data/order-options";
import { meals } from "@/data/homepage";
import QuantitySelector from "@/components/orders/quantity-selector";

function formatDh(value) {
  return `${value.toLocaleString("fr-FR")} DH`;
}

export default function OrderSummary({ items, onQuantityChange, onRemove, compact = false }) {
  const totals = getOrderTotals(items);

  return (
    <section aria-labelledby="order-summary-title" className="card-surface rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
      <h2 id="order-summary-title" className="text-base font-semibold tracking-[-0.025em]">تفاصيل الطلب</h2>
      {items.length > 0 ? <div className="mt-4 divide-y divide-[var(--color-line)]">
        {items.map((item) => {
          const meal = item.mealSnapshot ?? meals.find((entry) => entry.id === item.mealId) ?? item.meal;
          if (!meal) return null;
          const itemTotal = item.unitPrice * item.quantity;
          return <article key={item.mealId} className="py-4 first:pt-0 last:pb-0">
            <div className="flex gap-3">
              <Image src={meal.image} alt="" width={64} height={64} className="size-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1"><Link href={`/meals/${meal.id}`} className="text-sm font-semibold leading-5 hover:text-[var(--color-brand)]">{meal.name}</Link><p className="mt-1 text-xs text-[var(--color-muted)]">من عند <Link href={`/cooks/${meal.cookId}`} className="hover:text-[var(--color-brand)]">{meal.cook}</Link></p><p className="mt-2 text-xs">{formatDh(item.unitPrice)} × {item.quantity}</p></div>
              <span className="shrink-0 text-xs font-semibold">{formatDh(itemTotal)}</span>
            </div>
            {onQuantityChange && <div className="mt-3 flex items-center justify-between gap-3">
              <QuantitySelector value={item.quantity} max={meal.portionsAvailable} onChange={(quantity) => onQuantityChange(item.mealId, quantity)} label="الكمية" />
              {onRemove && <button type="button" onClick={() => onRemove(item.mealId)} aria-label={`حيد ${meal.name}`} className="flex size-9 shrink-0 items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-brand)]"><Trash2 size={15} aria-hidden="true" /></button>}
            </div>}
          </article>;
        })}
      </div> : <p className="mt-3 text-sm text-[var(--color-muted)]">ما كاين حتى طبق فالطلب ديالك.</p>}
      <dl className="mt-4 space-y-2 border-t border-[var(--color-line)] pt-4 text-xs">
        <div className="flex justify-between gap-4"><dt className="text-[var(--color-muted)]">الثمن قبل التوصيل</dt><dd className="font-medium">{formatDh(totals.subtotal)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-[var(--color-muted)]">التوصيل</dt><dd className="font-medium">{items.length ? formatDh(DELIVERY_FEE_DH) : "—"}</dd></div>
        <div className="flex justify-between gap-4 border-t border-[var(--color-line)] pt-3 text-sm"><dt className="font-semibold">الثمن كامل</dt><dd className="font-semibold">{formatDh(totals.total)}</dd></div>
      </dl>
      {!compact && <p className="mt-3 text-[10px] leading-4 text-[var(--color-muted)]">ثمن التوصيل ثابت: {DELIVERY_FEE_DH} DH فهاد التجربة.</p>}
    </section>
  );
}
