import Header from "./components/Header";
import Newest from "./components/Newest";
import Reviews from "./components/Reviews";
import Trailers from "./components/Trailers";
import Articles from "./components/Articles";
import { ScrapedData } from "@/types/mainPageTypes";
import BackToTopBtn from "@/_components/BackToTopBtn";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/scrape-main`,
  );
  const result = await res.json();

  if (result.success) {
    const data: ScrapedData = result.data;

    return (
      <div className="lg:max-w-5xl lg:mx-auto">
        <BackToTopBtn />
        <Header slides={data?.slides} />
        <Newest games={data?.games} />
        <Articles
          comingSoon={data?.comingSoon}
          androidGames={data?.mobileGames}
        />
        <Reviews news={data?.news} />
        <Trailers videos={data?.videos} />
      </div>
    );
  }
}
