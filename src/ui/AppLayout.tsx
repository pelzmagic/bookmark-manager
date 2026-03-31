import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div>
      <Sidebar />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
