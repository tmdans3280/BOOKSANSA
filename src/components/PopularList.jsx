import { useRef, useContext } from "react";
import BookList from "./BookList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PopularContext } from "../context/PopularContex";
import leftarrow from "../assets/left-arrow.png";
import rightarrow from "../assets/right-arrow.png";

export default function PopularList() {
  const swiperRef = useRef(null);
  const { popularBooks, fetchPopularBooks } = useContext(PopularContext);

  return (
    <div className="pt-12">
      <div className="mt-12 mb-12 text-2xl">인기 도서</div>
      {popularBooks.length === 0 ? (
        <p>로딩 중...</p>
      ) : (
        <div className="relative flex">
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <img src={leftarrow} alt="leftarrow" className="w-12 mb-12" />
          </button>
          <Swiper
            className="max-w-5xl  "
            spaceBetween={20}
            slidesPerView={5}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {popularBooks.map((item) => (
              <SwiperSlide key={item.isbn}>
                <BookList {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <img src={rightarrow} alt="rightarrow" className="w-12 mb-12" />
          </button>
        </div>
      )}
    </div>
  );
}
