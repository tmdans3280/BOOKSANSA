export function formatDate(targetDate) {
  if (!targetDate) return "";

  // Firestore Timestamp인 경우
  if (typeof targetDate.toDate === "function") {
    targetDate = targetDate.toDate();
  }

  // 문자열인 경우
  if (typeof targetDate === "string") {
    targetDate = new Date(targetDate);
  }

  // Date 객체가 아닌 경우
  if (!(targetDate instanceof Date) || isNaN(targetDate)) {
    return "";
  }

  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let day = targetDate.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}년 ${month}월 ${day}일`;
}
