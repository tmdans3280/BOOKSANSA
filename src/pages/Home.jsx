import MainBook from "../components/MainBook";
import Header from "../layout/Header";
import NewReleases from "../components/NewReleases";
import PopularList from "../components/PopularList";

export default function Home() {
  return (
    <div className="bg-[#FFF5E9] max-w-[1200px]  mx-auto">
      <Header />
      <MainBook />
      <PopularList />
      <NewReleases />
    </div>
  );
}
