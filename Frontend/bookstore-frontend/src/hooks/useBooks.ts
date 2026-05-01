import { useEffect, useState } from "react";

import { getBooks } from "../api/BooksApi";

import type BookModel from "../models/BookModel";
import type { BookFilterQuery } from "../models/BookFilterQuery";

export const useBooks = (query: BookFilterQuery) => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const data = await getBooks(query);

        setBooks(data.items);
        setPagination(data.pagination);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [
    query.pageNumber,
    query.pageSize,
    query.search,
  ]);

  return {
    books,
    setBooks,
    pagination,
    loading,
  };
};