import { useGetArchivedBookmarks } from "@/hooks/useGetArchivedBookmarks";
import { useSearchParams } from "react-router-dom";
import Spinner from "@/ui/Spinner";
import Empty from "@/components/Empty";
import Menus from "@/components/Menus";
import Card from "@/components/Card";

export default function Archived() {
  const { bookmarks, isPending } = useGetArchivedBookmarks();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  if (isPending)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );

  if (!bookmarks || bookmarks.length === 0)
    return <Empty message="No archived bookmarks yet" />;

  const searchedBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery),
  );

  if (searchedBookmarks.length === 0)
    return <Empty message={`No bookmarks found matching "${searchQuery}" `} />;

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-light-900 font-manrope text-[20px] leading-[120%] font-bold lg:text-2xl lg:leading-[140%]">
          Archived bookmarks
        </h1>
        <button className="border-light-400 flex cursor-pointer items-center gap-1 rounded-lg border bg-white px-3 py-2.5">
          <img src="/switch-vertical.png" alt="sort icon" className="h-5 w-5" />
          <p className="text-light-900 font-manrope text-base leading-[140%] font-semibold lg:text-[20px] lg:leading-[120%]">
            Sort by
          </p>
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 content-start gap-8 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        <Menus>
          {searchedBookmarks.map((bookmark) => (
            <Card key={bookmark.id} bookmark={bookmark} />
          ))}
        </Menus>
      </div>
    </section>
  );
}
