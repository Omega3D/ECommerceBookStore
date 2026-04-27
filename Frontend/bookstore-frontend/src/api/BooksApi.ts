import type BookCreateDto from "../BookDto/BookCreateDto";
import type BookUpdateDto from "../BookDto/BookUpdateDto";

const BASE_URL = "https://localhost:7107/api/books";

export const getBooks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getBookById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export const createBook = async (book: BookCreateDto) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return response.json();
};

export const deleteBook = async (id: number) => {
  return await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const updateBook = async (id: number, book: BookUpdateDto) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
};