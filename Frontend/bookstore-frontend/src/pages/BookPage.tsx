import { useEffect, useState } from "react";
import type BookModel from "../models/BookModel";
import { BookCard } from "../components/BookCard";
import { getBooks, createBook, deleteBook, updateBook } from "../api/BooksApi";
import type BookCreateDto from "../BookDto/BookCreateDto";
import type BookUpdateDto from "../BookDto/BookUpdateDto";

export const BookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [title, setTitle] = useState<string>("");

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

  const handleCreate = async () => {
    const myBook: BookCreateDto = {
      title: title,
      description: "updated",
      price: 100,
      isbn: "123",
      imageUrl: "",
    };
    await createBook(myBook);

    setTitle("");
  };

  const handleEdit = async (id: number) => {
    const newTitle = prompt("New title");

    if (!newTitle) return;

    const bookData: BookUpdateDto = {
      title: newTitle,
      description: "edited",
      price: 100,
      isbn: "123",
      imageUrl: "",
    };

    await updateBook(id, bookData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      <input
        className="border p-2 mr-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Book
      </button>

      <div className="mt-6 space-y-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};
