import "./App.css";
import { BookPage } from "./pages/BookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookFormPage } from "./pages/BookFormPage";

function App() {
  return (
    <BrowserRouter>
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
