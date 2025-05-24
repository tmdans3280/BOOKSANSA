import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [todayBooks, setTodayBooks] = useState([]);
  const [publisherBooks, setPublisherBooks] = useState([]);

  const fetchBooksByType = async (type) => {
    const query = type === "today" ? "코딩" : "출판사 추천";

    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${query}&size=5&sort=latest`,
        {
          headers: {
            Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
          },
        }
      );
      const data = await res.json();
      if (type === "today") {
        setTodayBooks(data.documents);
      } else if (type === "publisher") {
        setPublisherBooks(data.documents);
      }
    } catch (err) {
      console.error("error:", err);
    }
  };

  useEffect(() => {
    fetchBooksByType("today");
    fetchBooksByType("publisher");
  }, []);

  return (
    <BookContext.Provider
      value={{ todayBooks, publisherBooks, fetchBooksByType }}
    >
      {children}
    </BookContext.Provider>
  );
}
