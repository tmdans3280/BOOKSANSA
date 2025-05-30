import { useLocation } from "react-router-dom";
import Header from "../layout/Header";
import { formatDate } from "../util/formatDate";
import { useContext, useEffect, useState } from "react";
import FavoriteButton from "../components/FavoriteButton";
import { BookListContext } from "../context/BookListContext";
import ReviewModal from "../components/ReviewModal";

export default function BookDetail() {
  const { bookList, fetchBooks } = useContext(BookListContext);
  const [selectModal, setSelectModal] = useState(false);

  const { state } = useLocation();
  const {
    thumbnail,
    title,
    authors,
    publisher,
    price,
    datetime,
    contents,
    url,
    isbn,
    sale_price,
  } = state;

  useEffect(
    () => {
      const keyword = state.title?.split(" ")[0];

      // 키워드가 없거나 너무 짧거나 이미 리스트가 있으면 skip
      if (!keyword || keyword.length < 2 || bookList.length > 0) return;

      fetchBooks({ query: keyword, size: 6 }); // size 줄이기
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchBooks, state.title]
  );

  return (
    <div className="max-w-5xl mx-auto">
      <Header />

      <div className="flex flex-col xl:flex-row  mt-12 pb-24 text-black rounded-xl w-full  p-10 mx-auto gap-10 ">
        {/* 왼쪽 - 책 이미지 */}
        <div className="w-full  xl:w-1/3 flex justify-center relative">
          <img
            className="w-3/4 h-auto rounded shadow-lg"
            src={thumbnail.replace("R120x174", "R300x400")}
            alt="thumbnail"
          />
          <div className="top-full absolute flex gap-8 mt-4 justify-center">
            <FavoriteButton book={state} />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-34 rounded-xl border border-indigo-600 px-12 py-3 text-sm font-medium text-black hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
            >
              구매하기
            </a>
          </div>
        </div>

        {/* 오른쪽 - 책 정보 */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="text-2sm space-y-1">
            <div>저자: {authors}</div>
            <div>출판사: {publisher}</div>
            <div>출간일: {formatDate(new Date(datetime))}</div>
          </div>

          <div className="flex">
            <p className="text-yellow-400">⭐️⭐️⭐️⭐️⭐️ </p>
            <p>리뷰</p>
          </div>

          <div className="text-lg">
            <span className="line-through text-gray-400 mr-2">{price}원</span>
            <span className="text-red-400 font-semibold">{sale_price}원</span>
          </div>

          <div className="text-sm space-y-2">
            <div className="font-semibold pb-2">📘 요약글</div>
            <p className="text-gray-700">
              {contents.length > 100
                ? contents.slice(0, 230) + "..."
                : contents}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline text-sm inline-block mt-2 hover:text-gray-300"
            >
              더보기 →
            </a>
          </div>
        </div>


        
      </div>

      {/* 이책과 비슷한책 */}
      <div className="mt-10 pb-12 mb-12 bg-[#fdf6ee] pt-8  mx-auto rounded-xl">
        <div className="text-center text-3xl font-bold">이책과 비슷한 책</div>

        <ul className="flex justify-center gap-20 mt-12">
          {bookList.length > 0 &&
            bookList
              .filter(
                (book) =>
                  book.isbn !== isbn &&
                  (book.authors.some((author) =>
                    state.authors.includes(author)
                  ) ||
                    book.contents.includes(state.title.split(" ")[0]))
              )
              .slice(0, 4)
              .map((book) => (
                <li key={book.isbn}>
                  <img src={book.thumbnail} alt="" />
                  <div>{book.title}</div>
                  <div>{book.authors}</div>
                </li>
              ))}
        </ul>
      </div>

      {/* 리뷰 */}
      <div className="">
        <button onClick={() => setSelectModal(true)}>리뷰작성</button>
        {selectModal && (
          <ReviewModal
            img={state.thumbnail}
            author={state.authors}
            title={state.title}
            onClose={() => setSelectModal(false)}
          />
        )}
      </div>
    </div>
  );
}
