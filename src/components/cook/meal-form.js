import { useEffect, useMemo, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const defaultMeal = {
  name: "",
  description: "",
  price: "",
  quantityAvailable: "",
  category: "Marocain",
  date: new Date().toISOString().slice(0, 10),
  preparationTime: "12:30",
  image: "",
  allergens: "",
};

export default function MealForm({ initialData = null, onSubmit, onClose }) {
  const [form, setForm] = useState(initialData ?? defaultMeal);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const imagePreview = useMemo(() => {
    if (typeof form.image === "string" && form.image) return form.image;
    return "";
  }, [form.image]);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateField("image", String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextMeal = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      allergens: form.allergens.trim(),
      price: Number(form.price),
      quantityAvailable: Number(form.quantityAvailable),
    };

    if (!nextMeal.name || !nextMeal.description || !nextMeal.price || !nextMeal.quantityAvailable) {
      setError("Complétez tous les champs obligatoires pour enregistrer votre plat.");
      return;
    }

    if (!nextMeal.image) {
      setError("Ajoutez une photo pour rendre le plat plus attrayant.");
      return;
    }

    onSubmit({
      ...nextMeal,
      id: initialData?.id ?? `cook-meal-${Date.now()}`,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#202024]/35 p-3 sm:items-center sm:p-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-white shadow-[0_18px_40px_rgba(32,32,36,0.12)]">
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Plat</p>
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink)]">{initialData ? "Modifier le plat" : "Ajouter un plat"}</h3>
          </div>
          <button type="button" onClick={onClose} className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-brand)]" aria-label="Fermer">
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Nom du plat</span>
              <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Tajine de poulet" />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Description</span>
              <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} rows={3} className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Décrivez votre plat et son goût maison." />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Prix</span>
              <input type="number" min="0" value={form.price} onChange={(event) => updateField("price", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="58" />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Quantité disponible</span>
              <input type="number" min="0" value={form.quantityAvailable} onChange={(event) => updateField("quantityAvailable", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="10" />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Catégorie</span>
              <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]">
                <option value="Marocain">Marocain</option>
                <option value="Traditionnel">Traditionnel</option>
                <option value="Healthy">Healthy</option>
                <option value="Petit-déjeuner">Petit-déjeuner</option>
                <option value="Végétarien">Végétarien</option>
                <option value="Dessert">Dessert</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Date</span>
              <input type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]" />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Heure de préparation</span>
              <input type="time" value={form.preparationTime} onChange={(event) => updateField("preparationTime", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]" />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Allergènes / ingrédients</span>
              <input value={form.allergens} onChange={(event) => updateField("allergens", event.target.value)} className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-[#85858c] focus:border-[var(--color-brand)]" placeholder="Arachides, lait, gluten..." />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold text-[var(--color-ink)]">Photo</span>
              <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[var(--color-line)] bg-[#f8f8f9] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[var(--color-brand)] shadow-[0_1px_2px_rgba(32,32,36,0.04)]">
                    <ImagePlus size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">Télécharger une image</p>
                    <p className="text-[11px] text-[var(--color-muted)]">JPG ou PNG</p>
                  </div>
                </div>

                <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full max-w-[180px] text-xs text-[var(--color-muted)] file:mr-3 file:rounded-xl file:border-0 file:bg-[var(--color-brand)] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
              </div>
              {imagePreview && (
                <div className="mt-3 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[#f8f8f9] p-2">
                  <img src={imagePreview} alt="Aperçu du plat" className="h-28 w-full rounded-lg object-cover" />
                </div>
              )}
            </label>
          </div>

          {error && <p className="rounded-xl border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 px-3 py-2 text-xs text-[var(--color-brand)]">{error}</p>}

          <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-line)] pt-4 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] hover:border-[#d2d2d7]">
              Annuler
            </button>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback">
              {initialData ? "Enregistrer" : "Ajouter le plat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
