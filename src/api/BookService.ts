export default class BookService {
  static async getBookByISBN(isbn: string) {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${
        import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
      }`
    );
    const json = await res.json();
    if (!json.items || !json.items.length) return null;
    const data = json.items[0]?.volumeInfo;
    if (!data) return null;

    return {
      isbn: parseInt(isbn),
      title: data.title,
      author: data.authors[0] ?? '',
      pages: data.pageCount,
      coverURL: data.imageLinks?.thumbnail ?? null,
    };
  }
}
