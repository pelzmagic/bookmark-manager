import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[296px_1fr]">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Header onMenuClick={toggleSidebar} />
      <main className="bg-light-100 flex flex-col gap-5 px-8 pt-8 pb-16">
        <Outlet />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-1 bg-black/50 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}
      </main>
    </div>
  );
}
