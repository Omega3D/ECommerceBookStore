import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type BookModel from "../models/BookModel";

import { BookCard } from "../components/BookCard";
import { Pagination } from "../components/Pagination";
import { Filters } from "../components/Filters";

import { deleteBook } from "../api/BooksApi";

import { defaultBookFilterQuery } from "../models/BookFilterQuery";

import { useDebounce } from "../hooks/useDebounce";
import { useBooks } from "../hooks/useBooks";

export const BookPage = ({ search }) => {
  const debouncedSearch = useDebounce(search, 400);

  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageNumber: defaultBookFilterQuery.pageNumber,
    pageSize: defaultBookFilterQuery.pageSize,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  const {
    books,
    pagination: serverPagination,
    loading,
    setBooks,
  } = useBooks({
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (serverPagination) {
      setPagination(serverPagination);
    }
  }, [serverPagination]);

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
      setBooks((prev: BookModel[]) => prev.filter((b) => b.id !== id));

      toast.success("Book was deleted successfully!");
    } else {
      toast.error("Deletion failed!");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 animate-pulse rounded bg-gray-200"></div>
        <div className="h-24 animate-pulse rounded bg-gray-200"></div>
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
              {books.map((book: BookModel) => (
                <BookCard key={book.id} book={book} onDelete={handleDelete} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
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
