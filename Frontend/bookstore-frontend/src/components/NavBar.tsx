import { Link } from "react-router-dom";

export const NavBar = ({ search, setSearch }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-6 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/books" className="font-bold text-lg">
          📚 BookStore
        </Link>

        <Link to="/books" className="hover:text-gray-300">
          Books
        </Link>

        <Link to="/create" className="hover:text-gray-300">
          Create
        </Link>
      </div>

      <div className="flex-1 flex justify-center max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full px-4 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="shrink-0 w-30"></div>
    </nav>
  );
};
