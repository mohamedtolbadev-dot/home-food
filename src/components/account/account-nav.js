"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MapPin, Package, UserRound } from "lucide-react";

const links = [
  { href: "/account", label: "Mon profil", icon: UserRound },
  { href: "/account/orders", label: "Mes commandes", icon: Package },
  { href: "/account/addresses", label: "Mes adresses", icon: MapPin },
  { href: "/account/favorites", label: "Mes favoris", icon: Heart },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation du compte" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-col lg:gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/account" ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors lg:border-transparent lg:px-3 ${active ? "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-[var(--color-brand)] lg:border-transparent" : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[#d2d2d7] hover:text-[var(--color-ink)] lg:hover:bg-[#f8f8f9]"}`}>
            <Icon size={15} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}