import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[296px_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Header />
      <main className="bg-light-100 flex flex-col gap-5 px-8 pt-8 pb-16">
        <Outlet />
      </main>
    </div>
  );
}
