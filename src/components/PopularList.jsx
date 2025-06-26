import { useContext } from "react";
import BookList from "./BookList";
import "swiper/css";
import { BookContext } from "../context/BookContext";

export default function PopularList() {
  const { todayBooks } = useContext(BookContext);

  return (
    <div className="bg-white">
      <div className="pt-12 max-w-[1200px] mx-auto">
        <div className="mt-12 mb-12 text-2xl">오늘의 도서</div>
        {todayBooks.length === 0 ? (
          <p>로딩 중...</p>
        ) : (
          <div className="relative flex gap-14 ">
            {todayBooks.map((item) => (
              <div key={item.isbn}>
                <BookList {...item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
