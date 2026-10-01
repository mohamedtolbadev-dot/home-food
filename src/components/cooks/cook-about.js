import { CookingPot } from "lucide-react";

export default function CookAbout({ cook }) {
  return (
    <section aria-labelledby="about-title" className="border-b border-[var(--color-line)] py-7 sm:py-8">
      <h2 id="about-title" className="text-lg font-semibold tracking-[-0.03em]">على {cook.name.split(" ")[0]}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-muted)]">{cook.about}</p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-12">
        <div className="min-w-0">
          <h3 className="text-xs font-semibold">التخصصات ديالها</h3>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[var(--color-muted)]">{cook.specialties.map((specialty) => <li key={specialty}>{specialty}</li>)}</ul>
        </div>
        <div className="min-w-0">
          <h3 className="text-xs font-semibold">الطبخ ديالها</h3>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]"><CookingPot size={13} aria-hidden="true" /> {cook.experience}</p>
        </div>
      </div>
    </section>
  );
}
