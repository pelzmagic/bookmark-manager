import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/services/apiBookmarks";

export function useGetBookmarks() {
  const {
    data: bookmarks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });

  return { bookmarks, isPending, error };
}
