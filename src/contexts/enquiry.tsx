'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface EnquiryItem {
  id: string;
  name: string;
}

interface EnquiryCtx {
  items: EnquiryItem[];
  addItem: (item: EnquiryItem) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  count: number;
  isInCart: (id: string) => boolean;
}

const EnquiryContext = createContext<EnquiryCtx>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearAll: () => {},
  count: 0,
  isInCart: () => false,
});

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);

  const addItem = useCallback((item: EnquiryItem) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const isInCart = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  return (
    <EnquiryContext.Provider value={{ items, addItem, removeItem, clearAll, count: items.length, isInCart }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export const useEnquiry = () => useContext(EnquiryContext);
