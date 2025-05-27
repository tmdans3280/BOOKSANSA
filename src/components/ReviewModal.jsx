import Rating from "../util/Rating";

export default function ReviewModal({ img, title }) {
  return (
    // 모달 외부
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40 z-50 flex-col">
      {/* 모달 내부 */}
      <div className="bg-white rounded-xl p-6 w-[90%] max-h-[90vh] overflow-y-auto max-w-md shadow-lg relative">
        {/* 책 내용 */}
        <div className="text-center">
          <img className="w-32 h-auto object-cover border border-gray-200 rounded m-auto" src={img} alt="bookimg" />

          <div className="mt-2">{title}</div>
        </div>

        <div className="mt-12"><Rating /></div>
        <textarea
          className="border rounded-lg text-black"
          name="리뷰를 작성해주세요."
        ></textarea>
      </div>
    </div>
  );
}
