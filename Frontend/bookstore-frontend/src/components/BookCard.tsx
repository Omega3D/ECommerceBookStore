import type BookModel from "../models/BookModel";
import { Link } from "react-router-dom";

type Props = {
  book: BookModel;
  onDelete: (id: number) => void;
};

export const BookCard = ({ book, onDelete }: Props) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 w-60">
      {/* Кнопка "В бажання" (сердечко) */}
      <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition">
        <svg
          className="w-5 h-5 text-gray-400 hover:text-red-500 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Зображення */}
      <Link
        to={`/edit/${book.id}`}
        className="block overflow-hidden rounded-lg"
      >
        <img
          className="w-full h-100 object-contain hover:scale-105 transition-transform duration-300"
          src={book.imageUrl || "https://via.placeholder.com/200x300"}
          alt={book.title}
        />
      </Link>

      <div className="text-xs text-gray-400 mt-3">#{book.id}</div>

      <Link to={`/edit/${book.id}`}>
        <h3 className="font-bold text-gray-800 text-md mt-1 hover:text-blue-600 transition line-clamp-2 min-h-12">
          {book.title}
        </h3>
      </Link>

      <div className="text-sm text-gray-500 mt-1 line-clamp-1">
        {book.isbn || "Невідомий автор"}
      </div>

      <div className="flex items-baseline gap-2 mt-3">
        <span className="text-xl font-bold text-gray-900">{book.price} ₴</span>
        <span className="text-xs text-green-600">Є в наявності</span>
      </div>

      <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3"
          />
        </svg>
        Купити
      </button>

      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <Link
          to={`/edit/${book.id}`}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-1.5 px-2 rounded transition text-center"
        >
          Редагувати
        </Link>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-2 rounded transition"
        >
          Видалити
        </button>
      </div>
    </div>
  );
};
