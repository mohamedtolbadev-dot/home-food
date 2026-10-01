import Link from "next/link";
import { ChefHat, Menu, X } from "lucide-react";

export default function CookHeader({ title, subtitle, mobileNavOpen, setMobileNavOpen, navItems }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/95 backdrop-blur-[1px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Dar Matbakh, accueil">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-white">
            <ChefHat size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">Cook studio</p>
            <p className="text-sm font-semibold tracking-[-0.04em] text-[var(--color-ink)]">{title}</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="rounded-full px-3 py-2 text-xs font-medium text-[var(--color-muted)] transition-colors hover:bg-[#f7f7f8] hover:text-[var(--color-brand)]">
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={mobileNavOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((current) => !current)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] lg:hidden"
        >
          {mobileNavOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="border-t border-[var(--color-line)] bg-white px-5 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileNavOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[#f8f8f9] hover:text-[var(--color-brand)]">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
