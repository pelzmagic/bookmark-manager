import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/Card";
import Spinner from "@/ui/Spinner";
import { useGetBookmarks } from "@/hooks/useGetBookmarks";
import Empty from "@/components/Empty";
import Menus from "@/components/Menus";

export default function TagPage() {
  const { tagName } = useParams<{ tagName: string }>();
  const { bookmarks, isPending } = useGetBookmarks();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const filteredBookmarks =
    bookmarks?.filter((bookmark) => {
      if (!bookmark.tags) return;
      const tagList = bookmark.tags
        .split(",")
        .map((tag: string) => tag.trim().toLowerCase());
      return tagList.includes(decodeURIComponent(tagName || "").toLowerCase());
    }) || [];

  if (!filteredBookmarks || filteredBookmarks.length === 0)
    return <Empty message={`No bookmarks found tagged with "${tagName}"`} />;

  const searchedBookmarks = filteredBookmarks.filter((filteredBookmark) =>
    filteredBookmark.title.toLowerCase().includes(searchQuery),
  );

  if (searchedBookmarks.length === 0)
    return <Empty message={`No bookmarks found matching "${searchQuery}" `} />;

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-light-900 font-manrope text-[20px] leading-[120%] font-bold capitalize lg:text-2xl lg:leading-[140%]">
          Tag: {tagName}
        </h1>
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
