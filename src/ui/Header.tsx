export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="border-light-300 flex max-w-[320px] items-center gap-1.5 rounded-md border p-3">
        <img src="/search.png" alt="search icon" className="h-5 w-5" />
        <input
          type="text"
          placeholder="Search by title"
          className="font-manrope text-light-800 text-sm leading-[140%] font-semibold outline-none"
        />
      </div>

      <div className="flex items-center gap-4 rounded-lg">
        <div className="flex max-w-42.25 cursor-pointer items-center gap-1 rounded-lg bg-teal-700 px-4 py-3">
          <img src="/add-icon.png" alt="addition icon" className="h-5 w-5" />
          <p className="font-manrope text-base leading-[140%] font-semibold text-white">
            Add Bookmark
          </p>
        </div>
        <div className="bg-light-500 h-10 w-10 rounded-full"></div>
      </div>
    </header>
  );
}
