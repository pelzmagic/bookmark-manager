import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/services/apiBookmarks";
import { useSearchParams } from "react-router-dom";

export function useGetBookmarks(showArchived = false) {
  const [searchParams] = useSearchParams();

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";

  const {
    data: bookmarks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookmarks", { showArchived, sortBy: sortByValue }],
    queryFn: () => getBookmarks({ showArchived, sortBy: sortByValue }),
  });

  return { bookmarks, isPending, error };
}
