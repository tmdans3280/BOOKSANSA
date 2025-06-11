import Rating from "../util/Rating";
import cancel from "../assets/cancel.png";
import { addReview } from "../util/review";
import { useState } from "react";
import { auth } from "../firebase";
export default function ReviewModal({ img, title, onClose, bookId }) {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    content: "",
  });

  const onChangeRating = (value) => {
    setReviewData((prev) => ({ ...prev, rating: value }));
  };

  const onChangeReview = (e) => {
    setReviewData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSubmit = async () => {
    const { rating, content } = reviewData;

    if (rating === 0 || !content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await addReview({
        userId: currentUser.uid,
        bookId,
        rating,
        content,
      });
      alert("리뷰가 등록되었습니다.");
      onClose();
    } catch (error) {
      alert("리뷰 저장 실패");
      console.error(error);
    }
  };

  return (
    // 모달 외부
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40 z-50 flex-col">
      {/* 모달 내부 */}
      <div className="bg-white rounded-xl p-6 w-[90%] max-h-[90vh] overflow-y-auto max-w-[470px] shadow-lg relative ">
        <div className="relative flex justify-between items-center mt-4">
          <div className="font-bold text-3xl absolute  left-1/2 transform -translate-x-1/2 ">
            리뷰 작성
          </div>
          <div onClick={() => onClose()} className="cursor-pointer ml-auto ">
            <img src={cancel} alt="cancelimg" />
          </div>
        </div>

        {/* 책 내용 */}
        <div className="text-center pt-6 border-2 rounded-xl border-gray-300 p-4 mt-10  ">
          <img
            className="w-32 h-auto object-cover border border-gray-200 rounded m-auto shadow-sm "
            src={img}
            alt="bookimg"
          />

          <div className="mt-2">{title}</div>
          <div className="mt-2 flex justify-center    ">
            <Rating
              rating={reviewData.rating}
              onChangeRating={onChangeRating}
            />
          </div>
        </div>

        <div className="justify-center flex mt-10 flex-col">
          <p className="text-xl mb-4">리뷰 작성</p>
          <textarea
            value={reviewData.content}
            onChange={onChangeReview}
            className=" border-2 rounded-xl border-gray-300  text-black w-full h-28  resize-none p-4"
            placeholder="리뷰를 작성해주세요."
          ></textarea>
        </div>

        <div className="flex justify-center mt-8 ">
          <button
            onClick={handleSubmit}
            className="border rounded-xl py-4  px-6 text-lg bg-black text-white hover:bg-gray-800 transition"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
