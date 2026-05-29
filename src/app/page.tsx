import Newest from "./components/Newest";
import Videos from "./components/Videos";
import NewsList from "./components/NewsList";
import HeroSlider from "./components/HeroSlider";
import MobileGames from "./components/MobileGames";
import { ScrapedData } from "@/types/mainPageTypes";
import BackToTopBtn from "@/_components/BackToTopBtn";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/scrape-main`,
  );
  const result = await res.json();

  if (result.success) {
    const data: ScrapedData = result.data;

    return (
      <div className="lg:max-w-5xl lg:mx-auto *:my-5">
        <BackToTopBtn />
        <HeroSlider slides={data?.slides} />
        <Newest games={data?.games} />
        <NewsList news={data?.news} iranGamesNews={data?.iranGameNews} />
        <Videos videos={data.videos} />
        <MobileGames mobileGames={data?.mobileGames} />
      </div>
    );
  }
}
