import { useDeleteBookmark } from "@/hooks/useDeleteBookmarks";
import type { UpdateBookmarkData } from "@/types/bookmarkData";
import Spinner from "@/ui/Spinner";

type ConfirmDeleteModalProps = {
  bookmark: UpdateBookmarkData;
  onCloseModal: () => void;
};

export default function ConfirmDeleteModal({
  onCloseModal,
  bookmark,
}: ConfirmDeleteModalProps) {
  const { deleteBookmark, isDeletingBookmark } = useDeleteBookmark();

  function handleDelete() {
    deleteBookmark(bookmark.id, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-4 lg:min-w-112.5 lg:p-6">
      <h1 className="text-light-900 font-manrope text-2xl leading-[140%] font-bold">
        Delete Bookmark
      </h1>
      <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
        Are you sure you want to delete this bookmark?
      </p>
      <div className="flex items-center justify-end gap-4">
        <button
          className="border-light-400 text-light-900 font-manrope cursor-pointer rounded-lg border px-3 py-2 text-sm leading-[140%] font-semibold lg:px-4 lg:py-3 lg:text-base"
          onClick={onCloseModal}
          disabled={isDeletingBookmark}
        >
          Cancel
        </button>
        <button
          className="font-manrope font-sembold flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-800 px-3 py-2 text-sm leading-[140%] whitespace-nowrap text-white lg:px-4 lg:py-3 lg:text-base"
          disabled={isDeletingBookmark}
          onClick={handleDelete}
        >
          {isDeletingBookmark ? (
            <>
              <Spinner /> <span>Deleting...</span>
            </>
          ) : (
            "Delete permanently"
          )}
        </button>
      </div>
    </div>
  );
}
