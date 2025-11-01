// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("beetle_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const add = (product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const remove = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  const setQty = (id, qty) =>
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it))
        .filter((it) => it.qty > 0)
    );

  const clear = () => setCart([]);

  useEffect(() => {
    localStorage.setItem("beetle_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
};
