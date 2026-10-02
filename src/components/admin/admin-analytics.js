"use client";

import { useMemo } from "react";
import { BarChart3, ChefHat, ShoppingBag, Wallet } from "lucide-react";
import { adminDemoDate } from "@/data/admin-demo";
import { useAdminData } from "@/components/admin/admin-provider";
import { AdminEmptyState, AdminStatCard } from "@/components/admin/admin-ui";

function money(value) {
  return `${Number(value || 0).toLocaleString("ar-MA")} DH`;
}

export default function AdminAnalyticsPage() {
  const { data } = useAdminData();
  const analytics = useMemo(() => {
    const base = new Date(`${adminDemoDate}T12:00:00`);
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(base);
      date.setDate(base.getDate() - (6 - index));
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const orders = data.orders.filter((order) => order.createdAt.slice(0, 10) === key && order.status !== "canceled");
      return { key, label: date.toLocaleDateString("ar-MA", { weekday: "short" }), orders: orders.length, revenue: orders.reduce((sum, order) => sum + order.total, 0) };
    });
    const mealCounts = data.orders.reduce((counts, order) => {
      if (order.status !== "canceled") counts[order.mealId] = (counts[order.mealId] ?? 0) + order.quantity;
      return counts;
    }, {});
    const popularMeals = Object.entries(mealCounts).map(([mealId, quantity]) => ({ meal: data.meals.find((item) => item.id === mealId), quantity })).filter((item) => item.meal).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    const validOrders = data.orders.filter((order) => order.status !== "canceled");
    const revenue = validOrders.reduce((sum, order) => sum + order.total, 0);
    const totalForWeek = days.reduce((sum, day) => sum + day.revenue, 0);
    return { days, popularMeals, average: validOrders.length ? Math.round(revenue / validOrders.length) : 0, activeCooks: data.cooks.filter((cook) => cook.status === "verified").length, totalForWeek };
  }, [data]);

  const maxOrders = Math.max(1, ...analytics.days.map((day) => day.orders));
  const maxRevenue = Math.max(1, ...analytics.days.map((day) => day.revenue));

  return (
    <div className="space-y-5">
      <header><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">صورة على النشاط</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">الإحصائيات</h1><p className="mt-2 text-sm text-[var(--color-muted)]">أرقام تجريبية باش تتابع النشاط ديال المنصة.</p></header>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="الطلبات فالسيمانة" value={analytics.days.reduce((sum, day) => sum + day.orders, 0)} icon={ShoppingBag} note="آخر 7 أيام" />
        <AdminStatCard label="مداخيل السيمانة" value={money(analytics.totalForWeek)} icon={Wallet} note="بلا الطلبات الملغية" />
        <AdminStatCard label="معدل الطلب" value={money(analytics.average)} icon={BarChart3} note="تقريبي" />
        <AdminStatCard label="الطباخات النشيطات" value={analytics.activeCooks} icon={ChefHat} note="بروفايلات موثوقة" />
      </section>

      <section className="grid gap-3 xl:grid-cols-2">
        <ChartPanel title="الطلبات على حساب الأيام" days={analytics.days} valueKey="orders" max={maxOrders} format={(value) => value} />
        <ChartPanel title="المداخيل على حساب الأيام" days={analytics.days} valueKey="revenue" max={maxRevenue} format={money} />
      </section>

      <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
        <div className="mb-4"><h2 className="text-sm font-semibold text-[var(--color-secondary)]">الوجبات لي عليها الطلب</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">حسب الكمية فالطلبات التجريبية</p></div>
        {analytics.popularMeals.length ? <ol className="divide-y divide-[var(--color-line)]">{analytics.popularMeals.map(({ meal, quantity }, index) => <li key={meal.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] text-[10px] font-bold text-[var(--color-secondary)]">{index + 1}</span><span className="min-w-0 flex-1 truncate text-xs font-medium">{meal.name}</span><span className="text-xs text-[var(--color-muted)]">{quantity} وجبة</span></li>)}</ol> : <AdminEmptyState title="مازال ما كايناش طلبات" description="الإحصائيات غادي تبان ملي يكونو الطلبات." />}
      </section>
    </div>
  );
}

function ChartPanel({ title, days, valueKey, max, format }) {
  return (
    <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-[var(--color-secondary)]">{title}</h2>
      <div className="mt-5 grid h-44 grid-cols-7 items-end gap-2 border-b border-[var(--color-line)] pb-2 sm:gap-3" role="img" aria-label={title}>
        {days.map((day) => {
          const value = day[valueKey];
          const height = value ? Math.max(10, (value / max) * 100) : 3;
          return <div key={day.key} className="flex h-full min-w-0 flex-col items-center justify-end gap-2">
            <span className="max-w-full truncate text-[9px] text-[var(--color-muted)]">{format(value)}</span>
            <div className="flex h-full w-full items-end"><span className={`w-full rounded-t-md ${value ? "bg-[var(--color-brand)]" : "bg-[#f2f2f4]"}`} style={{ height: `${height}%` }} /></div>
            <span className="text-[9px] text-[var(--color-muted)]">{day.label}</span>
          </div>;
        })}
      </div>
    </section>
  );
}
