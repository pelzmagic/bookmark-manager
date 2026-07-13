import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const MenusContext = createContext<{
  openId: number | string;
  close: () => void;
  open: (id: number | string) => void;
} | null>(null);

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<number | string>("");
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

function Toggle({ id }: { id: number | string }) {
  const context = useContext(MenusContext);

  if (!context)
    throw new Error(
      "Menus.Toggle must be used inside a Menus parent container",
    );

  const { openId, close, open } = context;

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <button
      className="border-light-400 rounded-lg border bg-white p-1.5"
      onClick={handleClick}
    >
      <img src="/dots-vertical.png" alt="menu icon" className="h-5 w-5" />
    </button>
  );
}

function List({
  id,
  children,
}: {
  id: number | string;
  children: React.ReactNode;
}) {
  const context = useContext(MenusContext);

  if (!context)
    throw new Error("Menus.List must be used inside a Menus parent container");

  const { openId, close } = context;

  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="border-light-300 absolute top-10 right-0 z-50 flex min-w-50 flex-col gap-1 rounded-lg border bg-white p-2"
    >
      {children}
    </ul>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <button className="text-light-800 font-manrope flex w-full items-center gap-2.5 rounded-md border-neutral-700 p-2 text-sm leading-[140%] font-semibold hover:border focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2">
        {children}
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
