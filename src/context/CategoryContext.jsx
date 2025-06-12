import { createContext, useState } from "react";

// 1. context 생성
export const CateGoryContext = createContext();

export function CateGoryProvider({ children }) {
    const [categoryList, setCategoryList] = useState([]);

    const fetchBooks = async ({ query, size = 10 }) => {
        try {
            const res = await fetch(
                `https://dapi.kakao.com/v3/search/book?query=${query}&size=${size}`,
                {
                    headers: {
                        Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
                    },
                }
            );
            const data = await res.json();
            setCategoryList(data.documents);
        } catch (err) {
            console.error("책 불러오기 오류:", err);
        }
    };

    return (
        <CateGoryContext.Provider value={{ categoryList, fetchBooks }}>
            {children}
        </CateGoryContext.Provider>
    );
}
