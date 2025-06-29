import MainBook from "../components/MainBook";
import Header from "../layout/Header";
import NewReleases from "../components/NewReleases";
import PopularList from "../components/PopularList";

export default function Home() {
  return (
    <div className="mx-auto">
      <Header />
      <MainBook />
      <PopularList />
      <NewReleases />
    </div>
  );
}
