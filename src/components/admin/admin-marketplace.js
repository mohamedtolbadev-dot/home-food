"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdminData } from "@/components/admin/admin-provider";
import { AdminEmptyState, AdminFilter, AdminSearchFilterBar, AdminStatusBadge, AdminTable, ConfirmationModal } from "@/components/admin/admin-ui";

function money(value) {
  return `${Number(value || 0).toLocaleString("ar-MA")} DH`;
}

export function AdminMealsPage() {
  const { data, updateMeal } = useAdminData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const visibleMeals = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ar-MA");
    return data.meals.filter((meal) => {
      const cook = data.cooks.find((item) => item.id === meal.cookId);
      const searchable = `${meal.name} ${cook?.name ?? ""} ${meal.category}`.toLocaleLowerCase("ar-MA");
      return (!needle || searchable.includes(needle))
        && (!category || meal.category === category)
        && (!status || meal.status === status);
    });
  }, [category, data.cooks, data.meals, query, status]);

  const columns = [
    { key: "image", label: "الوجبة", render: (meal) => <div className="flex min-w-0 items-center gap-2"><Image src={meal.image} alt="" width={40} height={40} className="size-10 shrink-0 rounded-lg object-cover"/><span className="min-w-0 break-words font-semibold">{meal.name}</span></div> },
    { key: "cook", label: "الطباخة", render: (meal) => data.cooks.find((cook) => cook.id === meal.cookId)?.name ?? "طباخة" },
    { key: "price", label: "الثمن", render: (meal) => money(meal.price) },
    { key: "quantity", label: "الكمية", render: (meal) => `${meal.quantity} باقي` },
    { key: "category", label: "النوع" },
    { key: "status", label: "الحالة", render: (meal) => <AdminStatusBadge status={meal.status} /> },
    { key: "actions", label: "التدبير", render: (meal) => <div className="flex min-w-36 flex-col gap-2"><select aria-label={`بدل حالة ${meal.name}`} value={meal.status} onChange={(event) => updateMeal(meal.id, { status: event.target.value })} className="h-9 rounded-lg border border-[var(--color-line)] bg-white px-2 text-[10px] outline-none focus:border-[var(--color-secondary)]"><option value="available">متوفرة</option><option value="sold_out">سالات</option><option value="hidden">مخفية</option></select><button type="button" onClick={() => updateMeal(meal.id, { status: meal.status === "hidden" ? (meal.quantity > 0 ? "available" : "sold_out") : "hidden" })} className="min-h-8 rounded-lg border border-[var(--color-line)] px-2 text-[10px] font-semibold text-[var(--color-secondary)]">{meal.status === "hidden" ? "بينها" : "خبيها"}</button></div> },
  ];

  return (
    <div className="space-y-5">
      <header><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">كتالوغ المنصة</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">الوجبات</h1><p className="mt-2 text-sm text-[var(--color-muted)]">راقب الوجبات والثمن والكمية والحالة ديالها.</p></header>
      <AdminSearchFilterBar value={query} onChange={setQuery} placeholder="قلب على وجبة ولا طباخة…">
        <AdminFilter label="النوع" value={category} onChange={setCategory} options={[{ value: "", label: "جميع الأنواع" }, ...[...new Set(data.meals.map((meal) => meal.category))].map((item) => ({ value: item, label: item }))]} />
        <AdminFilter label="الحالة" value={status} onChange={setStatus} options={[{ value: "", label: "جميع الحالات" }, { value: "available", label: "متوفرة" }, { value: "sold_out", label: "سالات" }, { value: "hidden", label: "مخفية" }]} />
      </AdminSearchFilterBar>
      <p className="text-xs text-[var(--color-muted)]">{visibleMeals.length} وجبة</p>
      <AdminTable columns={columns} rows={visibleMeals} emptyState={<AdminEmptyState title={query || category || status ? "ما لقينا حتى وجبة" : "ما كايناش وجبات دابا"} description="بدل البحث ولا الفلاتر باش تشوف وجبات خرين." />} />
    </div>
  );
}

