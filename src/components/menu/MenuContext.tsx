'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type MenuState = { open: boolean; setOpen: (open: boolean) => void };

const MenuContext = createContext<MenuState>({ open: false, setOpen: () => undefined });

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const setOpen = useCallback((next: boolean) => setOpenState(next), []);
  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export const useMenu = () => useContext(MenuContext);
