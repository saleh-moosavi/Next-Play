import { Metadata } from "next";
import Links from "./_components/Links";
import { notFound } from "next/navigation";
import Details from "./_components/Details";
import Simillar from "./_components/Simillar";
import MetaInfo from "./_components/MetaInfo";

async function fetchMobileGameData(slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/api/mobile-game-data?url=${slug}`;

    const response = await fetch(apiUrl, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
    }

    const data = await response.json();
    if (!data?.success || !data.data) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.error("خطا در fetchMobileGameData:", error);
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
      title: "دانلود بازی اندروید | Next Play",
      description: "دانلود جدیدترین بازی‌های اندروید با لینک مستقیم",
    };
  }

  const gameData = await fetchMobileGameData(slug);

  if (!gameData) {
    return {
      title: "بازی اندروید | Next Play",
      description: "مشاهده اطلاعات کامل بازی اندروید",
    };
  }

  const { currentGame } = gameData;

  return {
    title: `دانلود بازی ${currentGame.title} برای اندروید | Next Play`,
    description:
      currentGame.metaDescription ||
      `دانلود بازی ${currentGame.title} برای اندروید با لینک مستقیم و حجم ${currentGame.metaInfo.size}`,
    keywords: `${currentGame.title}, دانلود بازی اندروید, بازی موبایل, ${currentGame.mobileInfo.genre}, ${currentGame.mobileInfo.developer}`,
    openGraph: {
      title: `دانلود بازی ${currentGame.title} برای اندروید`,
      description:
        currentGame.metaDescription ||
        `دانلود بازی ${currentGame.title} با حجم ${currentGame.metaInfo.size} و نسخه ${currentGame.mobileInfo.version}`,
      images: currentGame.imageUrl ? [currentGame.imageUrl] : [],
      type: "website",
      locale: "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title: `دانلود بازی ${currentGame.title}`,
      description: currentGame.metaDescription || "",
      images: currentGame.imageUrl ? [currentGame.imageUrl] : [],
    },
    alternates: {
      canonical: `https://yourdomain.com/mobile-game?slug=${slug}`,
    },
  };
}

export default async function MobileGamePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }> | { slug?: string };
}) {
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const gameData = await fetchMobileGameData(slug);

  if (!gameData) {
    throw new Error("مشکلی در دریافت اطلاعات بازی پیش آمده است");
  }

  const { currentGame, similarGames } = gameData;

  if (!currentGame) {
    notFound();
  }

  return (
    <div className="min-h-screen space-y-5">
      <MetaInfo game={currentGame} />

      <Details game={currentGame} />
      <Links game={currentGame} />

      <div className="container mx-auto px-4 py-8">
        <Simillar similarGames={similarGames} />
      </div>
    </div>
  );
}
