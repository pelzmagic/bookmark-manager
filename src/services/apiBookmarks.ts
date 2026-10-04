import supabase from "./supabase";
import type { BookmarkData } from "@/types/bookmarkData";

type GetBookmarksArgs = {
  showArchived?: boolean;
  sortBy?: string;
};

export async function createBookmark(newBookmark: BookmarkData) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user)
    throw new Error("User must be logged in to create a bookmark");

  const { data, error } = await supabase
    .from("Bookmarks")
    .insert([{ ...newBookmark, user_id: user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Bookmark could not be created");
  }

  return data;
}

export async function getBookmarks({
  showArchived = false,
  sortBy = "created-at_desc",
}: GetBookmarksArgs) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user)
    throw new Error("User must be logged in to view bookmarks");

  let query = supabase
    .from("Bookmarks")
    .select("*")
    .eq("is_archived", showArchived)
    .eq("user_id", user.id);

  const [field, direction] = sortBy.split("-");
  const isAscending = direction === "asc";

  query = query.order(field, { ascending: isAscending });

  const { data, error } = await query;

  if (error) throw new Error("Bookmark could not be retrieved");

  return data;
}

export async function getArchivedBookmarks(showArchived = true) {
  const { data, error } = await supabase
    .from("Bookmarks")
    .select("*")
    .eq("is_archived", showArchived);

  if (error) throw new Error("Bookmark could not be retrieved");

  return data;
}

export async function updateBookmark(
  id: number,
  newBookmarkData: Partial<BookmarkData>,
) {
  const { data, error } = await supabase
    .from("Bookmarks")
    .update(newBookmarkData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function incrementBookmarkVisits(id: number) {
  const { data, error } = await supabase.rpc("increment_visit_count", {
    bookmark_id: id,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteBookmark(id: number) {
  const { error } = await supabase.from("Bookmarks").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function archiveBookmark({
  id,
  isArchived,
}: {
  id: number;
  isArchived: boolean;
}) {
  const { data, error } = await supabase
    .from("Bookmarks")
    .update({ is_archived: isArchived })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
