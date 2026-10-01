"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import OrderCard from "@/components/account/order-card";
import OrderStatusTimeline from "@/components/account/order-status-timeline";
import { readCustomerOrders } from "@/utils/customer-storage";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setOrders(readCustomerOrders());
    });
    return () => { cancelled = true; };
  }, []);

  const activeOrder = orders.find((order) => !["Livrée", "Annulée"].includes(order.status));
  const statusLabels = {
    "Commande reçue": "توصلنا بالطلب",
    Confirmée: "تأكد الطلب",
    "En préparation": "كنوجدو فالطلب",
    "En livraison": "فالطريق ليك",
    Livrée: "توصّلتي بالطلب",
    Annulée: "تلغى الطلب",
  };

  return (
    <CustomerAccountLayout title="الطلبات ديالي" description="لقا الطلبات لي درتي وشوف فين وصل كل طلب.">
      <div className="space-y-6">
        {activeOrder && <section className="rounded-2xl border border-[var(--color-brand)]/20 bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">تبع الطلب</p><h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink)]">الطلب ديالك باقي خدام</h2><p className="mt-1 break-words text-xs text-[var(--color-muted)]">{activeOrder.orderNumber} · {statusLabels[activeOrder.status] ?? activeOrder.status}</p></div>
            <Link href={`/account/orders/${encodeURIComponent(activeOrder.id)}`} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)]">شوف الطلب ديالي <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div className="mt-4 grid gap-3 border-t border-[var(--color-line)] pt-4 text-sm sm:grid-cols-3">
            <p className="min-w-0 break-words"><span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">الطباخة</span><span className="mt-1 block font-medium text-[var(--color-ink)]">{activeOrder.cook.name}</span></p>
            <p className="min-w-0 break-words"><span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">الطبق</span><span className="mt-1 block font-medium text-[var(--color-ink)]">{activeOrder.items.map((item) => item.name).join("، ")}</span></p>
            <p className="min-w-0 break-words"><span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">وقت التوصيل</span><span className="mt-1 block font-medium text-[var(--color-ink)]">{activeOrder.deliveryTime}</span></p>
          </div>
          <div className="mt-4"><OrderStatusTimeline status={activeOrder.status} /></div>
          <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-4 text-[var(--color-muted)]"><MapPin size={12} className="mt-0.5 shrink-0" aria-hidden="true" /> هاد التتبع غير للتجربة وما كيتبدلش فالوقت الحقيقي.</p>
        </section>}

        <section>
          <div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">القديم والجديد</p><h2 className="mt-1 text-base font-semibold text-[var(--color-ink)]">كاع الطلبات ديالك</h2></div><span className="text-xs text-[var(--color-muted)]">{orders.length}</span></div>
          {orders.length ? <div className="grid gap-3">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div> : <EmptyState type="orders" message="مازال ما طلبتي والو." explanation="الطلبات لي غادي تدير غادي تلقاهم هنا مع التفاصيل ديالهم." cta="شوف الماكلة" href="/meals" />}
        </section>
        {!activeOrder && orders.length > 0 && <EmptyState type="orders" message="ما كاين حتى طلب خدام دابا." explanation="الطلبات كاملين تسالاو ولا تلغاو. الطلب الجاي تقدر تتبعو من هنا." cta="شوف الماكلة" href="/meals" />}
      </div>
    </CustomerAccountLayout>
  );
}