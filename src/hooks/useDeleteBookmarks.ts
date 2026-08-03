import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark as deleteBookmarkApi } from "@/services/apiBookmarks";
import { toast } from "sonner";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookmark, isPending: isDeletingBookmark } = useMutation(
    {
      mutationFn: deleteBookmarkApi,
      onSuccess: () => {
        toast.success("Bookmark deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { deleteBookmark, isDeletingBookmark };
}
