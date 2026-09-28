import { useContext } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("Darkmode context was used outside of DarkMode Provider");

  return context;
}
