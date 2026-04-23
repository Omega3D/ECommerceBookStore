import type BookModel from "../models/BookModel";

type Props = {
  book: BookModel;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export const BookCard = ({ book, onDelete, onEdit }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs max-w-xl">
      <img
        className="object-cover w-full h-64 md:h-auto md:w-48 rounded-base mb-4 md:mb-0"
        src={book.imageUrl || "https://via.placeholder.com/150"}
        alt="book"
      />

      <div className="flex flex-col justify-between md:pl-4 w-full">
        <div>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-heading">
            {book.title}
          </h3>

          <p className="mb-3 text-body">{book.description}</p>

          <p className="text-sm text-gray-500 mb-2">ISBN: {book.isbn}</p>

          <p className="font-semibold text-lg mb-4">{book.price}$</p>
        </div>

        <button
          onClick={() => onDelete(book.id)}
          className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(book.id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
