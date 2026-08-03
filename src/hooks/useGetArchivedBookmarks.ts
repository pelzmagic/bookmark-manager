import { useQuery } from "@tanstack/react-query";
import { getArchivedBookmarks } from "@/services/apiBookmarks";

export function useGetArchivedBookmarks(showArchived = true) {
  const {
    data: bookmarks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookmarks", { showArchived }],
    queryFn: () => getArchivedBookmarks(showArchived),
  });

  return { bookmarks, isPending, error };
}
