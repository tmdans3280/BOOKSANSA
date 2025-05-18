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
  isbn,
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
            isbn,
          },
        })
      }
      className="relative cursor-pointer text-center w-[300px]"
    >
      <div>
        <img
          className="w-50 h-64 object-cover border border-gray-200 rounded m-auto  "
          src={thumbnail.replace("R120x174", "R300x400")}
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
