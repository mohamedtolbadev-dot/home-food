import { adminDemoData } from "@/data/admin-demo";

export const ADMIN_STORAGE_KEY = "homefood_admin_demo";

export function readAdminSnapshot() {
  if (typeof window === "undefined") return adminDemoData;

  try {
    const stored = JSON.parse(window.localStorage.getItem(ADMIN_STORAGE_KEY) ?? "null");
    if (!stored || typeof stored !== "object") return adminDemoData;

    return Object.fromEntries(
      Object.keys(adminDemoData).map((key) => [
        key,
        Array.isArray(stored[key]) ? stored[key] : adminDemoData[key],
      ]),
    );
  } catch {
    return adminDemoData;
  }
}

export function writeAdminSnapshot(snapshot) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(snapshot));
    return true;
  } catch {
    return false;
  }
}
