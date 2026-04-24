import "./App.css";
import { BookPage } from "./pages/BookPage";
import { CreateBookPage } from "./pages/CreateBookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditBookPage } from "./pages/EditBookPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/create" element={<CreateBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
