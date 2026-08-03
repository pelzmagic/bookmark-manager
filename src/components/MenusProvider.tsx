import { useState } from "react";
import { MenusContext } from "@/hooks/useMenus";

export function MenusProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<number | string>("");
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}
