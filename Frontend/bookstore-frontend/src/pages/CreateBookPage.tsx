import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type BookCreateDto from "../BookDto/BookCreateDto";
import { createBook } from "../api/BooksApi";

export const CreateBookPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [isbn, setIsbn] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleCreate = async () => {
    const myBook: BookCreateDto = {
      title: title,
      description: description,
      price: price,
      isbn: isbn,
      imageUrl: imageUrl,
    };
    const res = await createBook(myBook);

    if (res.ok) {
      navigate("/books");
    } else {
      alert("Book Creation Failed");
    }
  };

  return (
    <>
      <div>
        <h2 className="text-5xl font-bold text-heading">Book Creation</h2>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Enter Title
          </label>
          <input
            type="text"
            id="visitors"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder=""
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Enter Description
          </label>
          <input
            type="text"
            id="visitors"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder=""
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Enter Price
          </label>
          <input
            type="text"
            id="visitors"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder=""
            required
            value={price}
            onChange={(e) => {
              setPrice(parseFloat(e.target.value));
            }}
          />
        </div>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Enter ISBN
          </label>
          <input
            type="text"
            id="visitors"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder=""
            required
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Add Image Url
          </label>
          <input
            type="text"
            id="visitors"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder=""
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded ml-2 cursor-pointer"
          onClick={handleCreate}
        >
          Create Book
        </button>
      </div>
      <Link
        to="/books"
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
      >
        Go Back
      </Link>
    </>
  );
};
