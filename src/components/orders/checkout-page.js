"use client";

import Link from "next/link";
import SiteHeader from "@/components/home/site-header";
import CheckoutForm from "@/components/orders/checkout-form";
import EmptyOrderState from "@/components/orders/empty-order-state";
import OrderSummary from "@/components/orders/order-summary";
import { useOrder } from "@/context/order-context";
import { getOrderTotals } from "@/data/order-options";

export default function CheckoutPage() {
  const { items, isReady, updateQuantity, clearOrder } = useOrder();

  if (!isReady) return <><SiteHeader /><main className="mx-auto min-h-[60vh] max-w-7xl px-5 py-16 text-sm text-[var(--color-muted)] sm:px-8">كنحملو الطلب ديالك…</main></>;
  if (!items.length) return <><SiteHeader /><EmptyOrderState /></>;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[75vh] max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-11 lg:px-10">
        <div className="mb-7"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand)]">باقي غير شوية</p><h1 className="text-3xl font-semibold tracking-[-0.05em]">كمل الطلب ديالك</h1><p className="mt-2 text-sm text-[var(--color-muted)]">التوصيل · الخلاص ملي يوصلك الطلب</p></div>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
          <aside className="order-first lg:order-last lg:sticky lg:top-24"><OrderSummary items={items} onQuantityChange={updateQuantity} onRemove={(mealId) => updateQuantity(mealId, 0)} /><Link href="/meals" className="mt-3 inline-flex text-xs font-semibold text-[var(--color-brand)] hover:underline">زيد طبق آخر</Link></aside>
          <div className="order-last lg:order-first"><CheckoutForm items={items} onConfirmed={clearOrder} total={getOrderTotals(items).total} /></div>
        </div>
      </main>
      <footer className="border-t border-[var(--color-line)] bg-[#f8f8f9] px-5 py-5 text-center text-[11px] text-[var(--color-muted)] sm:px-8">هاد التجربة ما فيهاش خلاص ولا توصيل حقيقي.</footer>
    </>
  );
}
