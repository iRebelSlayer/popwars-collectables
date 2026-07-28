import { Product, products } from './products';

const CUSTOM_PRODUCTS_KEY = 'popwars-custom-products';

export function getCustomProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCustomProducts(customProducts: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
}

export function getAllProducts(): Product[] {
  return [...products, ...getCustomProducts()];
}
