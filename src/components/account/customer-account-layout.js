import SiteHeader from "@/components/home/site-header";
import AccountNav from "@/components/account/account-nav";

export default function CustomerAccountLayout({ title, description, children }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10">
          <div className="mb-6 border-b border-[var(--color-line)] pb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand)]">Espace client</p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-3xl">{title}</h1>
            {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">{description}</p>}
          </div>
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">
            <AccountNav />
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}