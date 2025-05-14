// src/context/FavoriteContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { getFavorite, addFavorite, removeFavorite } from "../util/favorites";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const favorites = await getFavorite();
        setFavoriteBooks(favorites);
      } else {
        console.log("❌ 로그인된 사용자 없음");
        setFavoriteBooks([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("📌 Firestore에서 가져온 찜 목록:", favoriteBooks);
  }, [favoriteBooks]);

  const toggleFavorite = async (isbn) => {
    if (favoriteBooks.includes(isbn)) {
      await removeFavorite(isbn);
      setFavoriteBooks((prev) => prev.filter((id) => id !== isbn));
    } else {
      await addFavorite(isbn);
      setFavoriteBooks((prev) => [...prev, isbn]);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteBooks, toggleFavorite, isLoading }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
