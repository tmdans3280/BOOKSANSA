import { useState, useEffect } from "react";
import Header from "../layout/Header";
import { useFavorites } from "../context/FavoriteContext";

export default function Home() {
  const { favoriteBooks, toggleFavorite, isLoading } = useFavorites();
  useEffect(() => {
    console.log("🔥 찜한 책 목록:", favoriteBooks);
  }, [favoriteBooks]);

  return (
    <div>
      <Header />

      <div className="flex flex-col text-center">
        <div className="text-4xl">내가 찜한책</div>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <div>
            {favoriteBooks.length === 0 ? (
              <p>찜한 책이 없습니다.</p>
            ) : (
              favoriteBooks.map((item) => <div key={item}>{item}</div>)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
