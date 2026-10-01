import Link from "next/link";
import { Activity, ChefHat, CircleDollarSign, ListOrdered, MapPin, UserRound } from "lucide-react";

const navItems = [
  { href: "#overview", label: "الرئيسية", icon: Activity },
  { href: "#meals", label: "الأطباق ديالي", icon: ChefHat },
  { href: "#orders", label: "الطلبات الجديدة", icon: ListOrdered },
  { href: "#availability", label: "أوقات الخدمة", icon: MapPin },
  { href: "#profile", label: "البروفايل ديالي", icon: UserRound },
];

export default function CookSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.03)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">القائمة</p>
        <nav className="mt-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[#f8f8f9] hover:text-[var(--color-brand)]">
              <Icon size={15} aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-[#f8f8f9] p-3">
          <div className="flex items-center gap-2 text-[var(--color-brand)]">
            <CircleDollarSign size={16} aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">المدخول التقريبي</span>
          </div>
          <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-[var(--color-ink)]">1 240 DH</p>
          <p className="mt-1 text-[10px] text-[var(--color-muted)]">اليوم</p>
        </div>
      </div>
    </aside>
  );
}
