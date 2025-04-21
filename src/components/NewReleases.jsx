import { useContext, useRef } from "react";
import { BookContext } from "../context/BookContext";
import BookList from "./BookList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaChevronLeft } from "react-icons/fa";

export default function NewReleases() {
  const { books, setBooks } = useContext(BookContext);
  const swiperRef = useRef(null);

  return (
    <div>
      <div className="mt-12 mb-12 ml-16 text-2xl">New Releases</div>
      {books.length === 0 ? (
        <p>로딩 중...</p>
      ) : (
        <div className="relative ">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/3  transform -translate-y-1/2 ml-16 text-black rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <Swiper
            className="max-w-4xl  "
            spaceBetween={20}
            slidesPerView={5}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {books.map((item) => (
              <SwiperSlide key={item.isbn}>
                <BookList {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/3 right-0 transform -translate-y-1/2 mr-16 text-black rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5L15.75 12l-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
