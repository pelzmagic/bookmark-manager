import { useState } from "react";
import useUser from "@/hooks/useUser";
import Modal from "./Modal";
import CreateBookmarkForm from "@/components/CreateBookmarkForm";
import { useLogout } from "@/hooks/useLogout";
import Spinner from "./Spinner";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, isPending } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const { logOut, isLoggingOut } = useLogout();

  const fullName = user?.user_metadata?.fullName || "";
  const userEmail = user?.email || "";

  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="border-light-300 relative flex items-center justify-between border border-b px-4 py-3 md:px-8 md:py-4 lg:px-8 lg:py-4">
      <div className="flex items-center gap-1 md:gap-4">
        <button
          className="border-light-400 rounded-lg border px-2.5 py-2.5 lg:hidden"
          onClick={onMenuClick}
        >
          <img src="/menu.png" alt="hamburger menu" className="h-5 w-5" />
        </button>
        <div className="border-light-300 flex max-w-48.25 items-center gap-1.5 rounded-md border p-3 lg:min-w-[320px]">
          <img src="/search.png" alt="search icon" className="h-5 w-5" />
          <input
            type="text"
            placeholder="Search by title"
            className="font-manrope text-light-800 text-sm leading-[140%] font-semibold outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-lg lg:gap-4">
        <Modal>
          <Modal.Open opens="bookmark-form">
            <div>
              <div className="cursor-pointer rounded-lg bg-teal-700 px-2.5 py-2.5 lg:hidden">
                <img
                  src="/add-icon.png"
                  alt="addition icon"
                  className="h-5 w-5"
                />
              </div>
              <div
                className="hidden min-w-42.25 cursor-pointer items-center gap-1 rounded-lg bg-teal-700 px-4 py-3 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 lg:flex"
                role="button"
                tabIndex={0}
              >
                <img
                  src="/add-icon.png"
                  alt="addition icon"
                  className="h-5 w-5"
                />
                <p className="font-manrope text-base leading-[140%] font-semibold text-white">
                  Add Bookmark
                </p>
              </div>
            </div>
          </Modal.Open>

          <Modal.Window name="bookmark-form">
            <CreateBookmarkForm />
          </Modal.Window>
        </Modal>
        <div
          role="button"
          tabIndex={0}
          className="bg-light-500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
          onClick={toggleDropdown}
        >
          {isPending ? (
            <div className="bg-light-300 h-full w-full animate-pulse"></div>
          ) : (
            <span className="font-manrope text-light-900 text-sm font-bold">
              {initials}
            </span>
          )}
        </div>

        {showDropdown && (
          <div className="absolute top-full right-4 flex max-w-62 flex-col rounded-lg bg-white md:right-8">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3">
              <p className="font-manrope text-light-900 border-light-900 rounded-full border p-2 text-sm font-bold">
                {initials}
              </p>
              <div className="flex min-w-0 flex-col">
                <p className="font-manrope text-light-900 truncate text-sm leading-[140%] font-semibold">
                  {fullName}
                </p>
                <p className="font-manrope text-light-800 truncate text-sm leading-[150%] font-medium">
                  {userEmail}
                </p>
              </div>
            </div>
            <div className="border-light-100 border-t px-2 py-1">
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-4">
                  <img src="/palette.png" alt="palette" className="h-4 w-4" />
                  <p className="font-manrope text-light-800 text-sm leading-[140%] font-semibold">
                    Theme
                  </p>
                </div>
                <div className="bg-light-300 border-light-300 flex rounded-sm border px-0.5 py-0.5">
                  <button className="cursor-pointer rounded-sm bg-white px-2 py-1.5">
                    <img src="/sun.png" alt="moon" className="h-3.5 w-3.5" />
                  </button>
                  <button className="cursor-pointer bg-inherit px-2 py-1.5">
                    <img src="/moon.png" alt="moon" className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <button
              className="border-light-100 flex cursor-pointer items-center gap-4 border border-t px-4 py-3"
              onClick={() => logOut()}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Spinner />
              ) : (
                <img
                  src="/log-out-01.png"
                  alt="log out icon"
                  className="h-4 w-4"
                />
              )}
              <p className="font-manrope text-light-800 text-sm leading-[140%] font-semibold">
                {isLoggingOut ? "Logging out" : "Logout"}
              </p>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
