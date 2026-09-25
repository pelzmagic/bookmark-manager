import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBookmarks } from "@/hooks/useGetBookmarks";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Card from "@/components/Card";
import Spinner from "@/ui/Spinner";
import Empty from "@/components/Empty";
import Menus from "@/components/Menus";

const SORT_OPTIONS = [
  { value: "created_at-desc", label: "Recently added" },
  { value: "last_visited_at-desc", label: "Recently visited" },
  { value: "visit_count-desc", label: "Most visited" },
];

export default function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { bookmarks, isPending } = useGetBookmarks();
  const [searchParams, setSearchParams] = useSearchParams();

  const dropdownRef = useOutsideClick<HTMLDivElement>(
    () => setShowDropdown(false),
    false,
  );

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const currentSortBy = searchParams.get("sortBy") || "created_at-desc";

  function handleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  function handleSortChange(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
    setShowDropdown(false);
  }

  if (isPending)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <Empty message="No bookmarks created yet, Please create a bookmark." />
    );
  }

  const searchedBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery),
  );

  if (searchedBookmarks.length === 0) {
    return <Empty message={`No bookmarks found matching "${searchQuery}"`} />;
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-light-900 font-manrope text-[20px] leading-[120%] font-bold lg:text-2xl lg:leading-[140%]">
          All Bookmarks
        </h1>

        <div ref={dropdownRef} className="relative">
          <button
            className="border-light-400 flex cursor-pointer items-center gap-1 rounded-lg border bg-white px-3 py-2.5"
            onClick={handleDropdown}
          >
            <img
              src="/switch-vertical.png"
              alt="sort icon"
              className="h-5 w-5"
            />
            <p className="text-light-900 font-manrope text-[20px] leading-[120%] font-semibold">
              Sort by
            </p>
          </button>

          {showDropdown && (
            <div className="border-light-100 absolute top-full right-0 z-10 min-w-50 rounded-lg border bg-white p-2">
              {SORT_OPTIONS.map((option) => {
                const isSelected = currentSortBy === option.value;
                return (
                  <button
                    className="flex w-full cursor-pointer items-center justify-between p-2"
                    key={option.value}
                    type="button"
                    onClick={() => handleSortChange(option.value)}
                  >
                    <span className="text-light-800 font-manrope text-sm leading-[140%] font-semibold">
                      {option.label}
                    </span>
                    {isSelected && (
                      <img
                        src="/check-icon.png"
                        alt="check icon"
                        className="h-4 w-4"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="no-scrollbar grid flex-1 grid-cols-1 content-start gap-8 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        <Menus>
          {searchedBookmarks?.map((bookmark) => (
            <Card key={bookmark.id} bookmark={bookmark} />
          ))}
        </Menus>
      </div>
    </section>
  );
}
