export type Book = {
  isbn: string;
  title: string;
  author: string;
  totalPages: number | null;
  coverURL: string | null;
  currentPage: number | null;
};
