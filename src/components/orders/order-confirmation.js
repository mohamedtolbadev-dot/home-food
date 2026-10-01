import Link from "next/link";
import { BadgeCheck, MapPin, PackageCheck } from "lucide-react";
import OrderSummary from "@/components/orders/order-summary";
import OrderStatusTimeline from "@/components/orders/order-status-timeline";

export default function OrderConfirmation({ order }) {
  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-brand)]"><BadgeCheck size={22} aria-hidden="true" /></span>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand)]">{order.orderNumber}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">تأكد الطلب ديالك</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">شكرا {order.customer.name}، تسجل الطلب ديالك مزيان.</p>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <section className="card-surface rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-6">
          <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-4"><span className="flex size-9 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-brand)]"><PackageCheck size={17} aria-hidden="true" /></span><div><p className="text-xs text-[var(--color-muted)]">الحالة دابا</p><p className="mt-0.5 text-sm font-semibold">توصلنا بالطلب</p></div></div>
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">وقت التوصيل</p><p className="mt-1.5 text-sm font-medium">{order.deliveryTime}</p></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">الخلاص</p><p className="mt-1.5 text-sm font-medium">ملي يوصلك الطلب</p></div>
            <div className="sm:col-span-2"><p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]"><MapPin size={12} aria-hidden="true" /> عنوان التوصيل</p><p className="mt-1.5 text-sm font-medium">{order.delivery.address}, {order.delivery.neighborhood}, {order.delivery.city}</p>{order.delivery.instructions && <p className="mt-1 text-xs text-[var(--color-muted)]">{order.delivery.instructions}</p>}</div>
          </div>
          <OrderStatusTimeline />
        </section>
        <OrderSummary items={order.items} />
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/meals" className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">شوف الماكلة</Link>
        <Link href="/" className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-4 text-xs font-semibold hover:border-[#d2d2d7]">رجع للرئيسية</Link>
      </div>
      <p className="mt-6 text-center text-[10px] text-[var(--color-muted)]">هاد التأكيد محفوظ فهاد الجهاز غير للتجربة.</p>
    </main>
  );
}
