export default function Sidebar() {
  return (
    <aside className="border-light-300 row-start-1 -row-end-1 flex flex-col gap-4 border-r">
      <div className="flex items-center gap-5 px-5 pt-5 pb-2.5">
        <img src="/Bookmark.png" alt="logo icon" className="h-8 w-8" />
        <p className="font-roboto text-light-900 text-[20px] leading-[100%] font-bold tracking-[-1%]">
          Bookmark Manager
        </p>
      </div>
    </aside>
  );
}