export function AdminCustomersPage() {
  const { data, updateCustomerStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const summaries = useMemo(() => data.customers.map((customer) => {
    const orders = data.orders.filter((order) => order.customerId === customer.id);
    return { ...customer, totalOrders: orders.length, totalSpent: orders.filter((order) => order.status !== "canceled").reduce((sum, order) => sum + order.total, 0) };
  }), [data.customers, data.orders]);
  const visibleCustomers = summaries.filter((customer) => `${customer.name} ${customer.phone} ${customer.city}`.toLocaleLowerCase("ar-MA").includes(query.trim().toLocaleLowerCase("ar-MA")) && (!status || customer.status === status) && (!city || customer.city === city));

  const columns = [
    { key: "name", label: "الزبون", render: (customer) => <span className="font-semibold">{customer.name}</span> },
    { key: "phone", label: "الهاتف", render: (customer) => <span dir="ltr">{customer.phone}</span> },
    { key: "city", label: "المدينة" },
    { key: "totalOrders", label: "الطلبات" },
    { key: "totalSpent", label: "المجموع", render: (customer) => money(customer.totalSpent) },
    { key: "status", label: "الحالة", render: (customer) => <AdminStatusBadge status={customer.status} /> },
    { key: "action", label: "تبديل الحالة", render: (customer) => <button type="button" onClick={() => updateCustomerStatus(customer.id, customer.status === "active" ? "suspended" : "active")} className="min-h-9 rounded-lg border border-[var(--color-line)] px-2.5 text-[10px] font-semibold text-[var(--color-secondary)]">{customer.status === "active" ? "وقف الحساب" : "رجع الحساب"}</button> },
  ];

  return (
    <div className="space-y-5">
      <header><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">مجتمع دار مطبخ</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">الزبناء</h1><p className="mt-2 text-sm text-[var(--color-muted)]">معلومات الزبناء والطلبات ديالهم فهاد الديمو.</p></header>
      <AdminSearchFilterBar value={query} onChange={setQuery} placeholder="قلب بالاسم ولا رقم الهاتف…">
        <AdminFilter label="الحالة" value={status} onChange={setStatus} options={[{ value: "", label: "جميع الحالات" }, { value: "active", label: "نشيط" }, { value: "suspended", label: "موقوف" }]} />
        <AdminFilter label="المدينة" value={city} onChange={setCity} options={[{ value: "", label: "جميع المدن" }, ...[...new Set(data.customers.map((customer) => customer.city))].map((item) => ({ value: item, label: item }))]} />
      </AdminSearchFilterBar>
      <p className="text-xs text-[var(--color-muted)]">{visibleCustomers.length} زبون</p>
      <AdminTable columns={columns} rows={visibleCustomers} emptyState={<AdminEmptyState title={query || status || city ? "ما لقينا حتى زبون" : "ما كاين حتى زبون دابا"} description="جرب تبدل البحث ولا الفلاتر." />} />
    </div>
  );
}

export function AdminReviewsPage() {
  const { data, updateReviewStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const visibleReviews = useMemo(() => data.reviews.filter((review) => {
    const customer = data.customers.find((item) => item.id === review.customerId);
    const cook = data.cooks.find((item) => item.id === review.cookId);
    const meal = data.meals.find((item) => item.id === review.mealId);
    const searchable = `${customer?.name ?? ""} ${cook?.name ?? ""} ${meal?.name ?? ""} ${review.text}`.toLocaleLowerCase("ar-MA");
    return (!query || searchable.includes(query.trim().toLocaleLowerCase("ar-MA"))) && (!status || review.status === status) && (!rating || review.rating === Number(rating));
  }), [data, query, rating, status]);

  const columns = [
    { key: "customer", label: "الزبون", render: (review) => data.customers.find((customer) => customer.id === review.customerId)?.name ?? "زبون" },
    { key: "cook", label: "الطباخة", render: (review) => data.cooks.find((cook) => cook.id === review.cookId)?.name ?? "طباخة" },
    { key: "meal", label: "الوجبة", render: (review) => data.meals.find((meal) => meal.id === review.mealId)?.name ?? "وجبة" },
    { key: "rating", label: "التقييم", render: (review) => `${review.rating} / 5` },
    { key: "text", label: "المراجعة", render: (review) => <span className="block max-w-xs break-words leading-5">{review.text}</span> },
    { key: "date", label: "التاريخ" },
    { key: "status", label: "الحالة", render: (review) => <AdminStatusBadge status={review.status} /> },
    { key: "action", label: "إظهار", render: (review) => <button type="button" onClick={() => updateReviewStatus(review.id, review.status === "visible" ? "hidden" : "visible")} className="min-h-9 rounded-lg border border-[var(--color-line)] px-2.5 text-[10px] font-semibold text-[var(--color-secondary)]">{review.status === "visible" ? "خبيها" : "بينها"}</button> },
  ];

  return (
    <div className="space-y-5">
      <header><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">آراء المجتمع</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">المراجعات</h1><p className="mt-2 text-sm text-[var(--color-muted)]">عرض وإخفاء المراجعات فهاد النسخة التجريبية.</p></header>
      <AdminSearchFilterBar value={query} onChange={setQuery} placeholder="قلب على زبون، طباخة ولا وجبة…">
        <AdminFilter label="الحالة" value={status} onChange={setStatus} options={[{ value: "", label: "جميع الحالات" }, { value: "visible", label: "باينة" }, { value: "hidden", label: "مخفية" }]} />
        <AdminFilter label="التقييم" value={rating} onChange={setRating} options={[{ value: "", label: "جميع التقييمات" }, ...[5, 4, 3, 2, 1].map((value) => ({ value: String(value), label: `${value} / 5` }))]} />
      </AdminSearchFilterBar>
      <AdminTable columns={columns} rows={visibleReviews} emptyState={<AdminEmptyState title={query || status || rating ? "ما لقينا حتى مراجعة" : "ما كايناش مراجعات دابا"} description="المراجعات الجديدة غادي تلقاها هنا." />} />
    </div>
  );
}

export function AdminSettingsPage() {
  const { resetDemo } = useAdminData();
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="space-y-5">
      <header><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">تفضيلات</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">الإعدادات</h1><p className="mt-2 text-sm text-[var(--color-muted)]">إعدادات بسيطة ديال هاد النسخة التجريبية.</p></header>
      <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"><h2 className="text-sm font-semibold text-[var(--color-secondary)]">المعطيات التجريبية</h2><p className="mt-2 max-w-xl text-xs leading-5 text-[var(--color-muted)]">التغييرات لي كتدير هنا كتتحفظ غير فهاد المتصفح، وما كاين لا سيرفر لا حسابات إدارية حقيقية.</p><button type="button" onClick={() => setConfirmReset(true)} className="mt-4 min-h-10 rounded-xl border border-[var(--color-line)] px-4 text-xs font-semibold text-[var(--color-secondary)] hover:bg-[#f8f8f9]">رجع بيانات الديمو</button></section>
      {confirmReset && <ConfirmationModal title="ترجع بيانات الديمو كيف كانت؟" description="غادي يتمسحو التغييرات المحلية ديال الإدارة ويرجعو المعطيات التجريبية الأصلية." confirmLabel="رجع البيانات" onClose={() => setConfirmReset(false)} onConfirm={resetDemo} />}
    </div>
  );
}
