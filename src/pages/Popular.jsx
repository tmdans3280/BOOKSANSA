import Header from "../layout/Header";
import { useContext } from "react";
import { BookContext } from "../context/BookContext";
import Rating from "../util/Rating";

export default function Popular() {
  const { books } = useContext(BookContext);

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
    <div>
      <Header />

      <div className="bg-neutral-900 max-w-7xl mx-auto mt-8 ">
        <div className="text-4xl text-center">인기책순위</div>

        <ul className="mt-20  ">
          {books.map((item, index) => (
            <li key={item.isbn}>
              <div className="flex mb-10 border-b border-gray-700 pb-8">
                <div className="flex">
                  <h4 className="text-4xl mr-7 mt-2">{index + 1}</h4>
                  <img
                    className="mx-auto max-w-[120px] h-auto object-cover"
                    src={item.thumbnail}
                    alt="img"
                  />
                </div>

                <div className="ml-12 gap-2 flex flex-col">
                  <div className="text-xl ">{item.title}</div>
                  <div className="text-sm flex pt-3 ">{`${item.authors} | ${
                    item.publisher
                  } | ${formatDate(new Date(item.datetime))}`}</div>
                  <div className="flex gap-1 ">
                    <div className="line-through text-gray-400 mr-2">{`${item.price}원`}</div>
                    <div> {`${item.sale_price}원`}</div>
                  </div>

                  <div className="flex gap-2 ">
                    <Rating />
                    4.5
                  </div>
                  <div className="line-clamp-2 h-[3rem] w-[800px] mt-5">
                    {item.contents}
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full mt-12 ml-16 ">
                  <button className="inline-block w-40 rounded-xl border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden">
                    찜하기
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-40 rounded-xl border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
                  >
                    구매하기
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
