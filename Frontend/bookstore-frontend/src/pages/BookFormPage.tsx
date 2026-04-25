import { useEffect, useState } from "react";
import { BookForm } from "../forms/BookForm";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../api/BooksApi";

export const BookFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [isbn, setIsbn] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams();

  const isEdit = !!id;

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      const book = await getBookById(Number(id));

      setTitle(book.title);
      setDescription(book.description);
      setPrice(book.price);
      setIsbn(book.isbn);
      setImageUrl(book.imageUrl);
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      price,
      isbn,
      imageUrl,
    };

    if (isEdit) {
      await updateBook(Number(id), data);
    } else {
      await createBook(data);
    }

    navigate("/books");
  };

  return (
    <>
      <BookForm
        title={title}
        description={description}
        price={price}
        isbn={isbn}
        imageUrl={imageUrl}
        setTitle={setTitle}
        setDescription={setDescription}
        setPrice={setPrice}
        setIsbn={setIsbn}
        setImageUrl={setImageUrl}
        onSubmit={handleSubmit}
        buttonText={isEdit ? "Update Book" : "Create Book"}
      />
    </>
  );
};
