import "./App.css";
import { BookPage } from "./pages/BookPage";
import { CreateBookPage } from "./pages/CreateBookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/create" element={<CreateBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
