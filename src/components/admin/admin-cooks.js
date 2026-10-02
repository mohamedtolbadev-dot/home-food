"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, MapPin, Phone, Star, UserRound } from "lucide-react";
import { useAdminData } from "@/components/admin/admin-provider";
import { AdminEmptyState, AdminFilter, AdminSearchFilterBar, AdminStatusBadge, AdminTable, ConfirmationModal } from "@/components/admin/admin-ui";

const cookStatusOptions = [
  { value: "pending", label: "فانتظار المراجعة" },
  { value: "verified", label: "موثوقة" },
  { value: "suspended", label: "موقوفة" },
  { value: "rejected", label: "مرفوضة" },
];

export function AdminCooksPage() {
  const { data } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const visibleCooks = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ar-MA");
    return data.cooks.filter((cook) => {
      const searchable = `${cook.name} ${cook.cuisineType} ${cook.neighborhood} ${cook.city}`.toLocaleLowerCase("ar-MA");
      const cookLocation = `${cook.city} ${cook.neighborhood}`.toLocaleLowerCase("ar-MA");
      return (!needle || searchable.includes(needle))
        && (!status || cook.status === status)
        && (!location || cookLocation.includes(location.toLocaleLowerCase("ar-MA")));
    });
  }, [data.cooks, location, query, status]);

  const columns = [
    { key: "name", label: "الطباخة", render: (cook) => <Link href={`/admin/cooks/${cook.id}`} className="font-semibold text-[var(--color-secondary)] hover:underline">{cook.name}</Link> },
    { key: "city", label: "المدينة" },
    { key: "neighborhood", label: "الحي" },
    { key: "cuisineType", label: "نوع الماكلة" },
    { key: "rating", label: "التقييم", render: (cook) => <span className="inline-flex items-center gap-1"><Star size={12} className="text-[var(--color-secondary)]" aria-hidden="true" />{cook.rating.toLocaleString("ar-MA")}</span> },
    { key: "orderCount", label: "الطلبات" },
    { key: "status", label: "حالة البروفايل", render: (cook) => <AdminStatusBadge status={cook.status} /> },
    { key: "open", label: "التفاصيل", render: (cook) => <Link href={`/admin/cooks/${cook.id}`} className="font-semibold text-[var(--color-secondary)] hover:underline">فتح</Link> },
  ];

  return (
    <div className="space-y-5">
      <header><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">إدارة الطباخات</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">الطباخات</h1><p className="mt-2 text-sm text-[var(--color-muted)]">شوف البروفايلات والحالة ديال كل طباخة.</p></header>
      <AdminSearchFilterBar value={query} onChange={setQuery} placeholder="قلب على طباخة ولا نوع الماكلة…">
        <AdminFilter label="الحالة" value={status} onChange={setStatus} options={[{ value: "", label: "جميع الحالات" }, ...cookStatusOptions]} />
        <AdminFilter label="المدينة" value={location} onChange={setLocation} options={[{ value: "", label: "جميع المدن" }, ...[...new Set(data.cooks.map((cook) => cook.city))].map((city) => ({ value: city, label: city }))]} />
      </AdminSearchFilterBar>
      <p className="text-xs text-[var(--color-muted)]">{visibleCooks.length} طباخة</p>
      <AdminTable columns={columns} rows={visibleCooks} emptyState={<AdminEmptyState title={query || status || location ? "ما لقينا حتى طباخة" : "ما كايناش طباخات دابا"} description="بدل البحث ولا الفلاتر باش تلقى البروفايلات." />} />
    </div>
  );
}

