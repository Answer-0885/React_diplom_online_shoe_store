import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [cart, setCart] = useState(() => {
    return getStorageItems(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cart));
  }, [key, cart]);

  return [cart, setCart];
};

export const getStorageItems = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;

  return initial;
};
