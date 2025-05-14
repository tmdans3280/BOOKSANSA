import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async ({ query = "지구", size = 50, sort = "latest" } = {}) => {
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${query}&size=${size}&sort=${sort}`,
        {
          headers: {
            Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
          },
        }
      );
      const data = await res.json();
      setBooks(data.documents);
    } catch (err) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
}
