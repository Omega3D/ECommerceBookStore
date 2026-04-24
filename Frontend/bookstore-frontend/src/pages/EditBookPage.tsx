import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../api/BooksApi";
import type BookModel from "../models/BookModel";
import type BookUpdateDto from "../BookDto/BookUpdateDto";
import { useParams } from "react-router-dom";

export const EditBookPage = () => {
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newPrice, setPrice] = useState<number>(0);
  const [newIsbn, setIsbn] = useState("");
  const [newImageUrl, setImageUrl] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const response = await fetchBookById();
        setTitle(response.title);
        setDescription(response.description);
        setPrice(response.price);
        setIsbn(response.isbn);
        setImageUrl(response.imageUrl);
      } catch (error) {
        alert("Book fetching error!");
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  const fetchBookById = async () => {
    const fetchedBook: BookModel = await getBookById(Number(id));
    if (!fetchedBook) {
      alert(`Error fetching book by id`);
    } else {
      return fetchedBook;
    }
  };

  const handleEdit = async () => {
    const bookData: BookUpdateDto = {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      isbn: newIsbn,
      imageUrl: newImageUrl,
    };

    await updateBook(Number(id), bookData);

    navigate("/books");
  };

  return (
    <>
      <div>
        <h2 className="text-5xl font-bold text-heading">Book Editing</h2>
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
            value={newTitle}
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
            value={newDescription}
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
            value={newPrice}
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
            value={newIsbn}
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
            value={newImageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded ml-2 cursor-pointer"
          onClick={handleEdit}
        >
          Update Book
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
