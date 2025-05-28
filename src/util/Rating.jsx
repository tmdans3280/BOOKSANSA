import { useState } from "react";

export default function StarRating({ totalStars = 5, onChange }) {
  const [rating, setRating] = useState(0);         // 실제 선택된 별점
  const [hovered, setHovered] = useState(0);       // 마우스 올린 위치

  const handleClick = (index) => {
    setRating(index);
    if (onChange) onChange(index);                 // 외부 전달용 콜백
  };

  return (
    <div className="flex space-x-1 ">
      {[...Array(totalStars)].map((_, i) => {
        const starIndex = i + 1;
        return (
          <span
            key={i}
            className={`cursor-pointer text-3xl transition 
              ${starIndex <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
