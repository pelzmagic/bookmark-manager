import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import type { UpdateBookmarkData } from "@/types/bookmarkData";
import Tags from "./Tags";
import Menus from "./Menus";
import Modal from "@/ui/Modal";
import EditBookmarkForm from "./EditBookmarkForm";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import ConfirmArchiveModal from "./modals/ConfirmArchiveModal";
import { Trash2 } from "lucide-react";
import { useMenus } from "@/hooks/useMenus";

type CardProps = {
  bookmark: UpdateBookmarkData;
};

export default function Card({ bookmark }: CardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { close } = useMenus();
  let faviconUrl = "/url-logo.png";

  const isArchived = bookmark.is_archived ?? false;

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
    <div className="flex flex-col rounded-xl bg-white">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-10 w-10 rounded-lg">
              <img
                src={faviconUrl}
                alt={`${bookmark.title} favicon`}
                className="h-full w-full object-contain"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/url-logo.png")
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-manrope text-light-900 text-[20px] leading-[120%] font-bold">
                {bookmark.title}
              </h1>
              <p className="font-manrope text-light-800 text-[12px] leading-[140%] font-medium">
                {bookmark.url.slice(0, 21)}...
              </p>
            </div>
          </div>

          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={bookmark.id} />

              <Menus.List id={bookmark.id}>
                <Menus.Button
                  onClick={() =>
                    window.open(bookmark.url, "_blank", "noopener,noreferrer")
                  }
                >
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
                  <span className={isCopied ? "font-bold text-green-600" : ""}>
                    {isCopied ? "Copied" : "Copy Url"}
                  </span>
                </Menus.Button>
                <Menus.Button>
                  <img src="/pin-icon.png" alt="pin icon" className="h-4 w-4" />
                  <span>Unpin</span>
                </Menus.Button>
                <Modal.Open opens="edit-bookmark-form">
                  <Menus.Button>
                    <img src="/edit.png" alt="edit icon" className="h-4 w-4" />
                    <span>Edit</span>
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="archive-modal">
                  <Menus.Button>
                    <img src="/archive.png" alt="archive icon" className="h-4 w-4" />
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
              <ConfirmDeleteModal onCloseModal={() => {}} bookmark={bookmark} />
            </Modal.Window>

            <Modal.Window name="archive-modal">
              <ConfirmArchiveModal
                onCloseModal={() => {}}
                bookmark={bookmark}
              />
            </Modal.Window>
          </Modal>
        </div>

        <hr className="border-light-300 border" />

        <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
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

      <div className="border-light-300 flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <img src="/eye.png" alt="eye icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              47
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <img src="/clock.png" alt="clock icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              23 Sep
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <img src="/calendar.png" alt="calendar icon" className="h-3 w-3" />
            <p className="text-light-800 font-manrope text-xs leading-[140%] font-medium">
              15 Jan
            </p>
          </div>
        </div>

        <div>
          <img src="/pin.png" alt="pin icon" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
