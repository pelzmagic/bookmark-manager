import Card from "@/components/Card";
import Spinner from "@/ui/Spinner";
import { useGetBookmarks } from "@/hooks/useGetBookmarks";
import Empty from "@/components/Empty";

export default function Dashboard() {
  const { bookmarks, isPending } = useGetBookmarks();

  if (isPending)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );

  if (!bookmarks || bookmarks.length == 0) {
    return (
      <Empty message="No bookmarks created yet, Please create a bookmark." />
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-light-900 font-manrope text-[20px] leading-[120%] font-bold lg:text-2xl lg:leading-[140%]">
          All Bookmarks
        </h1>
        <button className="border-light-400 flex cursor-pointer items-center gap-1 rounded-lg border bg-white px-3 py-2.5">
          <img src="/switch-vertical.png" alt="sort icon" className="h-5 w-5" />
          <p className="text-light-900 font-manrope text-[20px] leading-[120%] font-semibold">
            Sort by
          </p>
        </button>
      </div>

      {isPending ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid-cols- grid flex-1 content-start gap-8 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
          {bookmarks?.map((bookmark) => (
            <Card key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </section>
  );
}
