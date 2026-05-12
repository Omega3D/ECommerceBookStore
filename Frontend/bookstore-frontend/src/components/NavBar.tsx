import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { UserDropdown } from "./UserDropdown";
import {useCart} from "../contexts/CartContext.tsx";
import {CartDropdown} from "./CartDropdown.tsx";
import {useState} from "react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export const NavBar = ({ search, setSearch }: Props) => {
    const { isAuthenticated, roles } = useAuth();
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-6 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/books" className="font-bold text-lg">
          📚 BookStore
        </Link>

        <Link to="/books" className="hover:text-gray-300">
          Books
        </Link>

          {
              roles.includes("Admin") && (
                  <Link
                      to="/create"
                      className="hover:text-gray-300"
                  >
                      Create
                  </Link>
              )
          }
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

        <div className="relative mr-2 mt-2">
            <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative flex-shrink-0 hover:text-gray-300 focus:outline-none"
            >
                <svg
                    width="40px"
                    height="35px"
                    viewBox="-1.5 0 19 19"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="text-white"
                >
                    <path
                        d="M14.252 4.59a.924.924
                            0 0 1 .921.92v3.602a1.048
                            1.048 0 0 1-.916 1.017l-8.511.883a.573.573 0 0
                            1-.145.019.577.577 0 1 0 0 1.154h8.488a.563.563 0 1 1 0
                            1.126h-.91a1.03 1.03 0 1 1-1.104 0H6.849a1.03 1.03 0 1 1-1.104 0H5.6a1.703 1.703 0 1 1 0-3.406.585.585 0 0
                            1 .128.014L3.111 3.911H1.39a.563.563 0 1 1 0-1.125h2.09a.562.562 0 0 1 .515.337l.64 1.466h9.617z"
                    />
                </svg>
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                )}
            </button>

            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>

        <div className="shrink-0 flex justify-end min-w-35">
            {isAuthenticated ? (
                <UserDropdown/>
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
