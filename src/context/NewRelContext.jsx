import { createContext, useState, useEffect } from "react";

export const NewRelContext = createContext();

export function NewRelProvider({ children }) {
  const [newRelBooks, setNewRelBooks] = useState([]);

  const fetchNewRelBooks = async () => {
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=도서&size=50&sort=latest`,
        {
          headers: {
            Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
          },
        }
      );
      const data = await res.json();
      setNewRelBooks(data.documents);
    } catch (err) {
      console.error("🔥 NewRelContext 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchNewRelBooks();
  }, []);

  return (
    <NewRelContext.Provider value={{ newRelBooks, fetchNewRelBooks }}>
      {children}
    </NewRelContext.Provider>
  );
}
