// src/pages/Login.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      localStorage.setItem("user", email); //   로그인 상태 저장
      navigate("/"); // 메인페이지로 이동
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">BOOKSANSA</h2>
        <input
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
        />
        <input
          className="border p-2 rounded w-full mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
