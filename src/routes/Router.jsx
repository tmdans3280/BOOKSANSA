import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import Popular from "../pages/Popular";
import NewRel from "../pages/NewRel";
import SignUp from "../pages/Signup";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import CategoryBookList from "../components/CategoryBookList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookdetail" element={<BookDetail />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/newrel" element={<NewRel />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/categorybooklist" element={<CategoryBookList />} />
      </Routes>
    </BrowserRouter>
  );
}
