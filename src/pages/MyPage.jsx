import { useState, useEffect } from "react";
import Header from "../layout/Header";
import { useFavorites } from "../context/FavoriteContext";
import { fetchBookByIsbn } from "../util/kakao";

export default function Home() {
  const { favoriteBooks, isLoading } = useFavorites();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const results = await Promise.all(
        favoriteBooks.map((isbn) => fetchBookByIsbn(isbn.split(" ").pop()))
      );
      setBookList(results.filter(Boolean)); // null 제거
    };
    if (favoriteBooks.length > 0) {
      fetchBooks();
    }
  }, [favoriteBooks]);

  useEffect(() => {
    console.log("📌 favoriteBooks:", favoriteBooks);
  }, [favoriteBooks]);
  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div>
      <Header />

      <div className="flex flex-col text-center">
        <div className="text-4xl">내가 찜한책</div>
        {bookList.map((book) => (
          <div key={book.isbn}>
            <img src={book.thumbnail} alt="thumbnail" />
            <div>{book.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
