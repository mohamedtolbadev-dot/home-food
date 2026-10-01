"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AddressCard from "@/components/account/address-card";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import { deliveryAreas } from "@/data/order-options";
import { readAddresses, writeAddresses } from "@/utils/customer-storage";

const blankAddress = { label: "Maison", city: "Rabat", neighborhood: "Agdal", address: "", instructions: "" };

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankAddress);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setAddresses(readAddresses());
    });
    return () => { cancelled = true; };
  }, []);

  function openForm(address = null) {
    setEditing(address?.id ?? "new");
    setForm(address ? { ...address } : { ...blankAddress });
    setErrors({});
    setNotice("");
  }

  function saveAddress(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.label) nextErrors.label = "ختار شنو نسميّو هاد العنوان.";
    if (!deliveryAreas[form.city]?.includes(form.neighborhood)) nextErrors.neighborhood = "ختار حي صحيح.";
    if (form.address.trim().length < 5) nextErrors.address = "دخل العنوان كامل.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const currentAddress = addresses.find((address) => address.id === editing);
    const nextAddress = { ...form, id: currentAddress?.id ?? `address-${Date.now()}`, address: form.address.trim(), instructions: form.instructions.trim(), isDefault: currentAddress?.isDefault ?? addresses.length === 0 };
    const nextAddresses = editing === "new" ? [...addresses, nextAddress] : addresses.map((address) => address.id === editing ? nextAddress : address);
    if (!writeAddresses(nextAddresses)) {
      setNotice("ما قدرناش نحفظو هاد العنوان فهاد المتصفح.");
      return;
    }
    setAddresses(nextAddresses);
    setEditing(null);
    setNotice("تحفظ العنوان.");
  }

  function removeAddress(id) {
    const removed = addresses.find((address) => address.id === id);
    const nextAddresses = addresses.filter((address) => address.id !== id);
    if (removed?.isDefault && nextAddresses.length) nextAddresses[0] = { ...nextAddresses[0], isDefault: true };
    writeAddresses(nextAddresses);
    setAddresses(nextAddresses);
    setNotice("تمسح العنوان.");
  }

  function setDefault(id) {
    const nextAddresses = addresses.map((address) => ({ ...address, isDefault: address.id === id }));
    writeAddresses(nextAddresses);
    setAddresses(nextAddresses);
    setNotice("تبدل العنوان الرئيسي.");
  }

  return (
    <CustomerAccountLayout title="العناوين ديالي" description="حفظ العناوين لي بغيتي يوصلك فيها الطلب.">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--color-muted)]">{addresses.length} عنوان محفوظ</p>
          {!editing && addresses.length > 0 && <button type="button" onClick={() => openForm()} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback"><Plus size={14} aria-hidden="true" /> زيد عنوان</button>}
        </div>

        {editing && <form noValidate onSubmit={saveAddress} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">عنوان التوصيل</p><h2 className="mt-1 text-lg font-semibold">{editing === "new" ? "زيد عنوان" : "بدل العنوان"}</h2></div><button type="button" onClick={() => setEditing(null)} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-[var(--color-muted)] hover:bg-[#f8f8f9]">رجع</button></div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block text-xs font-semibold">نوع العنوان</span><select value={form.label} onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]"><option value="Maison">الدار</option><option value="Bureau">الخدمة</option><option value="Autre">آخر</option></select>{errors.label && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.label}</span>}</label>
            <label className="block"><span className="mb-2 block text-xs font-semibold">المدينة</span><select value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value, neighborhood: deliveryAreas[event.target.value][0] }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]">{Object.keys(deliveryAreas).map((city) => <option key={city}>{city}</option>)}</select></label>
            <label className="block"><span className="mb-2 block text-xs font-semibold">الحي</span><select value={form.neighborhood} onChange={(event) => setForm((current) => ({ ...current, neighborhood: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]">{deliveryAreas[form.city].map((neighborhood) => <option key={neighborhood}>{neighborhood}</option>)}</select>{errors.neighborhood && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.neighborhood}</span>}</label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">العنوان</span><textarea value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} rows={2} className="w-full resize-y rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="الزنقة، الرقم، الإقامة، الشقة…" />{errors.address && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.address}</span>}</label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">معلومات زيادة <span className="font-normal text-[var(--color-muted)]">(اختياري)</span></span><textarea value={form.instructions} onChange={(event) => setForm((current) => ({ ...current, instructions: event.target.value }))} rows={2} className="w-full resize-y rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="الطابق، كود الباب، شي علامة قريبة…" /></label>
          </div>
          {Object.keys(errors).length > 0 && <p role="alert" className="mt-3 text-xs text-[var(--color-brand)]">راجع الخانات لي باينين قبل ما تحفظ.</p>}
          <button type="submit" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)]">حفظ العنوان</button>
        </form>}

        {notice && <p role="status" className="text-xs text-[var(--color-muted)]">{notice}</p>}
        {addresses.length ? <div className="grid gap-3">{addresses.map((address) => <AddressCard key={address.id} address={address} onEdit={openForm} onDelete={removeAddress} onSetDefault={setDefault} />)}</div> : <EmptyState type="addresses" message="مازال ما حفظتي حتى عنوان." explanation="زيد عنوان باش تلقاه واجد ملي تبغي تطلب المرة الجاية." cta="زيد عنوان" onAction={() => openForm()} />}
      </div>
    </CustomerAccountLayout>
  );
}