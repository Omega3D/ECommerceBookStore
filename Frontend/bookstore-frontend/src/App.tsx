import "./App.css";
import BookPage from "./pages/BookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookFormPage } from "./pages/BookFormPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { NavBar } from "./components/NavBar";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
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
        <Route path="/create" element={<BookFormPage />} />
        <Route path="/edit/:id" element={<BookFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
