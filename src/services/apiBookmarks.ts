import supabase from "./supabase";
import type { BookmarkData } from "@/types/bookmarkData";

export async function createBookmark(newBookmark: BookmarkData) {
  const { data, error } = await supabase
    .from("Bookmarks")
    .insert([newBookmark])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Bookmark could not be created");
  }

  return data;
}

export async function getBookmarks() {
  const { data, error } = await supabase.from("Bookmarks").select("*");

  if (error) throw new Error("Bookmark could not be retrieved");

  return data;
}

export async function updateBookmark(
  id: number,
  newBookmarkData: BookmarkData,
) {
  const { data, error } = await supabase
    .from("Bookmarks")
    .update(newBookmarkData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteBookmark(id: number) {
  const { error } = await supabase.from("Bookmarks").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function archiveBookmark(id: number, is_archived: boolean) {
  const {data,error} await supabase.from
}
