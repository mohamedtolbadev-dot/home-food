"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { readFavorites, writeFavorites } from "@/utils/customer-storage";

export default function FavoriteButton({ type, id, className = "" }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setFavorite(readFavorites().some((entry) => entry.type === type && entry.id === id));
    });
    return () => { cancelled = true; };
  }, [id, type]);

  function toggleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();
    const favorites = readFavorites();
    const exists = favorites.some((entry) => entry.type === type && entry.id === id);
    const next = exists ? favorites.filter((entry) => !(entry.type === type && entry.id === id)) : [...favorites, { type, id }];
    writeFavorites(next);
    setFavorite(!exists);
    window.dispatchEvent(new Event("homefood:favorites-updated"));
  }

  return (
    <button type="button" onClick={toggleFavorite} aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} aria-pressed={favorite} className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-brand)] shadow-[0_1px_2px_rgba(32,32,36,0.08)] hover:border-[var(--color-brand)] ${className}`}>
      <Heart size={16} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}