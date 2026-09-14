import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementBookmarkVisits } from "@/services/apiBookmarks";
import { toast } from "sonner";

export function useIncrementVisit() {
  const queryClient = useQueryClient();

  const { mutate: incrementVisit, isPending: isIncrementing } = useMutation({
    mutationFn: (id: number) => incrementBookmarkVisits(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update visit count");
    },
  });

  return { incrementVisit, isIncrementing };
}
