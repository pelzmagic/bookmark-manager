import { createContext } from "react";
import type { ReactElement } from "react";
import type { MouseEventHandler } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { cloneElement } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

type ModalContextType = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal compound components must be rendered inside <Modal>",
    );
  }
  return context;
}

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: openWindowName,
}: {
  children: ReactElement<{ onClick?: MouseEventHandler }>;
  opens: string;
}) {
  const { open } = useModal();

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      open(openWindowName);
    },
  });
}

type WindowProps = {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModal();
  const { isDarkMode } = useDarkMode();
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#131313]/70 backdrop-blur-sm transition-all">
      <div className="relative max-h-screen max-w-87.5 overflow-y-auto rounded-2xl bg-white p-8 md:max-w-120 lg:max-w-142.5">
        <button
          onClick={close}
          className="border-line-strong absolute top-5 right-5 cursor-pointer rounded-lg border bg-white p-1.5"
        >
          <img
            src={isDarkMode ? "/dark-close.png" : "/x-close.png"}
            alt="close icon"
            className="h-5 w-5"
          />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
