import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const statusStyles = {
  "Commande reçue": "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
  Confirmée: "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-ink)]",
  "En préparation": "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
  "En livraison": "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)]",
  Livrée: "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-muted)]",
  Annulée: "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-muted)]",
};

const statusLabels = {
  "Commande reçue": "توصلنا بالطلب",
  Confirmée: "تأكد الطلب",
  "En préparation": "كنوجدو فالطلب",
  "En livraison": "فالطريق ليك",
  Livrée: "توصّلتي بالطلب",
  Annulée: "تلغى الطلب",
};

export default function OrderCard({ order }) {
  const firstItem = order.items[0];
  const orderDate = new Date(order.createdAt).toLocaleDateString("ar-MA", { day: "numeric", month: "long", year: "numeric" });
  const mealSummary = order.items.length > 1 ? `${firstItem.name} و${order.items.length - 1} أطباق خرين` : firstItem.name;

  return (
    <article className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
      <div className="flex flex-col gap-3 border-b border-[var(--color-line)] pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">{order.orderNumber}</p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">{orderDate}</p>
        </div>
        <span className={`inline-flex w-fit max-w-full rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[order.status] ?? statusStyles["Commande reçue"]}`}>{statusLabels[order.status] ?? order.status}</span>
      </div>
      <div className="flex min-w-0 gap-3 py-4">
        {firstItem.image && <Image src={firstItem.image} alt="" width={64} height={64} className="size-16 shrink-0 rounded-xl border border-[var(--color-line)] object-cover" />}
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-sm font-semibold leading-5 text-[var(--color-ink)]">{mealSummary}</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">مع {order.cook.name}</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <p className="text-[var(--color-muted)]">الكمية <span className="font-medium text-[var(--color-ink)]">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span></p>
            <p className="text-[var(--color-muted)]">التوصيل <span className="font-medium text-[var(--color-ink)]">{order.deliveryTime}</span></p>
            <p className="text-[var(--color-muted)]">الثمن كامل <span className="font-semibold text-[var(--color-ink)]">{order.total} DH</span></p>
          </div>
        </div>
      </div>
      <Link href={`/account/orders/${encodeURIComponent(order.id)}`} className="inline-flex min-h-9 items-center gap-1.5 border-t border-[var(--color-line)] pt-3 text-xs font-semibold text-[var(--color-brand)] hover:underline">شوف الطلب ديالي <ArrowRight size={13} aria-hidden="true" /></Link>
    </article>
  );
}