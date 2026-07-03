import useUser from "@/hooks/useUser";
import Modal from "./Modal";
import CreateBookmarkForm from "@/components/CreateBookmarkForm";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, isPending } = useUser();

  const fullName = user?.user_metadata?.fullName;
  const userEmail = user?.email;

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name: string) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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

      <div className="flex items-center gap-2.5 rounded-lg border border-blue-700 lg:gap-4">
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
              <div className="hidden min-w-42.25 cursor-pointer items-center gap-1 rounded-lg bg-teal-700 px-4 py-3 lg:flex">
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
          className="bg-light-500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        >
          {isPending ? (
            <div className="bg-light-300 h-full w-full animate-pulse"></div>
          ) : (
            <span className="font-manrope text-light-900 text-sm font-bold">
              {initials}
            </span>
          )}
        </div>

        <div className="absolute top-full flex max-w-62 flex-col rounded-lg border border-red-700 bg-white">
          <div className="flex items-center gap-3 px-4 py-3">
            <p className="font-manrope text-light-900 text-sm font-bold">
              {initials}
            </p>
            <div className="flex flex-col">
              <p className="font-manrope text-light-900 text-sm leading-[140%] font-semibold">
                {fullName}
              </p>
              <p className="font-manrope text-light-800 text-sm leading-[150%] font-medium">
                {userEmail}
              </p>
            </div>
          </div>
          <div className="px-2 py-1">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-4">
                <img src="/palette.png" alt="palette" className="h-4 w-4" />
                <p>Theme</p>
              </div>
              <div className="bg-light-300 border-light-300 flex rounded-sm border px-0.5 py-0.5">
                <button className="rounded-sm bg-white px-2 py-1.5">
                  <img src="/sun.png" alt="moon" className="h-3.5 w-3.5" />
                </button>
                <button className="bg-inherit px-2 py-1.5">
                  <img src="/moon.png" alt="moon" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
