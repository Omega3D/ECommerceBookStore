import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { UserDropdown } from "./UserDropdown";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export const NavBar = ({ search, setSearch }: Props) => {
    const { isAuthenticated, logout } = useAuth();

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

        <div className="shrink-0 flex justify-end min-w-35">
            {isAuthenticated ? (
                <UserDropdown />
            ) : (
                <Link
                    to="/login"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/30"
                >
                    <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15m3-3l-3-3m3 3l-3 3m3-3H9"
                        />
                    </svg>

                    <span>Login</span>
                </Link>
            )}
        </div>
    </nav>
  );
};
