"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { adminDemoData } from "@/data/admin-demo";
import { readAdminSnapshot, writeAdminSnapshot } from "@/utils/admin-storage";

const AdminDataContext = createContext(null);

export function AdminProvider({ children }) {
  const [data, setData] = useState(adminDemoData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setData(readAdminSnapshot());
      setIsReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (isReady) writeAdminSnapshot(data);
  }, [data, isReady]);

  const actions = useMemo(() => ({
    updateOrderStatus: (id, status) => setData((current) => ({ ...current, orders: current.orders.map((order) => order.id === id ? { ...order, status } : order) })),
    updateCookStatus: (id, status) => setData((current) => ({ ...current, cooks: current.cooks.map((cook) => cook.id === id ? { ...cook, status } : cook) })),
    updateMeal: (id, changes) => setData((current) => ({ ...current, meals: current.meals.map((meal) => meal.id === id ? { ...meal, ...changes } : meal) })),
    updateCustomerStatus: (id, status) => setData((current) => ({ ...current, customers: current.customers.map((customer) => customer.id === id ? { ...customer, status } : customer) })),
    updateReviewStatus: (id, status) => setData((current) => ({ ...current, reviews: current.reviews.map((review) => review.id === id ? { ...review, status } : review) })),
    resetDemo: () => setData(adminDemoData),
  }), []);

  const value = useMemo(() => ({ data, isReady, ...actions }), [data, isReady, actions]);
  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used within AdminProvider");
  return context;
}
