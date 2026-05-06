import type BookCreateDto from "../DTOs/BookDto/BookCreateDto";
import type BookUpdateDto from "../DTOs/BookDto/BookUpdateDto";
import { BookFilterQuery } from "../models/BookFilterQuery";
import {getToken} from "./helpers/authHelper.ts";

const BASE_URL = "https://localhost:7107/api/books";

export const getBooks = async (query?: BookFilterQuery) => {
  const url = new URL(`${BASE_URL}/query`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

const res = await fetch(url.toString());
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
  const token = getToken();
  return await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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