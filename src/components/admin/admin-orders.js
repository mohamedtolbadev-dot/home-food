"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, CookingPot, MapPin, PackageCheck, UserRound } from "lucide-react";
import { useAdminData } from "@/components/admin/admin-provider";
import { AdminEmptyState, AdminFilter, AdminOrderTimeline, AdminSearchFilterBar, AdminStatusBadge, AdminTable } from "@/components/admin/admin-ui";

const orderStatusOptions = [
  { value: "new", label: "جديدة" },
  { value: "confirmed", label: "مؤكدة" },
  { value: "preparing", label: "كتحضر" },
  { value: "ready", label: "واجدة" },
  { value: "delivery", label: "فالتوصيل" },
  { value: "delivered", label: "توصلات" },
  { value: "canceled", label: "ملغية" },
];

function money(value) {
  return `${Number(value || 0).toLocaleString("ar-MA")} DH`;
}

function formatDate(value, withTime = false) {
  return new Date(value).toLocaleDateString("ar-MA", withTime
    ? { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }
    : { day: "numeric", month: "short", year: "numeric" });
}

function getDateKey(value) {
  return new Date(value).toISOString().slice(0, 10);
}

export function AdminOrdersPage() {
  const { data } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [cookId, setCookId] = useState("");
  const [sort, setSort] = useState("newest");

  const visibleOrders = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ar-MA");
    const filtered = data.orders.filter((order) => {
      const customer = data.customers.find((item) => item.id === order.customerId);
      const meal = data.meals.find((item) => item.id === order.mealId);
      const searchable = `${order.number} ${customer?.name ?? ""} ${meal?.name ?? ""}`.toLocaleLowerCase("ar-MA");
      return (!needle || searchable.includes(needle))
        && (!status || order.status === status)
        && (!date || getDateKey(order.createdAt) === date)
        && (!cookId || order.cookId === cookId);
    });
    return filtered.sort((a, b) => sort === "oldest" ? a.createdAt.localeCompare(b.createdAt) : sort === "total" ? b.total - a.total : b.createdAt.localeCompare(a.createdAt));
  }, [cookId, data, date, query, sort, status]);

  const columns = [
    { key: "number", label: "رقم الطلب", render: (order) => <Link href={`/admin/orders/${order.id}`} className="font-semibold text-[var(--color-secondary)] hover:underline">{order.number}</Link> },
    { key: "customer", label: "الزبون", render: (order) => data.customers.find((item) => item.id === order.customerId)?.name ?? "زبون" },
    { key: "meal", label: "الوجبة", render: (order) => data.meals.find((item) => item.id === order.mealId)?.name ?? "وجبة" },
    { key: "cook", label: "الطباخة", render: (order) => data.cooks.find((item) => item.id === order.cookId)?.name ?? "طباخة" },
    { key: "quantity", label: "الكمية", render: (order) => order.quantity },
    { key: "total", label: "المجموع", render: (order) => money(order.total) },
    { key: "deliveryTime", label: "وقت التوصيل" },
    { key: "status", label: "الحالة", render: (order) => <AdminStatusBadge status={order.status} /> },
    { key: "date", label: "التاريخ", render: (order) => formatDate(order.createdAt) },
  ];

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">إدارة المنصة</p>
        <h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">الطلبات</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">قلب على الطلبات وصفيهم حسب الحالة، التاريخ والطباخة.</p>
      </header>

      <AdminSearchFilterBar value={query} onChange={setQuery} placeholder="قلب برقم الطلب، الزبون ولا الوجبة…">
        <AdminFilter label="الحالة" value={status} onChange={setStatus} options={[{ value: "", label: "جميع الحالات" }, ...orderStatusOptions]} />
        <label className="block min-w-0"><span className="mb-1.5 block text-[10px] font-semibold text-[var(--color-muted)]">التاريخ</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-10 w-full min-w-0 rounded-xl border border-[var(--color-line)] bg-white px-3 text-xs outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/15" /></label>
        <AdminFilter label="الطباخة" value={cookId} onChange={setCookId} options={[{ value: "", label: "جميع الطباخات" }, ...data.cooks.map((cook) => ({ value: cook.id, label: cook.name }))]} />
        <AdminFilter label="الترتيب" value={sort} onChange={setSort} options={[{ value: "newest", label: "الأحدث" }, { value: "oldest", label: "الأقدم" }, { value: "total", label: "المجموع الكبير" }]} />
      </AdminSearchFilterBar>

      <div className="flex items-center justify-between text-xs text-[var(--color-muted)]"><span>لقينا {visibleOrders.length} طلب</span><Link href="/admin" className="inline-flex items-center gap-1 font-semibold text-[var(--color-secondary)] hover:underline"><ArrowRight size={13} aria-hidden="true" /> الرئيسية</Link></div>
      <AdminTable columns={columns} rows={visibleOrders} emptyState={<AdminEmptyState title={query || status || date || cookId ? "ما لقينا حتى طلب" : "ما كاين حتى طلب دابا"} description="بدل البحث ولا الفلاتر، والطلبات الجديدة غادي يبانوا هنا." />} />
    </div>
  );
}

