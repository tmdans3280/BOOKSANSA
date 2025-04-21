import { useLocation } from "react-router-dom";
import Header from "../layout/Header";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function BookDetail() {
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
    sale_price,
  } = state;

  const formatDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let day = targetDate.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <>
      <Header />

      <div className="flex flex-col xl:flex-row bg-black mt-12 pb-24 text-white rounded-xl w-full max-w-5xl p-10 mx-auto gap-10 ">
        {/* 왼쪽 - 책 이미지 */}
        <div className="w-full  xl:w-1/3 flex justify-center relative">
          <img
            className="w-3/4 h-auto rounded shadow-lg"
            src={thumbnail.replace("R120x174", "R300x400")}
            alt="thumbnail"
          />
          <div className="top-full absolute flex gap-8 mt-4 justify-center">
            <button className="inline-block w-36 rounded-xl border border-indigo-600 bg-indigo-600  text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden">
              찜하기
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-34 rounded-xl border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
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

          <div>
            <p className="text-yellow-400">⭐️ 리뷰 점수 (예: 4.5)</p>
          </div>

          <div className="text-lg">
            <span className="line-through text-gray-400 mr-2">{price}원</span>
            <span className="text-red-400 font-semibold">{sale_price}원</span>
          </div>

          <div className="text-sm space-y-2">
            <div className="font-semibold">📘 요약글</div>
            <p className="text-gray-300">
              {contents.length > 100 ? contents + "..." : contents}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline text-sm inline-block mt-2 hover:text-blue-300"
            >
              더보기 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
