import Rating from "../util/Rating";
import cancel from "../assets/cancel.png";

export default function ReviewModal({ img, title ,onClose }) {
  return (
    // 모달 외부
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40 z-50 flex-col">
      {/* 모달 내부 */}
      <div className="bg-white rounded-xl p-6 w-[90%] max-h-[90vh] overflow-y-auto max-w-[470px] shadow-lg relative ">
        <div className="relative flex justify-between items-center mt-4">
          <div className="font-bold text-3xl absolute  left-1/2 transform -translate-x-1/2 ">
            리뷰 작성
          </div>
          <div onClick={()=>onClose()} className="cursor-pointer ml-auto ">
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
            <Rating />
          </div>
        </div>

        <div className="justify-center flex mt-10 flex-col">
          <p className="text-xl mb-4">리뷰 작성</p>
          <textarea
            className=" border-2 rounded-xl border-gray-300  text-black w-full h-28  resize-none p-4"
            placeholder="리뷰를 작성해주세요."
          ></textarea>
        </div>

        <div className="flex justify-center mt-8 ">
          <button className="border rounded-xl py-4  px-6 text-lg bg-black text-white hover:bg-gray-800 transition">
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