export function AdminOrderDetails({ orderId }) {
  const { data, updateOrderStatus } = useAdminData();
  const order = data.orders.find((item) => item.id === orderId || item.number === orderId);
  if (!order) return <AdminEmptyState title="ما لقيناش الطلب" description="هاد الطلب ما كاينش فالمعطيات التجريبية." />;

  const customer = data.customers.find((item) => item.id === order.customerId);
  const cook = data.cooks.find((item) => item.id === order.cookId);
  const meal = data.meals.find((item) => item.id === order.mealId);

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div><Link href="/admin/orders" className="inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-[var(--color-secondary)] hover:underline"><ArrowRight size={13} aria-hidden="true" /> رجع للطلبات</Link><p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">تفاصيل الطلب</p><h1 className="mt-1 break-words text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">{order.number}</h1><p className="mt-1 text-xs text-[var(--color-muted)]">{formatDate(order.createdAt, true)}</p></div>
        <div className="flex flex-wrap items-center gap-2"><AdminStatusBadge status={order.status} /><AdminFilter label="بدل الحالة" value={order.status} onChange={(value) => updateOrderStatus(order.id, value)} options={orderStatusOptions} className="w-full sm:w-44" /></div>
      </header>

      <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
        <div className="flex items-center gap-2"><PackageCheck size={16} className="text-[var(--color-secondary)]" aria-hidden="true" /><h2 className="text-sm font-semibold text-[var(--color-secondary)]">مراحل الطلب</h2></div>
        <div className="mt-4"><AdminOrderTimeline status={order.status} /></div>
        <p className="mt-3 text-[10px] leading-5 text-[var(--color-muted)]">تبديل الحالة كيتحفظ غير فهاد الجهاز فهاد النسخة التجريبية.</p>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <article className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex items-center gap-2"><UserRound size={16} className="text-[var(--color-secondary)]" aria-hidden="true" /><h2 className="text-sm font-semibold text-[var(--color-secondary)]">معلومات الزبون</h2></div>
          <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2"><div><dt className="text-[var(--color-muted)]">الاسم</dt><dd className="mt-1 break-words font-semibold">{customer?.name ?? "زبون"}</dd></div><div><dt className="text-[var(--color-muted)]">الهاتف</dt><dd className="mt-1 font-semibold" dir="ltr">{customer?.phone ?? "—"}</dd></div><div><dt className="text-[var(--color-muted)]">المدينة</dt><dd className="mt-1 font-semibold">{order.city}</dd></div><div><dt className="text-[var(--color-muted)]">الحي</dt><dd className="mt-1 font-semibold">{order.neighborhood}</dd></div></dl>
        </article>
        <article className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex items-center gap-2"><ChefHat size={16} className="text-[var(--color-secondary)]" aria-hidden="true" /><h2 className="text-sm font-semibold text-[var(--color-secondary)]">معلومات الطباخة</h2></div>
          <div className="mt-4 flex min-w-0 items-center gap-3">{cook?.image && <img src={cook.image} alt="" className="size-11 shrink-0 rounded-full border border-[var(--color-line)] object-cover" />}<div className="min-w-0"><p className="break-words text-sm font-semibold">{cook?.name ?? "طباخة"}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{cook?.neighborhood}, {cook?.city}</p></div><AdminStatusBadge status={cook?.status ?? "pending"} /></div>
        </article>
      </section>

      <section className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,.8fr)]">
        <article className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex items-center gap-2"><CookingPot size={16} className="text-[var(--color-secondary)]" aria-hidden="true" /><h2 className="text-sm font-semibold text-[var(--color-secondary)]">معلومات الوجبة</h2></div>
          <div className="mt-4 flex min-w-0 gap-3">{meal?.image && <img src={meal.image} alt="" className="size-20 shrink-0 rounded-xl border border-[var(--color-line)] object-cover" />}<div className="min-w-0"><p className="break-words text-sm font-semibold">{meal?.name ?? "وجبة"}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{meal?.category} · {money(meal?.price)} للوحدة</p><p className="mt-2 text-xs">الكمية: {order.quantity}</p></div></div>
          <div className="mt-4 space-y-2 border-t border-[var(--color-line)] pt-4 text-xs"><p className="flex justify-between gap-3"><span className="text-[var(--color-muted)]">ثمن الوجبات</span><span>{money(order.subtotal)}</span></p><p className="flex justify-between gap-3"><span className="text-[var(--color-muted)]">التوصيل</span><span>{money(order.deliveryFee)}</span></p><p className="flex justify-between gap-3 border-t border-[var(--color-line)] pt-2 text-sm font-semibold"><span>المجموع</span><span>{money(order.total)}</span></p></div>
        </article>
        <article className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex items-center gap-2"><MapPin size={16} className="text-[var(--color-secondary)]" aria-hidden="true" /><h2 className="text-sm font-semibold text-[var(--color-secondary)]">معلومات التوصيل</h2></div>
          <p className="mt-4 break-words text-sm leading-6">{order.address}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{order.neighborhood}، {order.city}</p>
          {order.instructions && <p className="mt-2 break-words text-xs text-[var(--color-muted)]">معلومة: {order.instructions}</p>}
          <p className="mt-4 text-xs text-[var(--color-muted)]">الوقت: <span className="font-semibold text-[var(--color-ink)]">{order.deliveryTime}</span></p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">الخلاص: <span className="font-semibold text-[var(--color-ink)]">{order.paymentMethod}</span></p>
        </article>
      </section>
    </div>
  );
}
