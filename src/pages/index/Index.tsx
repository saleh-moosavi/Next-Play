import Articles from "./components/Articles";
import Header from "./components/Header";
import Newest from "./components/Newest";
import Reviews from "./components/Reviews";
import Trailers from "./components/Trailers";

export default function Index() {
  return (
    <div className="xl:max-w-5xl xl:mx-auto">
      <Header />
      <Newest />
      <Articles />
      <Reviews />
      <Trailers />
    </div>
  );
}
