import { createContext, useState } from "react";

// 1. context 생성
export const BookListContext = createContext();

export function BookListProvider({ children }) {
  const [bookList, setBookList] = useState([]);

  const fetchBooks = async ({ query, size = 10 }) => {
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${query}&size=${size}`,
        {
          headers: {
            Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374", // ← 너가 쓰는 카카오 API 키
          },
        }
      );
      const data = await res.json();
      setBookList(data.documents);
    } catch (err) {
      console.error("책 불러오기 오류:", err);
    }
  };

  return (
    <BookListContext.Provider value={{ bookList, fetchBooks }}>
      {children}
    </BookListContext.Provider>
  );
}
