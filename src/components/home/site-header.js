"use client";

import { useState } from "react";
import { ChefHat, Menu, ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrder } from "@/context/order-context";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useOrder();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const links = [
    { href: isHome ? "#plats-du-jour" : "/meals", label: "Découvrir" , active: pathname.startsWith("/meals") },
    { href: isHome ? "#comment-ca-marche" : "/#comment-ca-marche", label: "Comment ça marche" },
    { href: isHome ? "#devenir-cuisinier" : "/#devenir-cuisinier", label: "Devenir cuisinière" },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-canvas)]">
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">
        <Link href="/" onClick={closeMenu} className="flex shrink-0 items-center gap-2.5" aria-label="Dar Matbakh, accueil">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-white">
            <ChefHat aria-hidden="true" size={19} strokeWidth={1.8} />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.04em]">dar matbakh</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={link.active ? "page" : undefined}
              className={`text-[13px] font-medium transition-colors hover:text-[var(--color-brand)] ${link.active ? "text-[var(--color-brand)]" : "text-[var(--color-muted)]"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/account" className="text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]">Mon compte</Link>
          {itemCount > 0 && <Link href="/checkout" aria-label={`Panier, ${itemCount} article${itemCount === 1 ? "" : "s"}`} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)]"><ShoppingBasket size={16} aria-hidden="true" /> Panier <span>({itemCount})</span></Link>}
          <Link href="/meals" className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-[13px] font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Commander</Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-ink)] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-[var(--color-line)] px-5 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu} aria-current={link.active ? "page" : undefined} className={`border-b border-[var(--color-line)] py-3.5 text-sm font-medium ${link.active ? "text-[var(--color-brand)]" : "text-[var(--color-ink)]"}`}>{link.label}</Link>
            ))}
            <Link href="/account" onClick={closeMenu} className="py-3.5 text-sm font-medium text-[var(--color-muted)]">Mon compte</Link>
            {itemCount > 0 && <Link href="/checkout" onClick={closeMenu} className="flex items-center gap-2 border-t border-[var(--color-line)] py-3.5 text-sm font-medium text-[var(--color-ink)]"><ShoppingBasket size={16} aria-hidden="true" /> Panier ({itemCount})</Link>}
            <Link href="/meals" onClick={closeMenu} className="mt-1 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white action-feedback">Commander</Link>
          </div>
        </div>
      )}
    </header>
  );
}
