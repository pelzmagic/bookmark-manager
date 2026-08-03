import { MenusProvider } from "./MenusProvider";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useMenus } from "@/hooks/useMenus";

function Menus({ children }: { children: React.ReactNode }) {
  return <MenusProvider>{children}</MenusProvider>;
}

function Menu({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

function Toggle({ id }: { id: number | string }) {
  const { openId, close, open } = useMenus();

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
      className="border-light-400 cursor-pointer rounded-lg border bg-white p-1.5 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
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
  const { openId, close } = useMenus();

  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="border-light-300 absolute top-10 right-0 z-5 flex min-w-50 flex-col gap-1 rounded-lg border bg-white p-2"
    >
      {children}
    </ul>
  );
}

function Button({
  children,
  onClick,
  closeOnSelect = true,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  closeOnSelect?: boolean;
  [key: string]: any;
}) {
  const { close } = useMenus();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onClick?.();

    if (closeOnSelect) {
      close?.();
    }
  }

  return (
    <li>
      <button
        {...props}
        onClick={handleClick}
        className="text-light-800 font-manrope flex w-full cursor-pointer items-center gap-2.5 rounded-md border border-transparent p-2 text-sm leading-[140%] font-semibold hover:border-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
      >
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
