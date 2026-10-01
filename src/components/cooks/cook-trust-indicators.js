import { BadgeCheck, CookingPot, MessageCircleMore, PackageCheck } from "lucide-react";

export default function CookTrustIndicators({ cook }) {
  const indicators = [
    cook.verified && { icon: BadgeCheck, label: "بروفايل موثوق", detail: "معلومات البروفايل متأكد منها" },
    { icon: MessageCircleMore, label: `${cook.reviewsCount} رأي`, detail: `التقييم هو ${cook.rating} من 5` },
    { icon: PackageCheck, label: `${cook.ordersCount} طبق تشارك`, detail: "الطلبات لي تبانو فالبروفايل" },
    { icon: CookingPot, label: "ماكلة ديال الدار", detail: cook.cuisineStyle },
  ].filter(Boolean);

  return (
    <section aria-labelledby="trust-title" className="py-7 sm:py-8">
      <h2 id="trust-title" className="text-lg font-semibold tracking-[-0.03em]">بكل ثقة</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {indicators.map(({ icon: Icon, label, detail }) => <li key={label} className="flex items-start gap-3 border-t border-[var(--color-line)] pt-3"><Icon size={16} className="mt-0.5 shrink-0 text-[var(--color-brand)]" aria-hidden="true" /><div><p className="text-xs font-semibold">{label}</p><p className="mt-1 text-[11px] leading-5 text-[var(--color-muted)]">{detail}</p></div></li>)}
      </ul>
    </section>
  );
}
