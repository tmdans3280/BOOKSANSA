import MainBook from "../components/MainBook";
import Header from "../layout/Header";
import NewReleases from "../components/NewReleases";

export default function Home() {
  return (
    <div className="bg-neutral-900 max-w-7xl mx-auto">
      <Header />
      <MainBook />
      <NewReleases />
    </div>
  );
}
