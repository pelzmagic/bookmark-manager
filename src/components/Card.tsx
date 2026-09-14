import { useState } from "react";
import { useMenus } from "@/hooks/useMenus";
import { useTogglePin } from "@/hooks/useTogglePin";
import type { UpdateBookmarkData } from "@/types/bookmarkData";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import Tags from "./Tags";
import Menus from "./Menus";
import Modal from "@/ui/Modal";
import EditBookmarkForm from "./EditBookmarkForm";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import ConfirmArchiveModal from "./modals/ConfirmArchiveModal";
import { Trash2 } from "lucide-react";
import { useIncrementVisit } from "@/hooks/useIncrementVisit";

type CardProps = {
  bookmark: UpdateBookmarkData;
};

export default function Card({ bookmark }: CardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { togglePin, isPinning } = useTogglePin();
  const { incrementVisit } = useIncrementVisit();
  const { close } = useMenus();
  let faviconUrl = "/url-logo.png";

  const isArchived = bookmark.is_archived ?? false;
  const isPinned = bookmark.is_pinned ?? false;

  const visitCount = bookmark.visit_count ?? 0;

  const createdAtDate = bookmark.created_at
    ? new Date(bookmark.created_at)
    : null;

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      })
    : "N/A";

  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "N/A";

  const handleTogglePin = () => {
    togglePin({ id: bookmark.id, isPinned: !isPinned });
    close();
  };

  const handleVisit = () => {
    incrementVisit(bookmark.id);

    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
        close();
      }, 500);
    } catch {
      toast.error("Failed to copy URL to clipboard");
    }
  };

  try {
    const domain = new URL(bookmark.url).hostname;
    faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    faviconUrl = "/url-logo.png";
  }

  return (
    <div className="flex min-h-68 min-w-0 flex-col justify-between rounded-xl bg-white">
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="border-light-300 flex items-start justify-between border-b pb-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg">
              <img
                src={faviconUrl}
                alt={`${bookmark.title} favicon`}
                className="h-full w-full object-contain"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/url-logo.png")
                }
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="font-manrope text-light-900 truncate text-[20px] leading-[120%] font-bold">
                {bookmark.title}
              </h1>
              <p className="font-manrope text-light-800 truncate text-[12px] leading-[140%] font-medium">
                {bookmark.url}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={bookmark.id} />

                <Menus.List id={bookmark.id}>
                  <Menus.Button onClick={handleVisit}>
                    <img
                      src="/external-link.png"
                      alt="external link"
                      className="h-4 w-4"
                    />
                    <span>Visit</span>
                  </Menus.Button>
                  <Menus.Button onClick={handleCopyUrl} closeOnSelect={false}>
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span
                      className={isCopied ? "font-bold text-green-600" : ""}
                    >
                      {isCopied ? "Copied" : "Copy Url"}
                    </span>
                  </Menus.Button>
                  <Menus.Button onClick={handleTogglePin} disabled={isPinning}>
                    <img
                      src="/pin-icon.png"
                      alt="pin icon"
                      className="h-4 w-4"
                    />
                    <span>{isPinned ? "Unpin" : "Pin"}</span>
                  </Menus.Button>
                  <Modal.Open opens="edit-bookmark-form">
                    <Menus.Button>
                      <img
                        src="/edit.png"
                        alt="edit icon"
                        className="h-4 w-4"
                      />
                      <span>Edit</span>
                    </Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="archive-modal">
                    <Menus.Button>
                      <img
                        src="/archive.png"
                        alt="archive icon"
                        className="h-4 w-4"
                      />
                      <span>{isArchived ? "UnArchive" : "Archive"}</span>
                    </Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="delete-modal">
                    <Menus.Button>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>

              <Modal.Window name="edit-bookmark-form">
                <EditBookmarkForm
                  bookmarkToEdit={bookmark}
                  onCloseModal={() => {}}
                />
              </Modal.Window>

              <Modal.Window name="delete-modal">
                <ConfirmDeleteModal
                  onCloseModal={() => {}}
                  bookmark={bookmark}
                />
              </Modal.Window>

              <Modal.Window name="archive-modal">
                <ConfirmArchiveModal
                  onCloseModal={() => {}}
                  bookmark={bookmark}
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between pt-3">
          <p className="text-light-800 font-manrope line-clamp-3 text-sm leading-[150%] font-medium wrap-break-word">
            {bookmark.description}
          </p>

          <div className="flex items-center gap-2">
            {bookmark.tags
              .split(",")
              .slice(0, 3)
              .map((tag, index) => (
                <Tags tag={tag.trim()} key={index} />
              ))}
          </div>
        </div>
      </div>

      <div className="border-light-300 flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex shrink-0 items-center gap-1.5">
            <img src="/eye.png" alt="eye icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              {visitCount}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <img src="/clock.png" alt="clock icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              {formattedTime}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <img src="/calendar.png" alt="calendar icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              {formattedDate}
            </p>
          </div>
        </div>

        <button
          onClick={handleTogglePin}
          disabled={isPinning}
          className="disabled:opacity-50"
          aria-label={isPinned ? "Unpin bookmark" : "Pin bookmark"}
        >
          <img
            src="/pin.png"
            alt="pin icon"
            className={`h-4 w-4 cursor-pointer transition-opacity ${isPinned ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
          />
        </button>
      </div>
    </div>
  );
}
