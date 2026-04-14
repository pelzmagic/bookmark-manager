import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark as createBookmarkApi } from "@/services/apiBookmarks";
import { toast } from "sonner";

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  const { mutate: createBookmark, isPending: isCreating } = useMutation({
    mutationFn: createBookmarkApi,
    onSuccess: () => {
      toast.success("Bookmark created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBookmark };
}
