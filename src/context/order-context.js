"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addMealToCart, changeCartQuantity, readCart, writeCart } from "@/utils/order-storage";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setItems(readCart());
      setIsReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (isReady) writeCart(items);
  }, [items, isReady]);

  const addItem = useCallback((meal, quantity, preferences) => {
    if (!isReady) return { ok: false, reason: "loading" };
    const result = addMealToCart(items, meal, quantity, preferences);
    if (!result.ok) return result;
    setItems(result.items);
    return { ok: true, quantity: result.quantity, persisted: writeCart(result.items) };
  }, [isReady, items]);

  const updateQuantity = useCallback((mealId, quantity) => {
    setItems((currentItems) => changeCartQuantity(currentItems, mealId, quantity));
  }, []);

  const clearOrder = useCallback(() => {
    setItems([]);
    writeCart([]);
  }, []);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const value = useMemo(() => ({ items, itemCount, isReady, addItem, updateQuantity, clearOrder }), [items, itemCount, isReady, addItem, updateQuantity, clearOrder]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
}
