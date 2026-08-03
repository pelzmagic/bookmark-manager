import { useContext, createContext } from "react";
import type { MenusContextType } from "@/types/MenusContextType";

export const MenusContext = createContext<MenusContextType | null>(null);

export function useMenus() {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("useMenus must be used within a Menus provider");

  return context;
}
