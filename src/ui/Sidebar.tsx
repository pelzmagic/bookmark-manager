import { Checkbox } from "@/components/ui/checkbox";

export default function Sidebar() {
  return (
    <aside className="border-light-300 row-start-1 -row-end-1 flex flex-col gap-4 border-r">
      <div className="flex items-center gap-5 px-5 pt-5 pb-2.5">
        <img src="/Bookmark.png" alt="logo icon" className="h-8 w-8" />
        <p className="font-roboto text-light-900 text-[20px] leading-[100%] font-bold tracking-[-1%]">
          Bookmark Manager
        </p>
      </div>

      <nav className="px-4 pb-5">
        <ul>
          <li>
            <div className="flex cursor-pointer items-center gap-3 px-3 py-2">
              <img src="/Icon.png" alt="home icon" className="h-5 w-5" />
              <p className="font-manrope text-light-900 text-base leading-[140%] font-semibold">
                Home
              </p>
            </div>
          </li>
          <li>
            <div className="flex cursor-pointer items-center gap-3 px-3 py-2">
              <img src="/archive.png" alt="archive icon" className="h-5 w-5" />
              <p className="font-manrope text-light-900 text-base leading-[140%] font-semibold">
                Archived
              </p>
            </div>
          </li>
        </ul>
      </nav>

      <div className="mt-4 border border-red-500 px-4">
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
