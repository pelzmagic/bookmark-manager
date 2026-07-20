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
  console.log("--- 2. API FUNCTION EXECUTING ---");
  console.log("SQL Target ID:", id);
  console.log("SQL Payload:", newBookmarkData);

  const { data, error } = await supabase
    .from("Bookmarks")
    .update(newBookmarkData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  console.log("--- 3. SUPABASE RAW RESPONSE ---", data);

  return data;
}
