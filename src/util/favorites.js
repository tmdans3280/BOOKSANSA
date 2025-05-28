import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth } from "../firebase"; // 너의 firebase 설정 경로

const db = getFirestore();

// 찜하기 추가

// 찜하기 추가

export const addFavorite = async (isbn) => {
  const user = auth.currentUser;

  if (!user) throw new Error("로그인된 사용자가 없습니다.");

  const userRef = doc(db, "favorites", user.uid);

  await setDoc(
    userRef,
    {
      bookIds: arrayUnion(isbn),
    },
    { merge: true }
  );
};

//찜하기 삭제

export const removeFavorite = async (isbn) => {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인된 사용자가 없습니다.");

  const userRef = doc(db, "favorites", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    await updateDoc(userRef, {
      bookIds: arrayRemove(isbn),
    });
  }
};
//찜하기 불러오기

export const getFavorite = async () => {
  const user = auth.currentUser;
  console.log("✅ 현재 유저:", user); // 이거 찍어봐
  if (!user) return [];
  const userRef = doc(db, "favorites", user.uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data().bookIds || [] : [];
};


