import { useRef } from "react";
import { useEffect } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      const clickedOutsideMenu = ref.current && !ref.current.contains(target);

      const button = target
        .closest("button")
        ?.querySelector('img[alt="menu icon"]');

      if (clickedOutsideMenu && !button) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
