import useUser from "@/hooks/useUser";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, isPending } = useUser();

  const fullName = user?.user_metadata?.fullName;

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name: string) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  console.log(initials);
  return (
    <header className="border-light-300 flex items-center justify-between border-b px-4 py-3 md:px-8 md:py-4 lg:px-8 lg:py-4">
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
        <div className="rounded-lg bg-teal-700 px-2.5 py-2.5 lg:hidden">
          <img src="/add-icon.png" alt="addition icon" className="h-5 w-5" />
        </div>
        <div className="hidden min-w-42.25 cursor-pointer items-center gap-1 rounded-lg bg-teal-700 px-4 py-3 lg:flex">
          <img src="/add-icon.png" alt="addition icon" className="h-5 w-5" />
          <p className="font-manrope text-base leading-[140%] font-semibold text-white">
            Add Bookmark
          </p>
        </div>
        <div className="bg-light-500 flex h-10 w-10 items-center justify-center rounded-full">
          {isPending ? (
            <div className="bg-light-300 h-full w-full animate-pulse"></div>
          ) : (
            <span className="font-manrope text-light-900 text-sm font-bold">
              {initials}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
