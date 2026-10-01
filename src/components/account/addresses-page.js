"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AddressCard from "@/components/account/address-card";
import CustomerAccountLayout from "@/components/account/customer-account-layout";
import EmptyState from "@/components/account/empty-state";
import { deliveryAreas } from "@/data/order-options";
import { readAddresses, writeAddresses } from "@/utils/customer-storage";

const blankAddress = { label: "Maison", city: "Rabat", neighborhood: "Agdal", address: "", instructions: "" };

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankAddress);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setAddresses(readAddresses());
    });
    return () => { cancelled = true; };
  }, []);

  function openForm(address = null) {
    setEditing(address?.id ?? "new");
    setForm(address ? { ...address } : { ...blankAddress });
    setErrors({});
    setNotice("");
  }

  function saveAddress(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.label) nextErrors.label = "Choisissez un libellé.";
    if (!deliveryAreas[form.city]?.includes(form.neighborhood)) nextErrors.neighborhood = "Choisissez un quartier valide.";
    if (form.address.trim().length < 5) nextErrors.address = "Renseignez une adresse complète.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const currentAddress = addresses.find((address) => address.id === editing);
    const nextAddress = { ...form, id: currentAddress?.id ?? `address-${Date.now()}`, address: form.address.trim(), instructions: form.instructions.trim(), isDefault: currentAddress?.isDefault ?? addresses.length === 0 };
    const nextAddresses = editing === "new" ? [...addresses, nextAddress] : addresses.map((address) => address.id === editing ? nextAddress : address);
    if (!writeAddresses(nextAddresses)) {
      setNotice("Impossible d’enregistrer cette adresse dans ce navigateur.");
      return;
    }
    setAddresses(nextAddresses);
    setEditing(null);
    setNotice("Adresse enregistrée.");
  }

  function removeAddress(id) {
    const removed = addresses.find((address) => address.id === id);
    const nextAddresses = addresses.filter((address) => address.id !== id);
    if (removed?.isDefault && nextAddresses.length) nextAddresses[0] = { ...nextAddresses[0], isDefault: true };
    writeAddresses(nextAddresses);
    setAddresses(nextAddresses);
    setNotice("Adresse supprimée.");
  }

  function setDefault(id) {
    const nextAddresses = addresses.map((address) => ({ ...address, isDefault: address.id === id }));
    writeAddresses(nextAddresses);
    setAddresses(nextAddresses);
    setNotice("Adresse principale mise à jour.");
  }

  return (
    <CustomerAccountLayout title="Mes adresses" description="Enregistrez les lieux où vous souhaitez recevoir vos commandes.">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--color-muted)]">{addresses.length} adresse{addresses.length === 1 ? "" : "s"} enregistrée{addresses.length === 1 ? "" : "s"}</p>
          {!editing && addresses.length > 0 && <button type="button" onClick={() => openForm()} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] action-feedback"><Plus size={14} aria-hidden="true" /> Ajouter une adresse</button>}
        </div>

        {editing && <form noValidate onSubmit={saveAddress} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(32,32,36,0.04)] sm:p-5">
          <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-brand)]">Adresse de livraison</p><h2 className="mt-1 text-lg font-semibold">{editing === "new" ? "Ajouter une adresse" : "Modifier l’adresse"}</h2></div><button type="button" onClick={() => setEditing(null)} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-[var(--color-muted)] hover:bg-[#f8f8f9]">Annuler</button></div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block text-xs font-semibold">Libellé</span><select value={form.label} onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]"><option>Maison</option><option>Bureau</option><option>Autre</option></select>{errors.label && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.label}</span>}</label>
            <label className="block"><span className="mb-2 block text-xs font-semibold">Ville</span><select value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value, neighborhood: deliveryAreas[event.target.value][0] }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]">{Object.keys(deliveryAreas).map((city) => <option key={city}>{city}</option>)}</select></label>
            <label className="block"><span className="mb-2 block text-xs font-semibold">Quartier</span><select value={form.neighborhood} onChange={(event) => setForm((current) => ({ ...current, neighborhood: event.target.value }))} className="h-11 w-full rounded-xl border border-[var(--color-line)] px-3 text-sm outline-none focus:border-[var(--color-brand)]">{deliveryAreas[form.city].map((neighborhood) => <option key={neighborhood}>{neighborhood}</option>)}</select>{errors.neighborhood && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.neighborhood}</span>}</label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">Adresse</span><textarea value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} rows={2} className="w-full resize-y rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="Rue, numéro, résidence, appartement…" />{errors.address && <span className="mt-1 block text-xs text-[var(--color-brand)]">{errors.address}</span>}</label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">Instructions complémentaires <span className="font-normal text-[var(--color-muted)]">(facultatif)</span></span><textarea value={form.instructions} onChange={(event) => setForm((current) => ({ ...current, instructions: event.target.value }))} rows={2} className="w-full resize-y rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="Étage, code d’accès, point de repère…" /></label>
          </div>
          {Object.keys(errors).length > 0 && <p role="alert" className="mt-3 text-xs text-[var(--color-brand)]">Vérifiez les champs indiqués avant d’enregistrer.</p>}
          <button type="submit" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)]">Enregistrer l’adresse</button>
        </form>}

        {notice && <p role="status" className="text-xs text-[var(--color-muted)]">{notice}</p>}
        {addresses.length ? <div className="grid gap-3">{addresses.map((address) => <AddressCard key={address.id} address={address} onEdit={openForm} onDelete={removeAddress} onSetDefault={setDefault} />)}</div> : <EmptyState type="addresses" message="Aucune adresse enregistrée." explanation="Ajoutez une adresse pour retrouver rapidement vos informations lors de votre prochaine commande." cta="Ajouter une adresse" onAction={() => openForm()} />}
      </div>
    </CustomerAccountLayout>
  );
}