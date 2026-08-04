import { Checkbox } from "@/components/ui/checkbox";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";
import { useGetBookmarks } from "@/hooks/useGetBookmarks";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { bookmarks, isPending } = useGetBookmarks();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex cursor-pointer items-center gap-3 px-3 py-2 transition-all duration-200 ${isActive ? "bg-light-100 rounded-md" : "hover:bg-light-100 rounded-md"}`;

  const tagCountsMap = (bookmarks || []).reduce<Record<string, number>>(
    (acc, bookmark) => {
      if (!bookmark.tags) return acc;

      const rawTags = bookmark.tags.split(",");
      rawTags.forEach((rawTag: string) => {
        const cleanTag = rawTag.trim();

        if (cleanTag) {
          const existingKey = Object.keys(acc).find(
            (k) => k.toLowerCase() === cleanTag.toLowerCase(),
          );
          const keyToUse = existingKey || cleanTag;
          acc[keyToUse] = (acc[keyToUse] || 0) + 1;
        }
      });

      return acc;
    },
    {},
  );

  const uniqueTags = Object.entries(tagCountsMap);

  return (
    <aside
      className={`border-light-300 fixed inset-y-0 left-0 z-2 row-start-1 -row-end-1 flex h-full w-74 flex-col gap-4 overflow-y-auto border-r transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-white lg:static lg:flex lg:translate-x-0`}
    >
      <div className="flex items-center gap-2 px-5 pt-5 pb-2.5 lg:gap-5">
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
        {isPending ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : uniqueTags.length === 0 ? (
          <p className="font-manrope text-light-800 px-3 py-2 text-xs">
            No tags found
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {uniqueTags.map(([tagName, count]) => (
              <li
                key={tagName}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <NavLink
                  to={`/tag/${encodeURIComponent(tagName)}`}
                  className={navLinkClasses}
                >
                  {({ isActive }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={isActive} />
                        <p
                          className={`font-manrope text-sm leading-[140%] font-semibold ${isActive ? "text-light-900" : "text-light-800"}`}
                        >
                          {tagName}
                        </p>
                      </div>
                      <div className="bg-light-300 font-manrope text-light-800 leading-[140%]font-medium rounded-full px-2 py-0.5 text-xs">
                        {count}
                      </div>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
