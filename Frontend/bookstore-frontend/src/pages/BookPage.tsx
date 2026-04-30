import { useEffect, useState } from "react";
import type BookModel from "../models/BookModel";
import { BookCard } from "../components/BookCard";
import { getBooks, deleteBook } from "../api/BooksApi";
import toast from "react-hot-toast";
import {
  BookFilterQuery,
  defaultBookFilterQuery,
} from "../models/BookFilterQuery";
import { Pagination } from "../components/Pagination";
import { Filters } from "../components/Filters";

export const BookPage = ({ search }) => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageNumber: defaultBookFilterQuery.pageNumber,
    pageSize: defaultBookFilterQuery.pageSize,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const query: BookFilterQuery = {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        search: debouncedSearch,
      };

      const data = await getBooks(query);

      setBooks(data.items);
      setPagination(data.pagination);
      setLoading(false);
    };

    fetch();
  }, [debouncedSearch, pagination.pageNumber]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
  }, [debouncedSearch]);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this book?");

    if (!confirmed) return;

    const res = await deleteBook(id);

    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Book was deleted successfully!");
    } else {
      toast.error("Deletion failed!");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {books.length === 0 ? (
        <p className="text-gray-500">No results!</p>
      ) : (
        <div className="flex gap-6">
          <div className="w-[20%] min-w-62.5">
            <Filters />
          </div>
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-5 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onDelete={handleDelete} />
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
