"use client";

import { useSyncExternalStore } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
}

const CART_KEY = "popwars-cart";
const CART_EVENT = "popwars-cart-changed";
const EMPTY_CART: CartItem[] = [];

function parseCart(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

// useSyncExternalStore requires getSnapshot to return the same reference until
// something actually changes, or it re-renders forever — so the parsed cart is
// cached here and only replaced on an actual write or cross-tab storage event.
let cache: CartItem[] = typeof window !== "undefined" ? parseCart() : EMPTY_CART;

function writeCart(items: CartItem[]) {
  cache = items;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getCart(): CartItem[] {
  return cache;
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

export function addToCart(item: Omit<CartItem, "qty">, qty = 1) {
  const items = [...cache];
  const existing = items.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ ...item, qty });
  }
  writeCart(items);
}

export function removeFromCart(id: string) {
  writeCart(cache.filter((i) => i.id !== id));
}

export function updateCartQty(id: string, qty: number) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  writeCart(cache.map((i) => (i.id === id ? { ...i, qty } : i)));
}

export function clearCart() {
  writeCart([]);
}

function subscribe(callback: () => void) {
  function handleStorage() {
    cache = parseCart();
    callback();
  }
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, getCart, () => EMPTY_CART);
}
