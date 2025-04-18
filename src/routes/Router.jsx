import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookdetail" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
