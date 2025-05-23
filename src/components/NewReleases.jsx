import BookList from "./BookList";
import "swiper/css";
import { BookContext } from "../context/BookContext";
import { useContext } from "react";

export default function NewReleases() {
  const { publisherBooks } = useContext(BookContext);

  return (
    <div>
      <div className="mt-36 mb-12 text-2xl">출판사의 선택</div>
      {publisherBooks.length === 0 ? (
        <p>로딩 중...</p>
      ) : (
        <div className="relative flex  justify-between">
          {publisherBooks.map((item) => (
            <div key={item.isbn}>
              <BookList {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
