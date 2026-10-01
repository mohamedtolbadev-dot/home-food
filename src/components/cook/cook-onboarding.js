"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Camera, Check, MapPin, Phone, UserRound } from "lucide-react";
import { deliveryAreas } from "@/data/order-options";
import { writeCookOnboarding, readCookOnboarding, writeCookProfile } from "@/utils/cook-storage";

const steps = [
  { label: "Infos", icon: UserRound },
  { label: "Profil", icon: Camera },
  { label: "Disponibilité", icon: MapPin },
  { label: "Confirmation", icon: Check },
];

const cuisineOptions = ["Marocain", "Traditionnel", "Healthy", "Végétarien", "Petit-déjeuner", "Dessert"];
const specialtyOptions = ["Tajines", "Couscous", "Desserts", "Plats mijotés", "Sandwichs", "Salades", "Petit-déjeuner", "Healthy"];
const daysOptions = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function validateStep(stepIndex, values) {
  const nextErrors = {};

  if (stepIndex === 0) {
    if (!values.firstName?.trim()) nextErrors.firstName = "Le prénom est requis.";
    if (!values.lastName?.trim()) nextErrors.lastName = "Le nom est requis.";
    if (!values.phone?.trim()) nextErrors.phone = "Le téléphone est requis.";
    if (!values.city?.trim()) nextErrors.city = "La ville est requise.";
    if (!values.neighborhood?.trim()) nextErrors.neighborhood = "Le quartier est requis.";
  }

  if (stepIndex === 1) {
    if (!values.description?.trim()) nextErrors.description = "Ajoutez une description.";
    if (!values.cuisineType?.trim()) nextErrors.cuisineType = "Choisissez un type de cuisine.";
    if (!values.specialties?.length) nextErrors.specialties = "Sélectionnez au moins une spécialité.";
  }

  if (stepIndex === 2) {
    if (!values.availabilityDays?.length) nextErrors.availabilityDays = "Sélectionnez au moins un jour.";
    if (!values.availabilityHours?.trim()) nextErrors.availabilityHours = "Renseignez vos horaires.";
    if (!values.portionsPerDay || Number(values.portionsPerDay) <= 0) nextErrors.portionsPerDay = "Indiquez une quantité valide.";
  }

  return nextErrors;
}

