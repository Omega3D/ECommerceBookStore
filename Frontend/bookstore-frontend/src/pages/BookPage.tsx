import { useEffect, useState } from "react";
import type BookModel from "../models/BookModel";
import { BookCard } from "../components/BookCard";
import { getBooks, deleteBook } from "../api/BooksApi";

export const BookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const data = await getBooks();

      setBooks(data);
      setLoading(false);
    };

    fetch();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this book?");

    if (!confirmed) return;

    const res = await deleteBook(id);

    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Delete failed");
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
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      {books.length === 0 && loading ? (
        <p className="text-gray-500">No books yet. Create a new one!</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
