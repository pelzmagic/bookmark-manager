import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateBookmark } from "@/services/apiBookmarks";
import { toast } from "sonner";
import type { BookmarkData } from "@/types/bookmarkData";

export function useEditBookmark() {
  const queryClient = useQueryClient();
  const { mutate: editBookmark, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      newBookmarkData,
    }: {
      id: number;
      newBookmarkData: BookmarkData;
    }) => updateBookmark(id, newBookmarkData),

    onSuccess: () => {
      toast.success("Bookmark updated successfully");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editBookmark, isUpdating };
}
