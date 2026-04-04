import { Checkbox } from "@/components/ui/checkbox";
import { NavLink } from "react-router-dom";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex cursor-pointer items-center gap-3 px-3 py-2 transition-all duration-200 ${isActive ? "bg-light-100 rounded-md" : "hover:bg-light-100 rounded-md"}`;

  return (
    <aside
      className={`border-light-300 fixed inset-y-0 left-0 z-2 row-start-1 -row-end-1 flex h-full w-74 flex-col gap-4 overflow-y-auto border-r transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-white lg:static lg:flex lg:translate-x-0`}
    >
      <div className="flex items-center gap-5 px-5 pt-5 pb-2.5">
        <img src="/Bookmark.png" alt="logo icon" className="h-8 w-8" />
        <p className="font-roboto text-light-900 text-[20px] leading-[100%] font-bold tracking-[-1%]">
          Bookmark Manager
        </p>
      </div>

      <button
        className="absolute top-1.5 right-0 px-2.5 py-2.5 lg:hidden"
        onClick={onClose}
      >
        <img src="/x-close.png" alt="close icon" className="h-5 w-5" />
      </button>

      <nav className="px-4 pb-5">
        <ul>
          <li onClick={() => window.innerWidth < 1024 && onClose()}>
            <NavLink to="/dashboard" className={navLinkClasses}>
              {({ isActive }) => (
                <>
                  <img
                    src="/Icon.png"
                    alt="home icon"
                    className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-50"}`}
                  />
                  <p
                    className={`font-manrope text-base leading-[140%] font-semibold ${isActive ? "text-light-900" : "text-light-800"}`}
                  >
                    Home
                  </p>
                </>
              )}
            </NavLink>
          </li>
          <li onClick={() => window.innerWidth < 1024 && onClose()}>
            <NavLink to="/archived" className={navLinkClasses}>
              {({ isActive }) => (
                <>
                  <img
                    src="/archive.png"
                    alt="archive icon"
                    className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-50"}`}
                  />
                  <p
                    className={`font-manrope text-light-900 text-base leading-[140%] font-semibold ${isActive ? "text-light-900" : "text-light-800"}`}
                  >
                    Archived
                  </p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-4 px-4">
        <p className="font-manrope px-3 pb-1 text-xs leading-[140%] font-bold text-[#4D4D4D]">
          TAGS
        </p>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <Checkbox />
            <p>AI</p>
          </div>
          <div className="bg-light-300 font-manrope text-light-800 rounded-full px-2 py-0.5 text-xs leading-[140%] font-medium">
            1
          </div>
        </div>
      </div>
    </aside>
  );
}
