import "./App.css";
import BookPage from "./pages/BookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookFormPage } from "./pages/BookFormPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { NavBar } from "./components/NavBar";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
    const [search, setSearch] = useState("");

    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                padding: "20px 32px",
                                fontSize: "1.25rem",
                                width: "500px",
                            },
                        }}
                    />

                    <NavBar search={search} setSearch={setSearch} />

                    <Routes>
                        <Route path="/" element={<BookPage search={search} />} />
                        <Route path="/books" element={<BookPage search={search} />} />

                        <Route
                            path="/create"
                            element={
                                <ProtectedRoute roles={["Admin"]}>
                                    <BookFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/edit/:id"
                            element={
                                <ProtectedRoute roles={["Admin"]}>
                                    <BookFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route
                            path="/order"
                            element={
                                <ProtectedRoute roles={["Admin","User"]}>
                                    <BookFormPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;