import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { archiveBookmark as archiveBookmarkApi } from "@/services/apiBookmarks";

export function useArchiveBookmark() {
  const queryClient = useQueryClient();

  const { mutate: archiveBookmark, isPending: isArchivingBookmark } =
    useMutation({
      mutationFn: archiveBookmarkApi,
      onSuccess: (_, variables) => {
        toast.success(
          variables.isArchived
            ? "Bookmark archived successfully!"
            : "Bookmark unarchived successfully!",
        );
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { archiveBookmark, isArchivingBookmark };
}
