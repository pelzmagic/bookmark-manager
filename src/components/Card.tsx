import type { BookmarkData } from "@/types/bookmarkData";
import Tags from "./Tags";

type CardProps = {
  bookmark: BookmarkData;
};

export default function Card({ bookmark }: CardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-white">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-10 w-10 rounded-lg">
              <img
                src="/url-logo.png"
                alt="url logo"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-manrope text-light-900 text-[20px] leading-[120%] font-bold">
                {bookmark.title}
              </h1>
              <p className="font-manrope text-light-800 text-[12px] leading-[140%] font-medium">
                {bookmark.url.slice(0, 21)}...
              </p>
            </div>
          </div>

          <div className="border-light-400 rounded-lg border bg-white p-1.5">
            <img src="/dots-vertical.png" alt="menu icon" className="h-5 w-5" />
          </div>
        </div>

        <hr className="border-light-300 border" />

        <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
          {bookmark.description}
        </p>

        <div className="flex items-center gap-2">
          {bookmark.tags
            .split(",")
            .slice(0, 3)
            .map((tag, index) => (
              <Tags tag={tag.trim()} key={index} />
            ))}
        </div>
      </div>

      <div className="border-light-300 flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <img src="/eye.png" alt="eye icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              47
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <img src="/clock.png" alt="clock icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              23 Sep
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <img src="/calendar.png" alt="calendar icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              15 Jan
            </p>
          </div>
        </div>

        <div>
          <img src="/pin.png" alt="pin icon" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
