import { useFavorites } from "../context/FavoriteContext";

export default function FavoriteButton({ book }) {
  const { favoriteBooks, toggleFavorite, isLoading } = useFavorites();

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  const isFavorite = favoriteBooks.includes(book.isbn);
  return (
    <button onClick={() => toggleFavorite(book.isbn)}>
      {isFavorite ? "❤️ 찜 해제" : "🤍 찜하기"}
    </button>
  );
}
