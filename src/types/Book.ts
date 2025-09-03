export type Book = {
  id?: string;
  userId?: string;
  isbn: string;
  title: string;
  author: string;
  totalPages: number | null;
  coverURL: string | null;
  currentPage: number | null;
};
