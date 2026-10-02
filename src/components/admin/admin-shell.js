"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ChefHat, ClipboardList, CookingPot, Menu, MessageSquareText, Settings2, ShoppingBag, UsersRound, X } from "lucide-react";

const navigation = [
  { href: "/admin", label: "الرئيسية", icon: Activity },
  { href: "/admin/orders", label: "الطلبات", icon: ClipboardList },
  { href: "/admin/cooks", label: "الطباخات", icon: ChefHat },
  { href: "/admin/customers", label: "الزبناء", icon: UsersRound },
  { href: "/admin/meals", label: "الوجبات", icon: CookingPot },
  { href: "/admin/reviews", label: "المراجعات", icon: MessageSquareText },
  { href: "/admin/analytics", label: "الإحصائيات", icon: ShoppingBag },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings2 },
];

function AdminNavigation({ pathname, onNavigate, mobile = false }) {
  return (
    <nav aria-label="قائمة الإدارة" className={mobile ? "grid gap-1" : "space-y-1"}>
      {navigation.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-10 items-center gap-2.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-secondary)]" : "border-transparent text-[var(--color-muted)] hover:border-[var(--color-line)] hover:bg-[#f8f8f9] hover:text-[var(--color-secondary)]"}`}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminHeader({ menuOpen, onMenuToggle }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5" aria-label="إدارة دار مطبخ">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-white"><ChefHat size={16} aria-hidden="true" /></span>
          <span className="truncate text-sm font-semibold text-[var(--color-secondary)]">إدارة دار مطبخ</span>
        </Link>
        <span className="hidden text-[11px] text-[var(--color-muted)] sm:block">تجربة محلية</span>
        <button type="button" onClick={onMenuToggle} aria-label={menuOpen ? "سد القائمة" : "حل القائمة"} aria-expanded={menuOpen} className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-secondary)] hover:bg-[#f8f8f9] lg:hidden">
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
      {menuOpen && <div className="absolute inset-x-0 top-full z-50 border-b border-[var(--color-line)] bg-white p-3 shadow-[0_8px_20px_rgba(32,32,36,0.08)] lg:hidden"><AdminNavigation pathname={pathname} onNavigate={onMenuToggle} mobile /></div>}
    </header>
  );
}

export function AdminSidebar({ pathname }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 rounded-2xl border border-[var(--color-line)] bg-white p-3">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">الإدارة</p>
        <AdminNavigation pathname={pathname} />
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <AdminHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((current) => !current)} />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 sm:py-7 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-7 lg:px-8">
        <AdminSidebar pathname={pathname} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
