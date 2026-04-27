import "./App.css";
import { BookPage } from "./pages/BookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookFormPage } from "./pages/BookFormPage";
import { Toaster } from "react-hot-toast";

function App() {
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
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/create" element={<BookFormPage />} />
        <Route path="/edit/:id" element={<BookFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
