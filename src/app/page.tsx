import Newest from "./components/Newest";
import Videos from "./components/Videos";
import NewsList from "./components/NewsList";
import HeroSlider from "./components/HeroSlider";
import MobileGames from "./components/MobileGames";
import { ScrapedData } from "@/types/mainPageTypes";
import BackToTopBtn from "@/_components/BackToTopBtn";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: Promise<{ page?: string }> | { page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ? parseInt(resolvedParams.page) : 1;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/scrape-main?page=${page}`,
    { cache: "no-store" },
  );
  const result = await res.json();

  if (result.success) {
    const data: ScrapedData = result.data;

    return (
      <div className="lg:max-w-5xl lg:mx-auto *:my-5">
        <BackToTopBtn />
        <HeroSlider slides={data?.slides} />
        <Newest
          games={data?.games}
          currentPage={page}
          pagination={result.pagination}
        />
        <>
          <NewsList news={data?.news} iranGamesNews={data?.iranGameNews} />
          <Videos videos={data.videos} />
          <MobileGames mobileGames={data?.mobileGames} />
        </>
      </div>
    );
  }
}
