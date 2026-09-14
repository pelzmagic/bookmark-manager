import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBookmark } from "@/services/apiBookmarks";

export function useTogglePin() {
  const queryClient = useQueryClient();

  const { mutate: togglePin, isPending: isPinning } = useMutation({
    mutationFn: ({ id, isPinned }: { id: number; isPinned: boolean }) =>
      updateBookmark(id, { is_pinned: isPinned }),

    onSuccess: (_, variables) => {
      toast.success(
        variables.isPinned ? "Bookmark pinned" : "Bookmark unpinned",
      );
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: () => {
      toast.error("Failed to update pin status");
    },
  });

  return { togglePin, isPinning };
}
