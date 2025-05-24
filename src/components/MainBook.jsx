import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MainBook() {
  const nav = useNavigate();
  const [mainBook, setMainBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v3/search/book?query=개발자&size=1`,
          {
            headers: {
              Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
            },
          }
        );
        const data = await res.json();
        setMainBook(data.documents);
      } catch (err) {
        console.error("🔥 mainbook 불러오기 실패:", err);
      }
    };

    fetchBooks();
  }, []);

  if (!mainBook || mainBook.length === 0) return null;
  return (
    <div className="flex-col h-[450px] bg-[#fef9f3] mt-12 text-black rounded-xl  w-full max-w-3xl p-20 mx-auto">
      <h2 className="text-5xl mt-6 font-bold text-center ">TODAY'S PICK</h2>
      <div className="flex">
        <div>
          <img
            className="w-48 h-auto rounded-xl shadow"
            src={mainBook[0].thumbnail.replace("R120x174", "R300x400")}
            alt="noimg"
          />
        </div>

        <div className="ml-12 flex flex-col">
          <button
            onClick={() =>
              nav("/bookdetail", {
                state: { ...mainBook[0] },
              })
            }
            className="border rounded-md p-2.5 mt-10  border-white hover:bg-white hover:text-black transition"
          >
            더보기
          </button>
        </div>
      </div>
    </div>
  );
}
