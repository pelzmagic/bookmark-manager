export type BookmarkData = {
  title: string;
  description: string;
  url: string;
  tags: string;
  is_archived?: boolean;
  is_pinned?: boolean;
  created_at?: string;
  visit_count?: number;
};

export type UpdateBookmarkData = BookmarkData & {
  id: number;
};
