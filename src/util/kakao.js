// src/api/kakao.js
export const fetchBookByIsbn = async (isbn) => {
  try {
    const res = await fetch(
      `https://dapi.kakao.com/v3/search/book?target=isbn&query=${isbn}`,
      {
        headers: {
          Authorization: `KakaoAK f53a840709749b9c7fa887e5ccfbd374`,
        },
      }
    );
    const data = await res.json();
    return data.documents[0]; // 가장 첫 번째 책 정보 반환
  } catch (err) {
    console.error("책 정보 불러오기 실패:", err);
    return null;
  }
};
