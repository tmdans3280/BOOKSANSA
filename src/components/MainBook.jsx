import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MainBook() {
  const nav = useNavigate();
  const [mainBook, setMainBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v3/search/book?query=혼모노&size=1`,
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
    <div>
      <div className="flex justify-between max-w-[1200px] mx-auto ">
        <div className="flex bg-[#FFF5E9]  h-[450px]  text-black rounded-xl w-full max-w-3xl p-20 ">
          <div className="font-noto text-7xl font-bold">
            BEST SELLER
          </div>
          <div>
            <img
              className="w-72 h-auto rounded-md shadow"
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

        <div className="  w-[250px]  h-[450px]  "></div>
      </div>
    </div>
  );
}