export function AdminCookDetails({ cookId }) {
  const { data, updateCookStatus } = useAdminData();
  const [confirmation, setConfirmation] = useState(null);
  const cook = data.cooks.find((item) => item.id === cookId);

  if (!cook) return <AdminEmptyState title="ما لقيناش الطباخة" description="هاد البروفايل ما كاينش فالمعطيات التجريبية." />;

  const meals = data.meals.filter((meal) => cook.mealIds.includes(meal.id));
  const reviews = data.reviews.filter((review) => cook.reviewIds.includes(review.id));
  const requestAction = (status, title, description, confirmLabel) => setConfirmation({ status, title, description, confirmLabel });
  const actions = cook.status === "pending"
    ? [
      { label: "قبل البروفايل", status: "verified", title: "تأكيد قبول البروفايل؟", description: "غادي تتبدل الحالة محليا فهاد الجهاز فقط.", confirmLabel: "قبل" },
      { label: "رفض", status: "rejected", title: "رفض هاد البروفايل؟", description: "غادي تتبدل الحالة محليا فهاد الجهاز فقط.", confirmLabel: "رفض" },
    ]
    : cook.status === "verified"
      ? [{ label: "وقف البروفايل", status: "suspended", title: "توقيف هاد البروفايل؟", description: "هاد التغيير غير تجريبي ومحفوظ فهاد الجهاز.", confirmLabel: "وقف البروفايل" }]
      : [{ label: "عاود فعل البروفايل", status: "verified", title: "إعادة تفعيل البروفايل؟", description: "هاد التغيير غير تجريبي ومحفوظ فهاد الجهاز.", confirmLabel: "عاود فعل" }];

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div><Link href="/admin/cooks" className="inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-[var(--color-secondary)] hover:underline"><ArrowRight size={13} aria-hidden="true" /> رجع للطباخات</Link><h1 className="mt-3 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">{cook.name}</h1><p className="mt-1 text-sm text-[var(--color-muted)]">{cook.neighborhood}، {cook.city} · {cook.cuisineType}</p></div>
        <AdminStatusBadge status={cook.status} />
      </header>

      <section className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]">
        <article className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Image src={cook.image} alt={cook.name} width={88} height={88} className="size-[72px] shrink-0 rounded-2xl border border-[var(--color-line)] object-cover sm:size-[88px]" />
            <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">البروفايل</p><p className="mt-2 break-words text-sm leading-6 text-[var(--color-ink)]">{cook.introduction}</p><div className="mt-3 flex flex-wrap gap-2">{cook.specialties.map((specialty) => <span key={specialty} className="rounded-lg border border-[var(--color-line)] bg-[#f8f8f9] px-2.5 py-1 text-[10px] text-[var(--color-ink)]">{specialty}</span>)}</div></div>
          </div>
          <div className="mt-4 grid gap-3 border-t border-[var(--color-line)] pt-4 text-xs sm:grid-cols-2"><p className="flex items-center gap-2"><Phone size={14} className="text-[var(--color-secondary)]" aria-hidden="true" /> <span dir="ltr">{cook.phone}</span></p><p className="break-all">{cook.email}</p><p className="flex items-center gap-2"><MapPin size={14} className="text-[var(--color-secondary)]" aria-hidden="true" />{cook.neighborhood}، {cook.city}</p><p className="flex items-center gap-2"><Star size={14} className="text-[var(--color-secondary)]" aria-hidden="true" />{cook.rating.toLocaleString("ar-MA")} · {cook.orderCount} طلب</p></div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-4">{actions.map((action) => <button key={action.status} type="button" onClick={() => requestAction(action.status, action.title, action.description, action.confirmLabel)} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-[var(--color-secondary)] hover:bg-[var(--color-brand-hover)]">{action.label}</button>)}</div>
          <p className="mt-3 text-[10px] leading-5 text-[var(--color-muted)]">تبديل الحالة تجريبي ومحفوظ غير فهاد الجهاز، وما كاين حتى تحقق قانوني.</p>
        </article>
        <article className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"><div className="flex items-center gap-2"><CalendarDays size={16} className="text-[var(--color-secondary)]" aria-hidden="true" /><h2 className="text-sm font-semibold text-[var(--color-secondary)]">أوقات الخدمة</h2></div><div className="mt-4 flex flex-wrap gap-2">{cook.availability.map((day) => <span key={day} className="rounded-lg border border-[var(--color-line)] px-2.5 py-1.5 text-[11px]">{day}</span>)}</div><p className="mt-3 text-xs text-[var(--color-muted)]">نوع الماكلة: {cook.cuisineType}</p></article>
      </section>

      <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="text-sm font-semibold text-[var(--color-secondary)]">الوجبات</h2><span className="text-xs text-[var(--color-muted)]">{meals.length}</span></div>{meals.length ? <div className="grid gap-2 sm:grid-cols-2">{meals.map((meal) => <div key={meal.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-[var(--color-line)] p-3"><img src={meal.image} alt="" className="size-12 shrink-0 rounded-lg object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{meal.name}</p><p className="mt-1 text-[10px] text-[var(--color-muted)]">{meal.price} DH · {meal.quantity} باقي</p></div><AdminStatusBadge status={meal.status}/></div>)}</div> : <p className="text-xs text-[var(--color-muted)]">ما كايناش وجبات مسجلة.</p>}</section>

      <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="text-sm font-semibold text-[var(--color-secondary)]">المراجعات</h2><span className="text-xs text-[var(--color-muted)]">{reviews.length}</span></div>{reviews.length ? <div className="divide-y divide-[var(--color-line)]">{reviews.map((review) => <article key={review.id} className="flex flex-col gap-2 py-3 first:pt-0 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><p className="text-xs font-semibold">{data.customers.find((customer) => customer.id === review.customerId)?.name} · {review.rating}/5</p><p className="mt-1 break-words text-xs leading-5 text-[var(--color-muted)]">{review.text}</p></div><AdminStatusBadge status={review.status}/></article>)}</div> : <p className="text-xs text-[var(--color-muted)]">مازال ما كايناش مراجعات.</p>}</section>

      {confirmation && <ConfirmationModal title={confirmation.title} description={confirmation.description} confirmLabel={confirmation.confirmLabel} onClose={() => setConfirmation(null)} onConfirm={() => updateCookStatus(cook.id, confirmation.status)} />}
    </div>
  );
}
