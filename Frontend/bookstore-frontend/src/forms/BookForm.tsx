import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  price: number;
  isbn: string;
  imageUrl: string;

  setTitle: (v: string) => void;
  setDescription: (v: string) => void;
  setPrice: (v: number) => void;
  setIsbn: (v: string) => void;
  setImageUrl: (v: string) => void;

  onSubmit: () => void;
  buttonText: string;

  errors: Record<string, string>;
};

export const BookForm = ({
  title,
  description,
  price,
  isbn,
  imageUrl,
  setTitle,
  setDescription,
  setPrice,
  setIsbn,
  setImageUrl,
  onSubmit,
  buttonText,
  errors,
}: Props) => {
  return (
    <div>
      <label className="block mb-2.5 text-sm font-medium text-heading">
        Title
      </label>
      <input
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      <label className="block mb-2.5 text-sm font-medium text-heading">
        Description
      </label>
      <input
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}
      <label className="block mb-2.5 text-sm font-medium text-heading">
        Price
      </label>
      <input
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      <label className="block mb-2.5 text-sm font-medium text-heading">
        ISBN
      </label>
      <input
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      <label className="block mb-2.5 text-sm font-medium text-heading">
        ImageUrl
      </label>
      <input
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded ml-2 cursor-pointer"
        onClick={onSubmit}
      >
        {buttonText}
      </button>
      <Link
        to="/books"
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
      >
        Go Back
      </Link>
    </div>
  );
};
