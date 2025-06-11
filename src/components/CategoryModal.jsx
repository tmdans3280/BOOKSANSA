const categories = [
  {
    title: "🎨 문학 / 인문",
    items: ["소설", "시/에세이", "인문학", "역사/문화"],
  },
  {
    title: "📘 자기계발 / 실용",
    items: ["자기계발", "경제/경영", "투자/부동산", "요리/생활/건강", "여행"],
  },
  {
    title: "🧠 학습 / 전문",
    items: ["외국어", "수험서/자격증", "컴퓨터/IT", "과학/수학", "철학/사회"],
  },
  {
    title: "👪 라이프스타일 / 취미",
    items: ["육아/교육", "패션/뷰티", "취미/공예", "반려동물"],
  },
  {
    title: "🧒 어린이/청소년",
    items: ["유아 그림책", "어린이 동화", "청소년 소설"],
  },
];

export default function CategoryModal() {
  return (
    <div className="flex space-x-20 bg-red-50 mt-4 z-50 h-[230px] text-center justify-center pt-4">
      {categories.map((category) => (
        <div key={category.title}>
          <div className="font-bold text-lg mb-4">{category.title}</div>
          <div className="space-y-2 text-sm">
            {category.items.map((item) => (
              <div key={item} className="cursor-pointer hover:text-blue-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
