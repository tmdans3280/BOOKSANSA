import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";

export default function Home() {
  const [bookSearch, setBookSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [inputState, setInputState] = useState(false);
  const inputRef = useRef(null);

  const nav = useNavigate();

  const onChangeInput = (e) => {
    setBookSearch(e.target.value);
    setInputState(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bookSearch.trim()) {
        try {
          const res = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${bookSearch}&size=10`,
            {
              headers: {
                Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
              },
            }
          );
          const data = await res.json();
          setSearchList(data.documents);

          setTimeout(() => {}, 300);
        } catch (err) {
          console.log("error발생");
        }
      } else {
        setSearchList([]);
      }
    };
    fetchData();
  }, [bookSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setInputState(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex text-white mt-12 pb-10 border-b border-gray-700  justify-between max-w-7xl mx-auto">
        <div
          onClick={() => nav("/")}
          className=" items-center text-4xl ml-10 shadow-md cursor-pointer"
        >
          BOOKSANSA
        </div>

        <div ref={inputRef} className="flex flex-col relative">
          <div className="flex  gap-4 text-center relative  ">
            <input
              className="text-black rounded-xl p-6 h-10 w-96 max-w-[600px] text-center z-0"
              value={bookSearch}
              onChange={onChangeInput}
              placeholder="검색어를 입력하세요"
              type="text"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 pr-2 text-gray-400 ">
              <FaSearch className=" w-5 h-5" />
            </button>
          </div>

          {inputState && bookSearch.length > 0 && (
            <ul className="absolute top-full  mt-6 w-[700px] bg-gray-500 text-white rounded-lg shadow-lg z-50 max-h-[401.4px] overflow-y-auto ">
              {searchList.map((item) => (
                <li
                  key={item.isbn}
                  className="flex gap-4 items-center border-b border-gray-700 p-5 hover:bg-neutral-700 cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    className="w-16 h-auto object-cover"
                  />
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-700">
                      {item.authors?.join(", ")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <menu className="flex items-center  space-x-14 cursor-pointer">
          <div className="hover:text-red-400">Popular</div>
          <div className="hover:text-red-400">New Releases</div>
          <div className="hover:text-red-400">Genres</div>
          <div className="hover:text-red-400">My books</div>
        </menu>
      </div>
      <div className="flex flex-col relative"></div>
    </>
  );
}
