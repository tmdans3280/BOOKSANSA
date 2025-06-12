import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
import logo from "../assets/logo.png";
import menuicon from "../assets/menuicon.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CategoryModal from "../components/categoryModal";
import cancel from "../assets/cancel.png";

export default function Header() {
  const [bookSearch, setBookSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [inputState, setInputState] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [categoryState, setCategoryState] = useState(false);
  const inputRef = useRef(null);

  const nav = useNavigate();

  const onChangeInput = (e) => {
    setBookSearch(e.target.value);
    setInputState(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bookSearch.trim()) {
        try {
          const res = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${bookSearch}&size=10`,
            {
              headers: {
                Authorization: "KakaoAK f53a840709749b9c7fa887e5ccfbd374",
              },
            }
          );
          const data = await res.json();
          setSearchList(data.documents);

          setTimeout(() => {}, 300);
        } catch (err) {
          console.log("error발생", err);
        }
      } else {
        setSearchList([]);
      }
    };
    fetchData();
  }, [bookSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setInputState(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setIsLogin(false);
      nav("/");
    });
  };

  return (
    <div className="flex flex-col text-black pb-4 border-b border-gray-700  justify-between max-w-7xl mx-auto">
      {/* 로그인 회원가입  */}
      <div className="flex justify-end text-sm  mt-6 mb-2 mr-4">
        {isLogin ? (
          <Link to={"/"} onClick={handleLogout} className="hover:text-red-400">
            로그아웃
          </Link>
        ) : (
          <>
            <Link to="/login" className="hover:text-red-400">
              로그인
            </Link>
            <span className="mx-2 text-gray-500">|</span>
            <Link to="/signup" className="hover:text-red-400">
              회원가입
            </Link>
          </>
        )}
      </div>

      {/*로고 + 검색창 +메뉴들  */}
      <div className="flex items-center  mt-2">
        {/* 로고 */}
        <div
          onClick={() => nav("/")}
          className=" items-center text-4xl ml-20 shadow-md cursor-pointer "
        >
          <img src={logo} alt="logo" className="w-24" />
        </div>

        {/* 검색창 */}
        <div ref={inputRef} className="flex flex-col relative  ml-16">
          <div className="flex  gap-4 text-center relative  ">
            <input
              className="text-black border-black border-2 rounded-xl p-6 h-10 w-96 max-w-[600px]  z-0 "
              value={bookSearch}
              onChange={onChangeInput}
              placeholder="검색어를 입력하세요."
              type="text"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 pr-2 text-gray-400 ">
              <FaSearch className=" w-5 h-5" />
            </button>
          </div>

          {inputState && bookSearch.length > 0 && (
            <ul className="absolute top-full  mt-6 w-[700px] bg-gray-500 text-white rounded-lg shadow-lg z-50 max-h-[401.4px] overflow-y-auto ">
              {searchList.map((item) => (
                <li
                  onClick={() =>
                    nav("/bookdetail", {
                      state: {
                        thumbnail: item.thumbnail,
                        title: item.title,
                        authors: item.authors,
                        price: item.price,
                        datetime: item.datetime,
                        publisher: item.publisher,
                        contents: item.contents,
                        url: item.url,
                        sale: item.sale_price,
                      },
                    })
                  }
                  key={item.isbn}
                  className="flex gap-4 items-center border-b border-gray-700 p-5 hover:bg-neutral-700 cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    className="w-16 h-auto object-cover"
                  />
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-700">
                      {item.authors?.join(", ")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 메뉴바 */}
      <div className="flex justify-between items-center mt-8 relative ">
        {/* 카테고리 */}
        <div className="flex flex-col ">
          <div
            onClick={() => {
              setCategoryState((prev) => !prev);
            }}
            className=" cursor-pointer"
          >
            {categoryState ? (
              <img src={cancel} alt="cancel" className="w-12 " />
            ) : (
              <img src={menuicon} alt="menuicon" className="w-8 " />
            )}
          </div>

          <div className="absolute w-[1196px] top-full z-50   ">
            {categoryState && <CategoryModal />}
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="flex cursor-pointer ">
          <div className="flex gap-24 text-xl">
            <div onClick={() => nav("/popular")} className="hover:text-red-400">
              인기 도서
            </div>
            <div onClick={() => nav("/newrel")} className="hover:text-red-400">
              신간 도서
            </div>
            <div className="hover:text-red-400">장르별 보기</div>
            <div className="hover:text-red-400">이벤트</div>
          </div>
        </nav>

        {/* 내 서재 */}
        <div
          onClick={() => {
            isLogin ? nav("/mypage") : nav("/login");
          }}
          className="hover:text-red-400 flex mr-6 "
        >
          내 서재
        </div>
      </div>
    </div>
  );
}