export default function CookOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => readCookOnboarding());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    writeCookOnboarding(form);
  }, [form]);

  const currentStep = steps[step];
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function handleNext() {
    const nextErrors = validateStep(step, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function handlePrevious() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateField("photo", String(reader.result));
    reader.readAsDataURL(file);
  }

  function toggleSpecialty(value) {
    setForm((current) => {
      const specialties = current.specialties.includes(value)
        ? current.specialties.filter((item) => item !== value)
        : [...current.specialties, value];
      return { ...current, specialties };
    });
    setErrors((current) => ({ ...current, specialties: "" }));
  }

  function toggleDay(value) {
    setForm((current) => {
      const availabilityDays = current.availabilityDays.includes(value)
        ? current.availabilityDays.filter((item) => item !== value)
        : [...current.availabilityDays, value];
      return { ...current, availabilityDays };
    });
    setErrors((current) => ({ ...current, availabilityDays: "" }));
  }

  function handleSubmit() {
    const nextErrors = validateStep(step, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const profile = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      city: form.city,
      neighborhood: form.neighborhood,
      photo: form.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      description: form.description.trim(),
      cuisineType: form.cuisineType,
      specialties: form.specialties,
      availabilityDays: form.availabilityDays,
      availabilityHours: form.availabilityHours.trim(),
      portionsPerDay: Number(form.portionsPerDay),
      profileComplete: true,
    };

    writeCookProfile(profile);
    writeCookOnboarding(form);
    router.push("/cook/dashboard");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <div className="mb-7 rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Devenir cuisinière</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-3xl">Créer votre profil</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Étape</p>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{step + 1} / {steps.length}</p>
          </div>
        </div>

        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-[#f2f2f4]">
          <div className="h-full rounded-full bg-[var(--color-brand)] transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-5 flex gap-2 sm:gap-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const active = index === step;
            const completed = index < step;
            return (
              <div key={item.label} className={`flex items-center gap-2 rounded-full border px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] ${active ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 text-[var(--color-brand)]" : completed ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-[var(--color-line)] bg-[#f8f8f9] text-[var(--color-muted)]"}`}>
                <span className="flex size-5 items-center justify-center rounded-full bg-white text-current">
                  <Icon size={12} aria-hidden="true" />
                </span>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-6 lg:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[var(--color-brand)]">
              <Phone size={15} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">Informations personnelles</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Prénom</span>
                <input value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Khadija" />
                {errors.firstName && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.firstName}</span>}
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Nom</span>
                <input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Bennis" />
                {errors.lastName && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.lastName}</span>}
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Téléphone</span>
                <input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="06 00 00 00 00" />
                {errors.phone && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.phone}</span>}
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Ville</span>
                <select value={form.city} onChange={(event) => updateField("city", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]">
                  {Object.keys(deliveryAreas).map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
                {errors.city && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.city}</span>}
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Quartier</span>
                <select value={form.neighborhood} onChange={(event) => updateField("neighborhood", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]">
                  {(deliveryAreas[form.city] ?? ["Agdal"]).map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
                {errors.neighborhood && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.neighborhood}</span>}
              </label>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[var(--color-brand)]">
              <Camera size={15} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">Profil cuisine</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[180px_1fr] lg:items-start">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-[#f8f8f9] p-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[var(--color-line)] bg-white">
                  {form.photo ? <img src={form.photo} alt="Aperçu de la photo" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-[var(--color-muted)]">Photo</div>}
                </div>
                <label className="mt-3 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-3 text-xs font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">
                  Ajouter une photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Description</span>
                  <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} rows={5} className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Parlez de votre cuisine, de vos recettes et de votre façon de cuisiner." />
                  {errors.description && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.description}</span>}
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Type de cuisine</span>
                    <select value={form.cuisineType} onChange={(event) => updateField("cuisineType", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]">
                      {cuisineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    {errors.cuisineType && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.cuisineType}</span>}
                  </label>

                  <div className="block">
                    <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Spécialités</span>
                    <div className="flex flex-wrap gap-2">
                      {specialtyOptions.map((specialty) => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => toggleSpecialty(specialty)}
                          className={`rounded-full border px-2.5 py-1.5 text-[11px] font-medium ${form.specialties.includes(specialty) ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[#d2d2d7]"}`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                    {errors.specialties && <span className="mt-2 block text-xs text-[var(--color-brand)]">{errors.specialties}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[var(--color-brand)]">
              <MapPin size={15} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">Disponibilité</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Jours disponibles</span>
                <div className="flex flex-wrap gap-2">
                  {daysOptions.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium ${form.availabilityDays.includes(day) ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[#d2d2d7]"}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {errors.availabilityDays && <span className="mt-2 block text-xs text-[var(--color-brand)]">{errors.availabilityDays}</span>}
              </div>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Horaires</span>
                <input value={form.availabilityHours} onChange={(event) => updateField("availabilityHours", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="12:00 - 18:00" />
                {errors.availabilityHours && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.availabilityHours}</span>}
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Portions par jour</span>
                <input type="number" min="1" value={form.portionsPerDay} onChange={(event) => updateField("portionsPerDay", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="24" />
                {errors.portionsPerDay && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.portionsPerDay}</span>}
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[var(--color-brand)]">
              <Check size={15} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">Confirmation</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-line)] bg-[#f8f8f9] p-4 sm:col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Profil</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative size-12 overflow-hidden rounded-full border border-[var(--color-line)] bg-white">
                    {form.photo ? <img src={form.photo} alt="Preview" className="h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center text-[10px] text-[var(--color-muted)]">PP</span>}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[var(--color-ink)]">{form.firstName || "Prénom"} {form.lastName || "Nom"}</p>
                    <p className="text-xs text-[var(--color-muted)]">{form.cuisineType} · {form.city}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Coordonnées</p>
                <p className="mt-2 text-sm text-[var(--color-ink)]">{form.phone}</p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{form.neighborhood}, {form.city}</p>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Disponibilité</p>
                <p className="mt-2 text-sm text-[var(--color-ink)]">{form.availabilityDays.join(", ") || "À définir"}</p>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{form.availabilityHours || "À définir"}</p>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Description</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]">{form.description || "Ajoutez une description pour présenter votre cuisine."}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--color-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={handlePrevious} disabled={step === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7] disabled:cursor-not-allowed disabled:opacity-40">
            <ArrowLeft size={15} aria-hidden="true" /> Retour
          </button>

          {step < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
              Suivant <ArrowRight size={15} aria-hidden="true" />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
              Créer mon profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
