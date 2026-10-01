"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "@/components/home/site-header";
import OrderConfirmation from "@/components/orders/order-confirmation";
import { readLastOrder } from "@/utils/order-storage";

export default function OrderConfirmationRoute() {
  const [order, setOrder] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setOrder(readLastOrder());
      setIsReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  return <>
    <SiteHeader />
    {isReady && order ? <OrderConfirmation order={order} /> : isReady ? <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center"><h1 className="text-2xl font-semibold">ما كاين حتى تأكيد باش يبان</h1><p className="mt-2 text-sm text-[var(--color-muted)]">ما لقيناش آخر طلب تأكد فهاد الجهاز.</p><Link href="/meals" className="mt-5 text-sm font-semibold text-[var(--color-brand)] underline">شوف الماكلة</Link></main> : <main className="min-h-[60vh] px-5 py-16 text-center text-sm text-[var(--color-muted)]">كنحملو التأكيد…</main>}
  </>;
}
