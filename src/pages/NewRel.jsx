import Header from "../layout/Header";
import { useContext } from "react";
import { NewRelContext } from "../context/NewRelContext";
import { useState } from "react";

import BookItem from "../components/BookItem";

export default function NewRel() {
  const basic_visibleCount = 5;

  const { newRelBooks, fetchNewRelBooks } = useContext(NewRelContext);
  const [visibleCount, setVisibleCount] = useState(basic_visibleCount);

  const handleLodaMore = () => {
    setVisibleCount((prev) => prev + basic_visibleCount);
  };

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto mt-8 ">
        <div className="text-4xl text-center border-b-2 pb-12">최신책순위</div>

        <ul className="mt-20 ml-7 ">
          {newRelBooks.slice(0, visibleCount).map((item, index) => (
            <BookItem key={item.isbn} item={item} index={index} />
          ))}
        </ul>
        {visibleCount < newRelBooks.length && (
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
