export type BookmarkData = {
  title: string;
  description: string;
  url: string;
  tags: string;
};

export type UpdateBookmarkData = BookmarkData & {
  id: number;
};
