import { createContext } from "react";

const ModalContext = createContext();
export default function Modal({ children }: { children: React.ReactNode }) {
  return <h1>How are you?</h1>;
}
