import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BookList({
  thumbnail,
  title,
  authors,
  price,
  datetime,
  publisher,
  contents,
  url,
  sale,
}) {
  const rating = 4.5;

  const stars = [];
  const nav = useNavigate();

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
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
            sale,
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
        <div className="flex items-center  mt-1 gap-1 text-yellow-400 text-lg justify-center">
          {stars}
          <span className="ml-2 text-white text-sm">{rating}</span>
        </div>
      </div>
    </div>
  );
}
