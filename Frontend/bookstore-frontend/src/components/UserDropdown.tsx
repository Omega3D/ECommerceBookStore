import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";

export const UserDropdown = () => {
    const { isAuthenticated, logout } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            const name =
                payload[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                    ];

            setUserName(name);
        } catch {
            setUserName("User");
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    if (!isAuthenticated) {
        return (
            <Link
                to="/login"
                className="hover:text-gray-300 transition"
            >
                Login
            </Link>
        );
    }

    return (
        <div
            className="relative"
            ref={dropdownRef}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-xl"
            >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                    {userName.charAt(0)}
                </div>

                <div className="text-left">
                    <p className="text-sm font-semibold">
                        {userName}
                    </p>

                    <p className="text-xs text-gray-400">
                        My account
                    </p>
                </div>

                <svg
                    className={`w-4 h-4 transition ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">
                            {userName}
                        </p>

                        <p className="text-sm text-gray-500">
                            Welcome back 👋
                        </p>
                    </div>

                    <div className="p-2">
                        <Link
                            to="/orders"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
                        >
                            📦 My Orders
                        </Link>

                        <Link
                            to="/favorites"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
                        >
                            ❤️ Favorites
                        </Link>

                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
                        >
                            ⚙️ Profile Settings
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 p-2">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};