import { useNavigate } from "react-router-dom";
import Rating from "../util/Rating";

export default function BookList({
  thumbnail,
  title,
  authors,
  price,
  datetime,
  publisher,
  contents,
  url,
  sale_price,
  isbn13,
}) {
  const nav = useNavigate();

  return (
    <div
      onClick={() =>
        nav("/bookdetail", {
          state: {
            thumbnail,
            title,
            authors,
            price,
            datetime,
            publisher,
            contents,
            url,
            sale_price,
            isbn13,
          },
        })
      }
      className="relative cursor-pointer text-center w-[150px]"
    >
      <div>
        <img
          className="w-32 h-48 object-cover border border-gray-200 rounded m-auto  "
          src={thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className="mt-4 line-clamp-2 h-[3rem]">{title}</div>
      <div className="flex items-center  mt-1 gap-1 justify-center">
        <Rating />
        <span className="ml-2 text-black text-sm">4.5</span>
      </div>
    </div>
  );
}
