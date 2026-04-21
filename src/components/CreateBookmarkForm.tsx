import { useState } from "react";
import { useCreateBookmark } from "@/hooks/useBookmarks";
import { toast } from "sonner";

export default function CreateBookmarkForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");

  const { isCreating, createBookmark } = useCreateBookmark();

  const maxLength = 280;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !url || !description)
      toast.error("Please fill all required fields");

    createBookmark({ title, description, url, tag });

    setTitle("");
    setDescription("");
    setUrl("");
    setTag("");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-manrope text-light-900 text-2xl leading-[140%] font-bold">
          Add a bookmark
        </h1>
        <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
          Save a link with details to keep your collections organized. We
          extract the favicon automatically from the URL
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
            value={title}
            disabled={isCreating}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            maxLength={maxLength}
            disabled={isCreating}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="border-light-500 font-manrope text-light-800 resize-none rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          ></textarea>
          <p
            className={`font-manrope self-end text-xs leading-[140%] font-medium ${description.length >= maxLength ? "text-red-500" : "text-light-500"}`}
          >
            {description.length}/{maxLength}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="url"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Website Url <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="url"
            id="url"
            value={url}
            disabled={isCreating}
            onChange={(e) => setUrl(e.target.value)}
            className="border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="tag"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Tags <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="tag"
            id="tag"
            value={tag}
            disabled={isCreating}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. Design, Learning, Tools"
            className="border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            className="border-light-400 text-light-900 cursor-pointer rounded-lg border px-4 py-3"
            type="button"
          >
            Cancel
          </button>
          <button
            className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white"
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Add Bookmark"}
          </button>
        </div>
      </form>
    </div>
  );
}
