import supabase from "./supabase";
import type { BookmarkData } from "@/types/bookmarkData";

export async function createBookmark(newBookmark: BookmarkData) {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([newBookmark])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Bookmark could not be created");
  }

  return data;
}
