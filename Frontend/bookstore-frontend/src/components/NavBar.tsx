import { Link } from "react-router-dom";

export const NavBar = () => {
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

      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-1 rounded text-white justify-center items-center"
      />
    </nav>
  );
};
