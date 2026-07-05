// src/utils/storage.js
// Utility for persisting product and category data in localStorage.
// Falls back to the static product list if no stored data exists.

import { products as staticProducts, categories as staticCategories } from "../data/products";

const PRODUCTS_KEY = "kanishe_products";
const CATEGORIES_KEY = "kanishe_categories";

export const getProducts = () => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (_) {
      return staticProducts;
    }
  }
  return staticProducts;
};

export const saveProducts = (list) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
};

export const getCategories = () => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (_) {
      return staticCategories;
    }
  }
  return staticCategories;
};

export const saveCategories = (list) => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
};
