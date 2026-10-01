import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, ChefHat, CircleDollarSign, MapPin, Store } from "lucide-react";
import SiteHeader from "@/components/home/site-header";

const benefits = [
  { icon: Store, title: "Vendez vos plats", description: "Présentez vos recettes à des clients de votre quartier." },
  { icon: CalendarDays, title: "Gérez vos disponibilités", description: "Fixez vos jours et horaires selon votre rythme." },
  { icon: CircleDollarSign, title: "Recevez des commandes", description: "Suivez les demandes et confirmez facilement les livraisons." },
  { icon: MapPin, title: "Développez votre clientèle locale", description: "Trouvez des clients près de chez vous." },
];

const steps = [
  "Créez votre profil",
  "Publiez vos plats",
  "Recevez des commandes",
];

export default function BecomeCookPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[var(--color-canvas)]">
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[#f8f8f9] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">
                <ChefHat size={13} aria-hidden="true" /> Rejoignez la communauté
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-5xl lg:text-[4rem]">Transformez votre cuisine en activité</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)]">Proposez vos plats faits maison à des clients près de chez vous.</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/cook/onboarding" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">Commencer</Link>
                <a href="#comment-ca-marche" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-5 text-sm font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">Comment ça marche ?</a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[30px] border border-[var(--color-line)] bg-[#f8f8f9] p-3 shadow-[0_1px_2px_rgba(32,32,36,0.04)]">
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" alt="Cuisine maison" className="h-[420px] w-full rounded-[22px] object-cover" />
              </div>
              <div className="absolute -bottom-5 left-4 rounded-2xl border border-[var(--color-line)] bg-white p-3 shadow-[0_8px_20px_rgba(32,32,36,0.06)] sm:left-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Cuisines vérifiées</p>
                <p className="mt-1 text-base font-semibold tracking-[-0.04em] text-[var(--color-ink)]">Des profils présentés avec soin</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-line)] bg-[#f8f8f9] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">Pourquoi rejoindre</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-3xl">Une cuisine qui trouve sa clientèle</h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)]">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-brand)]/5 text-[var(--color-brand)]">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="comment-ca-marche" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">Comment ça marche</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-3xl">Une simple étape après l’autre</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((title, index) => (
              <article key={title} className="rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-[0_1px_2px_rgba(32,32,36,0.04)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {index === 0 && "Renseignez votre profil, votre quartier et votre spécialité."}
                  {index === 1 && "Ajoutez vos plats, vos quantités et votre disponibilité."}
                  {index === 2 && "Recevez des commandes et confirmez votre planning."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--color-line)] bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
            <div className="rounded-[28px] border border-[var(--color-line)] bg-[#f8f8f9] p-5 sm:p-7">
              <div className="flex items-center gap-2 text-[var(--color-brand)]">
                <BadgeCheck size={16} aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Confiance et sécurité</p>
              </div>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-muted)]">
                Les profils des cuisinières et cuisiniers sont présentés avec des informations claires pour aider les clients à mieux vous connaître. Les profils peuvent être examinés et validés par la plateforme avant leur mise en ligne.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="rounded-[28px] border border-[var(--color-line)] bg-white p-5 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Prêt à démarrer</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">Créer mon profil</h2>
              </div>
              <Link href="/cook/onboarding" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
                Créer mon profil <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
