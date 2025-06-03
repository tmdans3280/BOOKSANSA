// firebase에서 초기화된 db 인스턴스를 가져옴
import { db } from "../firebase";

// Firestore 함수들 불러오기
import {
  collection,
  addDoc,
  updateDoc,
  query,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const reviewCollection = collection(db, "reviews");

export const addReview = async ({ userId, bookId, rating, content }) => {
  try {
    const docRef = await addDoc(reviewCollection, {
      userId,
      bookId,
      rating,
      content,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("리뷰 추가 실패:", error);
    throw error;
  }
};

export const updateReview = async (reviewId, updatedData) => {
  try {
    const updateRef = doc(db, "reviews", reviewId);

    await updateDoc(updateRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const readReview = () => {
  return query(reviewCollection);
};
