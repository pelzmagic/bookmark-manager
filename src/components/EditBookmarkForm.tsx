export default function EditBookmarkForm() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-manrope text-light-900 text-2xl leading-[140%] font-bold">
          Edit bookmark
        </h1>
        <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
          Update your saved link details - change the title, description, URL,
          or tags anytime.
        </p>
      </div>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Title <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Description <span className="text-sm text-teal-700">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className="border-light-500 font-manrope text-light-800 resize-none rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          ></textarea>
          <p className="font-manrope text-light-800 self-end text-xs leading-[140%] font-medium">
            0/280
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Website Url <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Tags <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Design, Learning, Tools"
            className="border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button className="border-light-400 text-light-900 cursor-pointer rounded-lg border px-4 py-3">
            Cancel
          </button>
          <button className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white">
            Save Bookmark
          </button>
        </div>
      </form>
    </div>
  );
}
