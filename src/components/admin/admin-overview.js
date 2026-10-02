"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChefHat, ClipboardList, CookingPot, UsersRound, Wallet } from "lucide-react";
import { adminDemoDate } from "@/data/admin-demo";
import { useAdminData } from "@/components/admin/admin-provider";
import { AdminEmptyState, AdminStatCard, AdminStatusBadge, AdminTable } from "@/components/admin/admin-ui";

function money(value) {
  return `${Number(value || 0).toLocaleString("ar-MA")} DH`;
}

function dateLabel(value) {
  return new Date(value).toLocaleDateString("ar-MA", { day: "numeric", month: "short" });
}

export default function AdminOverview() {
  const { data } = useAdminData();
  const metrics = useMemo(() => {
    const todayOrders = data.orders.filter((order) => order.createdAt.slice(0, 10) === adminDemoDate);
    const todayRevenue = todayOrders.filter((order) => order.status !== "canceled").reduce((sum, order) => sum + order.total, 0);
    return [
      { label: "الطلبات ديال اليوم", value: todayOrders.length, icon: ClipboardList, note: "جميع الحالات" },
      { label: "الطباخات النشيطات", value: data.cooks.filter((cook) => cook.status === "verified").length, icon: ChefHat, note: "بروفايلات خدامة" },
      { label: "الوجبات المتاحة", value: data.meals.filter((meal) => meal.status === "available").length, icon: CookingPot, note: "واجدة للطلب" },
      { label: "الزبناء", value: data.customers.length, icon: UsersRound, note: "مسجلين فالتجربة" },
      { label: "مداخيل اليوم", value: money(todayRevenue), icon: Wallet, note: "مجموع الطلبات" },
    ];
  }, [data]);

  const recentOrders = [...data.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const columns = [
    { key: "number", label: "رقم الطلب", render: (order) => <Link href={`/admin/orders/${order.id}`} className="font-semibold text-[var(--color-secondary)] hover:underline">{order.number}</Link> },
    { key: "customer", label: "الزبون", render: (order) => data.customers.find((item) => item.id === order.customerId)?.name ?? "زبون" },
    { key: "meal", label: "الوجبة", render: (order) => data.meals.find((item) => item.id === order.mealId)?.name ?? "وجبة" },
    { key: "total", label: "المجموع", render: (order) => money(order.total) },
    { key: "status", label: "الحالة", render: (order) => <AdminStatusBadge status={order.status} /> },
  ];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">نظرة عامة</p>
        <h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">حركة المنصة</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">ملخص بسيط على النشاط ديال دار مطبخ.</p>
      </header>

      <section aria-label="ملخص النشاط" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => <AdminStatCard key={metric.label} {...metric} />)}
      </section>

      <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">آخر المستجدات</p><h2 className="mt-1 text-base font-semibold text-[var(--color-secondary)]">الطلبات الأخيرة</h2></div>
          <Link href="/admin/orders" className="inline-flex min-h-9 items-center rounded-xl border border-[var(--color-line)] px-3 text-xs font-semibold text-[var(--color-secondary)] hover:bg-[#f8f8f9]">كاع الطلبات</Link>
        </div>
        <AdminTable
          columns={columns}
          rows={recentOrders}
          emptyState={<AdminEmptyState title="ما كاين حتى طلب دابا" description="ملي يوصل شي طلب غادي يبان هنا." />}
        />
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3"><h2 className="text-sm font-semibold text-[var(--color-secondary)]">بروفايلات كيتسناو المراجعة</h2><AdminStatusBadge status="pending" /></div>
          <p className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">{data.cooks.filter((cook) => cook.status === "pending").length}</p>
          <Link href="/admin/cooks?status=pending" className="mt-3 inline-flex min-h-9 items-center text-xs font-semibold text-[var(--color-secondary)] hover:underline">شوف الطباخات</Link>
        </div>
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3"><h2 className="text-sm font-semibold text-[var(--color-secondary)]">المراجعات لي باينة</h2><AdminStatusBadge status="visible" /></div>
          <p className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">{data.reviews.filter((review) => review.status === "visible").length}</p>
          <Link href="/admin/reviews" className="mt-3 inline-flex min-h-9 items-center text-xs font-semibold text-[var(--color-secondary)] hover:underline">دبر المراجعات</Link>
        </div>
      </section>
    </div>
  );
}
