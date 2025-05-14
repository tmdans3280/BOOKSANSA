import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Rating() {
  const rating = 4.5;
  const stars = [];

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
    <div className="flex text-yellow-400 text-lg gap-1 ">
      {stars}
    </div>
  );
}
