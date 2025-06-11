import { useState } from "react";

export default function StarRating({
  totalStars = 5,
  rating,
  onChangeRating,
  readOnly = false,
}) {
  const [hovered, setHovered] = useState(0); // 마우스 올린 위치

  const handleClick = (index) => {
    if (!readOnly) {
      onChangeRating(index);
    }
  };

  return (
    <div className="flex space-x-1 ">
      {[...Array(totalStars)].map((_, i) => {
        const starIndex = i + 1;
        return (
          <span
            key={i}
            className={`cursor-pointer text-3xl transition 
              ${
                starIndex <= (hovered || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => !readOnly && setHovered(starIndex)}
            onMouseLeave={() => !readOnly && setHovered(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
