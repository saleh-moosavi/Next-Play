import Header from "./components/Header";
import Newest from "./components/Newest";
import Reviews from "./components/Reviews";
import Trailers from "./components/Trailers";
import Articles from "./components/Articles";
import BackToTopBtn from "@/_components/BackToTopBtn";

export default function Home() {
  return (
    <div className="lg:max-w-5xl lg:mx-auto">
      <BackToTopBtn />
      <Header />
      <Newest />
      <Articles />
      <Reviews />
      <Trailers />
    </div>
  );
}
