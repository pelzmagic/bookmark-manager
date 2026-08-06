import { useArchiveBookmark } from "@/hooks/useArchiveBookmark";
import Spinner from "@/ui/Spinner";
import type { UpdateBookmarkData } from "@/types/bookmarkData";

type ArchiveModalDataProps = {
  bookmark: UpdateBookmarkData;
  onCloseModal: () => void;
};

export default function ConfirmArchiveModal({
  onCloseModal,
  bookmark,
}: ArchiveModalDataProps) {
  const { archiveBookmark, isArchivingBookmark } = useArchiveBookmark();
  const isCurrentlyArchived = bookmark.is_archived ?? false;

  function handleArchiveBookmark() {
    archiveBookmark(
      { id: bookmark.id, isArchived: !isCurrentlyArchived },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-4 lg:min-w-112.5 lg:p-6">
      <h1 className="text-light-900 font-manrope text-2xl leading-[140%] font-bold">
        Archive bookmark
      </h1>
      <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
        Are you sure you want to archive this bookmark?
      </p>
      <div className="flex items-center justify-end gap-4">
        <button
          className="border-light-400 text-light-900 font-manrope rounded-lg border px-4 py-3 text-base leading-[140%] font-semibold"
          onClick={onCloseModal}
          disabled={isArchivingBookmark}
        >
          Cancel
        </button>
        <button
          className="font-manrope flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white"
          disabled={isArchivingBookmark}
          onClick={handleArchiveBookmark}
        >
          {isArchivingBookmark ? (
            <>
              <Spinner />{" "}
              <span>{isCurrentlyArchived ? "Unarchiving" : "Archiving"}</span>
            </>
          ) : isCurrentlyArchived ? (
            "Unarchive"
          ) : (
            "Archive"
          )}
        </button>
      </div>
    </div>
  );
}
