// src/utils/storage.js
// Utility for persisting product data in localStorage.
// Falls back to the static product list if no stored data exists.

import { products as staticProducts } from "../data/products";

const STORAGE_KEY = "kanishe_products";

export const getProducts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (_) {
      // If parsing fails, fall back to static data
      return staticProducts;
    }
  }
  return staticProducts;
};

export const saveProducts = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
