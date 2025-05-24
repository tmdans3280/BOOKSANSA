import { createContext, useState, useEffect } from "react";

export const PopularContext = createContext();

export function PopularProvider({ children }) {
  const [popularBooks, setPopularBooks] = useState([]);

  const fetchPopularBooks = async () => {
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=소설&size=10&sort=accuracy`,
        {
          headers: {
            Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
          },
        }
      );
      const data = await res.json();
      setPopularBooks(data.documents);
    } catch (err) {
      console.error("🔥 popularBooks 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  return (
    <PopularContext.Provider value={{ popularBooks, fetchPopularBooks }}>
      {children}
    </PopularContext.Provider>
  );
}
