import { useFavorites } from "../context/FavoriteContext";

export default function FavoriteButton({ book }) {
  const { favoriteBooks, toggleFavorite, isLoading } = useFavorites();

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  const isFavorite = favoriteBooks.includes(book.isbn);
  return (
    <button className="inline-block w-32 rounded-xl border border-gray-400 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden" onClick={() => toggleFavorite(book.isbn)}>
      {isFavorite ? "❤️ 찜 해제" : "🤍 찜하기"}
    </button>
  );
}
