"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export function AdminStatCard({ label, value, icon: Icon, note }) {
  return (
    <article className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[var(--color-muted)]">{label}</p>
          <p className="mt-2 text-2xl font-semibold leading-tight text-[var(--color-secondary)]">{value}</p>
          {note && <p className="mt-1 text-[10px] text-[var(--color-muted)]">{note}</p>}
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)] text-[var(--color-secondary)]"><Icon size={17} aria-hidden="true" /></span>
      </div>
    </article>
  );
}

const statusLabels = {
  new: "جديدة", confirmed: "مؤكدة", preparing: "كتحضر", ready: "واجدة", delivery: "فالتوصيل", delivered: "توصلات", canceled: "ملغية",
  pending: "فانتظار المراجعة", verified: "موثوقة", suspended: "موقوفة", rejected: "مرفوضة",
  available: "متوفرة", sold_out: "سالات", hidden: "مخفية", active: "نشيط", visible: "باينة", published: "باينة",
};

export function AdminStatusBadge({ status }) {
  const label = statusLabels[status] ?? status;
  const navy = ["verified"].includes(status);
  const yellow = ["new", "preparing", "ready", "delivery", "pending", "available", "visible", "published"].includes(status);
  const classes = navy
    ? "border-[var(--color-secondary)] bg-[var(--color-secondary)] text-white"
    : yellow
      ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-secondary)]"
      : "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-muted)]";

  return <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${classes}`}>{label}</span>;
}

export function AdminSearchFilterBar({ value, onChange, placeholder = "قلب هنا…", children }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-3 sm:p-4 lg:flex-row lg:items-end">
      <label className="flex min-h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3">
        <Search size={15} className="shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
        <span className="sr-only">بحث</span>
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#85858c]" />
        {value && <button type="button" onClick={() => onChange("")} aria-label="مسح البحث" className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--color-muted)] hover:bg-[#f8f8f9]"><X size={14} aria-hidden="true" /></button>}
      </label>
      {children && <div className="grid min-w-0 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap">{children}</div>}
    </div>
  );
}

export function AdminFilter({ label, value, onChange, options, className = "" }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-1.5 block text-[10px] font-semibold text-[var(--color-muted)]">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full min-w-0 rounded-xl border border-[var(--color-line)] bg-white px-3 text-xs text-[var(--color-ink)] outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/15">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

export function AdminEmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-5 py-10 text-center sm:px-8">
      <h2 className="text-base font-semibold text-[var(--color-secondary)]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">{description}</p>
      {action}
    </div>
  );
}

export function AdminTable({ columns, rows, emptyState, rowKey = (row) => row.id }) {
  if (!rows.length) return emptyState;

  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white xl:block">
        <table className="w-full border-collapse text-right text-xs">
          <thead className="bg-[#f8f8f9] text-[var(--color-muted)]"><tr>{columns.map((column) => <th key={column.key} scope="col" className="whitespace-nowrap px-3 py-3 font-semibold">{column.label}</th>)}</tr></thead>
          <tbody className="divide-y divide-[var(--color-line)]">{rows.map((row) => <tr key={rowKey(row)} className="align-middle">{columns.map((column) => <td key={column.key} className={`px-3 py-3 ${column.className ?? ""}`}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="grid gap-3 xl:hidden">
        {rows.map((row) => (
          <article key={rowKey(row)} className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-3.5">
            {columns.map((column) => (
              <div key={column.key} className="flex min-w-0 items-start justify-between gap-3 border-b border-[var(--color-line)] py-2.5 first:pt-0 last:border-0 last:pb-0">
                <span className="shrink-0 text-[10px] font-semibold text-[var(--color-muted)]">{column.label}</span>
                <div className={`min-w-0 text-left text-xs text-[var(--color-ink)] ${column.className ?? ""}`}>{column.render ? column.render(row) : row[column.key]}</div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </>
  );
}

export function AdminOrderTimeline({ status }) {
  const steps = ["new", "confirmed", "preparing", "ready", "delivery", "delivered"];
  const labels = ["جديدة", "مؤكدة", "كتحضر", "واجدة", "فالتوصيل", "توصلات"];
  const activeIndex = steps.indexOf(status);
  if (status === "canceled") return <p className="rounded-xl border border-[var(--color-line)] bg-[#f8f8f9] p-3 text-xs text-[var(--color-muted)]">هاد الطلب تلغى.</p>;

  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {steps.map((step, index) => {
        const current = activeIndex === index;
        const complete = activeIndex > index;
        return <li key={step} className={`min-w-0 rounded-xl border px-3 py-2.5 ${current ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-secondary)]" : complete ? "border-[var(--color-secondary)]/15 bg-[var(--color-secondary)]/5 text-[var(--color-secondary)]" : "border-[var(--color-line)] bg-white text-[var(--color-muted)]"}`}><p className="text-[9px] font-semibold">0{index + 1}</p><p className="mt-1 break-words text-[11px] font-medium">{labels[index]}</p></li>;
      })}
    </ol>
  );
}

export function ConfirmationModal({ title, description, confirmLabel = "أكد", onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);
  function confirm() {
    setBusy(true);
    onConfirm();
    setBusy(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#202024]/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title" className="w-full max-w-md rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-[0_12px_32px_rgba(32,32,36,0.16)] sm:p-6">
        <h2 id="admin-confirm-title" className="text-lg font-semibold text-[var(--color-secondary)]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="min-h-10 rounded-xl border border-[var(--color-line)] px-4 text-xs font-semibold text-[var(--color-ink)]">رجع</button>
          <button type="button" disabled={busy} onClick={confirm} className="min-h-10 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-[var(--color-secondary)] disabled:opacity-60">{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
