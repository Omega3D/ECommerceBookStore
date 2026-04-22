import { useEffect, useState } from "react";
import "./App.css";
import type BookModel from "./models/BookModel";
import { BookCard } from "./components/BookCard";

function App() {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    fetch("https://localhost:7107/api/Books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`https://localhost:7107/api/Books/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Delete failed");
    }
  };

  return (
    <>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={handleDelete} />
      ))}
      <>
        <button className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition">
          Create a Book
        </button>
      </>
    </>
  );
}

export default App;
