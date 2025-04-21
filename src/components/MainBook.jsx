import { useContext } from "react";
import { BookContext } from "../context/BookContext";

export default function MainBook() {
  const { books } = useContext(BookContext);

  if (!books || books.length === 0) return null;
  return (
    <div className="flex bg-black mt-12 text-white rounded-xl  w-full max-w-3xl p-20 m-auto">
      <img
        className="w-44 h-auto rounded shadow"
        src={books[0].thumbnail.replace("R120x174", "R300x400")}
        alt="noimg"
      />

      <div className="ml-12 flex flex-col">
        <div className="text-5xl mt-6 font-bold text-center ">
          DISCOVER TODAY'S PICK
        </div>
        <button className="border rounded-md p-2.5 mt-10  border-white hover:bg-white hover:text-black transition">
          More Info
        </button>
      </div>
    </div>
  );
}
