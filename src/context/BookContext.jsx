import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        "https://dapi.kakao.com/v3/search/book?query=도서",
        {
          headers: {
            Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
          },
        }
      );
      const data = await res.json();
      setBooks(data.documents);
    };
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
}
