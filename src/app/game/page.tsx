import { Metadata } from "next";
import Links from "./_components/Links";
import { notFound } from "next/navigation";
import MetaInfo from "./_components/MetaInfo";
import Simillar from "./_components/Simillar";
import DetailOS from "./_components/DetailOS";
import Description from "./_components/Description";
import { GameDataResponse } from "@/types/gamePageTypes";

async function fetchGameData(slug: string): Promise<GameDataResponse | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/api/game-data?url=${slug}`;

    const response = await fetch(apiUrl, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("خطا در fetchGameData:", error);
    return null;
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }> | { slug?: string };
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "بازی | Next Play",
      description: "مشاهده اطلاعات کامل بازی",
    };
  }

  const data = await fetchGameData(slug);

  if (!data?.success) {
    return {
      title: "بازی | Next Play",
      description: "مشاهده اطلاعات کامل بازی",
    };
  }

  return {
    title: data.currentGame.title,
    description: data.currentGame.metaDescription,
    openGraph: {
      title: data.currentGame.title,
      description: data.currentGame.metaDescription,
      images: data.currentGame.imageUrl ? [data.currentGame.imageUrl] : [],
    },
  };
}

export default async function GamePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }> | { slug?: string };
}) {
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const data = await fetchGameData(slug);

  if (!data?.success) {
    throw new Error("مشکلی در دریافت اطلاعات پیش آمده");
  }

  const { currentGame, similarGames } = data;

  if (!currentGame) {
    notFound();
  }

  return (
    <section className="p-5 lg:p-0 space-y-5">
      <MetaInfo currentGame={currentGame} />
      <Description currentGame={currentGame} />
      <DetailOS currentGame={currentGame} />
      <Links currentGame={currentGame} />
      <Simillar similarGames={similarGames} />
    </section>
  );
}
