export type BookmarkData = {
  title: string;
  description: string;
  url: string;
  tags: string;
  is_archived?: boolean;
};

export type UpdateBookmarkData = BookmarkData & {
  id: number;
};
