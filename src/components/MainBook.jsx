import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MainBook() {
  const nav = useNavigate();
  const [mainBook, setMainBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const keywords = ["혼모노", "첫여름,완주", "청춘의 독서"];

      try {
        const books = await Promise.all(
          keywords.map((kw) =>
            fetch(
              `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
                kw
              )}&size=1`,
              {
                headers: {
                  Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
                },
              }
            )
              .then((res) => res.json())
              .then((data) => data.documents[0])
          )
        );
        setMainBook(books);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  if (mainBook.length < 3) return null;
  return (
    <div>
      <div className="flex  max-w-[1200px] mx-auto ">
        <div className="flex justify-between bg-[#FFF5E9]  h-[450px]  text-black rounded-xl w-full  p-20 ">
          <div className="font-noto text-7xl font-bold ">
            <div>BEST</div>
            <div className="pt-6">SELLER</div>
          </div>
          {mainBook.map((book, index) => (
            <div key={index}>
              <img
                className="w-60 h-auto rounded-md shadow"
                src={mainBook[index].thumbnail.replace("R120x174", "R300x400")}
                alt="noimg"
                onClick={() =>
                  nav("/bookdetail", {
                    state: { ...mainBook[index] },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
