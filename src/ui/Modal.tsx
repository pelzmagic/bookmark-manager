import { createContext } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { cloneElement } from "react";

const ModalContext = createContext();

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#131313]/70 backdrop-blur-sm transition-all">
      <div className="relative max-w-142.5 rounded-2xl bg-white p-8">
        <button className="bg-light-400 absolute top-5 right-5 rounded-lg p-1.5">
          <img src="/x-close.png" alt="close icon" className="h-5 w-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
