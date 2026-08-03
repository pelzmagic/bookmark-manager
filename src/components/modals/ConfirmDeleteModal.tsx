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
    <div className="flex min-w-112.5 flex-col gap-6 rounded-xl bg-white p-6">
      <h1 className="text-light-900 font-manrope text-2xl leading-[140%] font-bold">
        Delete Bookmark
      </h1>
      <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
        Are you sure you want to delete this bookmark?
      </p>
      <div className="flex items-center justify-end gap-4">
        <button
          className="border-light-400 text-light-900 font-manrope cursor-pointer rounded-lg border px-4 py-3 text-base leading-[140%] font-semibold"
          onClick={onCloseModal}
          disabled={isDeletingBookmark}
        >
          Cancel
        </button>
        <button
          className="font-manrope font-sembold flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-800 px-4 py-3 text-base leading-[140%] text-white"
          disabled={isDeletingBookmark}
          onClick={handleDelete}
        >
          {isDeletingBookmark ? (
            <>
              <Spinner /> <span>Deleting...</span>
            </>
          ) : (
            "Delete Permanently"
          )}
        </button>
      </div>
    </div>
  );
}
