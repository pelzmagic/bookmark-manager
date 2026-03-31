import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="bg-light-100 px-8 pt-8 pb-16">
        <Outlet />
      </main>
    </div>
  );
}
