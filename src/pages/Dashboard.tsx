export default function Dashboard() {
  return (
    <section className="flex items-center justify-between">
      <h1 className="text-light-900 font-manrope text-[20px] leading-[120%] font-bold lg:text-2xl lg:leading-[140%]">
        All Bookmarks
      </h1>
      <button className="border-light-400 flex cursor-pointer items-center gap-1 rounded-lg border bg-white px-3 py-2.5">
        <img src="/switch-vertical.png" alt="sort icon" className="h-5 w-5" />
        <p className="text-light-900 font-manrope text-[20px] leading-[120%] font-semibold">
          Sort by
        </p>
      </button>
    </section>
  );
}
