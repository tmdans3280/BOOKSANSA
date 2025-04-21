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
          },
        })
      }
      className="relative z-10 overflow-visible"
    >
      <div className="relative cursor-pointer group text-center">
        <div>
          <img
            className="mx-auto max-w-[120px] h-auto object-contain "
            src={thumbnail}
            alt="thumbnail"
          />
        </div>
        <div className="mt-4 line-clamp-2 h-[3rem]">{title}</div>
        <div className="flex items-center  mt-1 gap-1 justify-center">
          <Rating />
          <span className="ml-2 text-white text-sm">4.5</span>
        </div>
      </div>
    </div>
  );
}
