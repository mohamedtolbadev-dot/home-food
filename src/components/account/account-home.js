"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import OrderCard from "@/components/account/order-card";
import ProfileCard from "@/components/account/profile-card";
import { readCustomer, readCustomerOrders, writeCustomer } from "@/utils/customer-storage";

export default function AccountHome() {
  const [customer, setCustomer] = useState(readCustomer);
  const [orders, setOrders] = useState([]);
  const [editSection, setEditSection] = useState("");
  const [draft, setDraft] = useState(customer);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const storedCustomer = readCustomer();
      setCustomer(storedCustomer);
      setDraft(storedCustomer);
      setOrders(readCustomerOrders());
    });
    return () => { cancelled = true; };
  }, []);

  const activeOrder = orders.find((order) => !["Livrée", "Annulée"].includes(order.status));

  function openEditor(section) {
    setDraft(customer);
    setEditSection(section);
    setError("");
    setSaved(false);
  }

  function saveProfile(event) {
    event.preventDefault();
    if (editSection === "profile" && !draft.name.trim()) {
      setError("دخل سميتك كاملة.");
      return;
    }
    if (!draft.phone.trim() || !/^\S+@\S+\.\S+$/.test(draft.email.trim())) {
      setError("دخل رقم الهاتف والبريد الإلكتروني صحيحين.");
      return;
    }
    const nextCustomer = { ...draft, name: draft.name.trim(), phone: draft.phone.trim(), email: draft.email.trim() };
    if (!writeCustomer(nextCustomer)) {
      setError("ما قدرناش نحفظو التغييرات فهاد المتصفح.");
      return;
    }
    setCustomer(nextCustomer);
    setEditSection("");
    setSaved(true);
  }

  return (
    <CustomerAccountLayout title="الحساب ديالي" description="معلوماتك والطلبات ديالك فدار مطبخ.">
      <div className="space-y-5">
        {editSection && <form onSubmit={saveProfile} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">تبديل</p><h2 className="mt-1 text-lg font-semibold text-[var(--color-ink)]">{editSection === "profile" ? "البروفايل ديالي" : "معلومات التواصل"}</h2></div>
            <button type="button" onClick={() => setEditSection("")} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-[var(--color-muted)] hover:bg-[#f8f8f9]">رجع</button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {editSection === "profile" && <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">السميّة كاملة</span><input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]" autoComplete="name" /></label>}
            <label className="block"><span className="mb-2 block text-xs font-semibold">رقم الهاتف</span><input type="tel" value={draft.phone} onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]" autoComplete="tel" /></label>
            <label className="block"><span className="mb-2 block text-xs font-semibold">البريد الإلكتروني</span><input type="email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]" autoComplete="email" /></label>
          </div>
          {error && <p role="alert" className="mt-3 text-xs text-[var(--color-brand)]">{error}</p>}
          <button type="submit" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)]">حفظ</button>
        </form>}

        {saved && <p role="status" className="rounded-xl border border-[var(--color-line)] bg-[#f8f8f9] px-3 py-2 text-xs text-[var(--color-ink)]">تبدل البروفايل ديالك.</p>}
        <ProfileCard customer={customer} onEditProfile={() => openEditor("profile")} onEditContact={() => openEditor("contact")} />

        <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">التوصيل</p><h2 className="mt-1 text-base font-semibold text-[var(--color-ink)]">العناوين لي حافظ</h2></div>
            <Link href="/account/addresses" className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--color-line)] px-3 text-xs font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">دبر العناوين ديالي <ArrowRight size={13} aria-hidden="true" /></Link>
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[var(--color-muted)]"><MapPin size={15} className="mt-1 shrink-0" aria-hidden="true" />{customer.neighborhood}, {customer.city}</p>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">الطلبات</p><h2 className="mt-1 text-base font-semibold text-[var(--color-ink)]">الطلب ديالك لي خدام دابا</h2></div><Link href="/account/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand)]">كاع الطلبات <ArrowRight size={13} aria-hidden="true" /></Link></div>
          {activeOrder ? <OrderCard order={activeOrder} /> : <EmptyState type="orders" message="ما كاين حتى طلب خدام دابا." explanation="الطلبات الجاية والتتبع ديالها غادي يبانوا هنا." cta="شوف الماكلة" href="/meals" />}
        </section>
      </div>
    </CustomerAccountLayout>
  );
}