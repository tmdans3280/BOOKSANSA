import { useState, useEffect } from "react";
import Header from "../layout/Header";
import { useFavorites } from "../context/FavoriteContext";
import { fetchBookByIsbn } from "../util/kakao";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import FavoriteButton from "../components/FavoriteButton";
import { useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { Navigation } from "swiper/modules";
import { getReviewByUserId } from "../util/review";
import Rating from "../util/Rating";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const { favoriteBooks, isLoading } = useFavorites();
  const [bookList, setBookList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const results = await Promise.all(
        favoriteBooks
          .slice(0, 4)
          .map((isbn) => fetchBookByIsbn(isbn.split(" ").pop()))
      );
      setBookList(results.filter(Boolean)); // null 제거
    };
    if (favoriteBooks.length > 0) {
      fetchBooks();
    }
  }, [favoriteBooks]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const reviewSnapshot = await getDocs(getReviewByUserId(user.uid));
        const reviewData = reviewSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviewList(reviewData);
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="bg-white max-w-[1200px] border-l-2 border-r-2 mx-auto">
      <Header />

      <div className="">
        <div className="text-4xl mt-8 text-center">내가 찜한책</div>

        <div className="mt-20 w-full">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              640: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {bookList.map((book) => (
              <SwiperSlide>
                <div
                  onClick={() =>
                    nav("/bookdetail", {
                      state: {
                        ...book,
                      },
                    })
                  }
                  key={book.isbn}
                  className=" h-[224px] rounded-xl border-gray-400 border p-4 flex cursor-pointer"
                >
                  <img
                    src={book.thumbnail.replace("R120x174", "R300x400")}
                    alt="thumbnail"
                    className="w-32 h-auto object-cover border border-gray-200 rounded "
                  />
                  <div className="flex-col">
                    <div className="ml-4">
                      <div className="font-bold mt-4">{book.title}</div>
                      <div className="text-sm mt-4">{book.authors}</div>
                      <div className="text-sm mt-1">{book.publisher}</div>
                    </div>
                    <div className="ml-6 mt-6">
                      <FavoriteButton book={book} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div>
        <div>내가 쓴 리뷰</div>
        <div>
          {reviewList.map((review, index) => (
            <div key={review.userId + index}>
              <div>{review.content}</div>
              <div>
                <Rating rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
