export type BookmarkData = {
  title: string;
  description: string;
  url: string;
  tags: string;
  is_archived?: boolean;
  is_pinned?: boolean;
};

export type UpdateBookmarkData = BookmarkData & {
  id: number;
};
