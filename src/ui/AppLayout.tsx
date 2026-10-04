import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-dvh flex-col lg:grid lg:h-screen lg:grid-cols-[296px_1fr] lg:grid-rows-[auto_1fr]">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Header onMenuClick={toggleSidebar} />
      <main className="bg-surface-muted min-h-0 flex-1 overflow-y-auto px-4 pt-6 pb-4 lg:px-8 lg:pt-8">
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
