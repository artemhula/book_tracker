export type Book = {
  isbn: number;
  title: string;
  author: string;
  totalPages: number | null;
  coverURL: string | null;
  currentPage: number | null;
};
