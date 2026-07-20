import { useForm } from "react-hook-form";
import type { BookmarkData } from "@/types/bookmarkData";

export default function EditBookmarkForm({
  onCloseModal,
}: {
  onCloseModal?: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookmarkData>({
    defaultValues: { title: "", description: "", url: "", tags: "" },
  });

  const descriptionValue = watch("description", "");

  const onSubmit = (data: BookmarkData) => {
    console.log("Valid data form submitted:", data);

    onCloseModal?.();
  };

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

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("title", { required: "Title is required" })}
            className={`border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 ${errors.title ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : ""}`}
          />
          {errors.title && (
            <p className="text-xs font-medium text-red-500">
              {errors.title.message}
            </p>
          )}
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
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 280,
                message: "Description cannot exceed 280 characters",
              },
            })}
            rows={4}
            className={`border-light-500 font-manrope text-light-800 resize-none rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 ${errors.description ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : ""}`}
          ></textarea>
          <div className="flex items-center justify-between">
            {errors.description ? (
              <p className="font-manrope text-xs font-medium text-red-500">
                {errors.description.message}
              </p>
            ) : (
              <span></span>
            )}
            <p className="font-manrope text-light-800 text-xs leading-[140%] font-medium">
              {descriptionValue.length}/280
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="url"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Website Url <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="text"
            id="url"
            {...register("url", {
              required: "url is required",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Please enter a valid website url",
              },
            })}
            className={`border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none ${errors.url ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : ""}`}
          />
          {errors.url && (
            <p className="font-manrope text-xs font-medium text-red-500">
              {errors.url.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="tags"
            className="text-light-900 font-manrope text-sm leading-[140%] font-semibold"
          >
            Tags <span className="text-sm text-teal-700">*</span>
          </label>
          <input
            type="text"
            id="tags"
            placeholder="e.g. Design, Learning, Tools"
            {...register("tags", { required: "Atlease one tag is required" })}
            className={`border-light-500 font-manrope text-light-800 rounded-lg border p-3 text-sm leading-[150%] font-medium outline-none ${errors.tags ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : ""}`}
          />
          {errors.tags && (
            <p className="font-manrope text-xs font-medium text-red-500">
              {errors.tags.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="border-light-400 text-light-900 cursor-pointer rounded-lg border px-4 py-3"
            onClick={onCloseModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="font-manrope cursor-pointer rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white"
          >
            Save Bookmark
          </button>
        </div>
      </form>
    </div>
  );
}
