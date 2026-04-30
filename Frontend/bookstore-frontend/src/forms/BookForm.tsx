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
  loading: boolean;
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
  loading,
}: Props) => {
  const inputStyle =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelStyle = "mb-2 block text-sm font-semibold text-gray-700";

  const errorStyle = "mt-1 text-sm text-red-500";

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{buttonText}</h1>

          <p className="mt-2 text-gray-500">
            Fill in the book information below.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className={labelStyle}>Title</label>

            <input
              className={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
            />

            {errors.title && <p className={errorStyle}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>Description</label>

            <textarea
              rows={4}
              className={`${inputStyle} resize-none`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />

            {errors.description && (
              <p className={errorStyle}>{errors.description}</p>
            )}
          </div>

          {/* Price + ISBN */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelStyle}>Price</label>

              <input
                type="number"
                className={inputStyle}
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  setPrice(val === "" ? 0 : parseFloat(val));
                }}
                placeholder="0.00"
              />

              {errors.price && <p className={errorStyle}>{errors.price}</p>}
            </div>

            <div>
              <label className={labelStyle}>ISBN</label>

              <input
                className={inputStyle}
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="978-..."
              />

              {errors.isbn && <p className={errorStyle}>{errors.isbn}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelStyle}>Image URL</label>

            <input
              className={inputStyle}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <img
                src={imageUrl}
                alt="Preview"
                className="h-72 w-full object-cover"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={onSubmit}
              disabled={loading}
              className={`
                rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200
                ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
                }
              `}
            >
              {loading ? "Loading..." : buttonText}
            </button>

            <Link
              to="/books"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
