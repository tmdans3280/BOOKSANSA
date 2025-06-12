import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CateGoryContext } from "../context/CategoryContext";
import Header from "../layout/Header";
import { useState } from "react";
import BookItem from "./BookItem";

export default function CategoryBookList() {
  const { categoryList, fetchBooks } = useContext(CateGoryContext);
  const basic_visibleCount = 5;
  const { state } = useLocation();
  const { item } = state;
  const [visibleCount, setVisibleCount] = useState(basic_visibleCount);

  const handleLodaMore = () => {
    setVisibleCount((prev) => prev + basic_visibleCount);
  };
  useEffect(() => {
    if (item) {
      fetchBooks({ query: item });
    }
  }, [item]);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto mt-8 ">
        <div className="text-4xl text-center">인기책순위</div>

        <ul className="mt-20 ml-7 ">
          {categoryList.slice(0, visibleCount).map((item, index) => (
            <BookItem key={item.isbn13} item={item} index={index} />
          ))}
        </ul>
        {visibleCount < categoryList.length && (
          <div className="text-center mb-12  ">
            <button
              className="border rounded-xl text-3xl p-3 bg-indigo-600 hover:bg-indigo-500"
              onClick={handleLodaMore}
            >
              더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
