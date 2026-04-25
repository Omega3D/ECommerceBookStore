import { useEffect, useState } from "react";
import type BookModel from "../models/BookModel";
import { BookCard } from "../components/BookCard";
import { getBooks, deleteBook } from "../api/BooksApi";
import { Link } from "react-router-dom";

export const BookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  const handleDelete = async (id: number) => {
    const res = await deleteBook(id);

    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      <Link
        to="/create"
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
      >
        Create Book
      </Link>

      <div className="mt-6 space-y-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};
