import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import { AllMobileGame, AllMobileGamesResponse } from "@/types/mobileGameTypes";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");

    if (page < 1) {
      return NextResponse.json(
        { error: "Page must be greater than 0" },
        { status: 400 },
      );
    }

    const url =
      page === 1
        ? `${process.env.SCRAPE_TARGET}/phone/`
        : `${process.env.SCRAPE_TARGET}/phone/page/${page}/`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page: ${response.status}` },
        { status: response.status },
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const games: AllMobileGame[] = [];

    $("#archive-entries article.mobile-game-post").each((_, element) => {
      const article = $(element);

      const linkElement = article.find("a").first();
      const link = linkElement.attr("href") || "";
      const slug = link.split("/").filter(Boolean).pop() || "";

      const titleElement = article.find("h2 a");
      const title = titleElement.text().trim() || "";

      const imgElement = article.find("img");
      const iconUrl = imgElement.attr("src") || "";

      const timeElement = article.find("footer time");
      const date = timeElement.text().trim() || "";

      let ratingPercent = 0;
      const rateElement = article.find(".star .rate");
      if (rateElement.length > 0) {
        const style = rateElement.attr("style") || "";
        const widthMatch = style.match(/width:\s*(\d+)%/);
        if (widthMatch) {
          ratingPercent = parseInt(widthMatch[1]);
        }
      }

      games.push({
        title,
        iconUrl,
        slug,
        date,
        ratingPercent,
        link,
      });
    });

    let hasMore = false;
    let nextPage: number | null = null;

    const loadMoreElement = $(".loadmore a");
    if (loadMoreElement.length > 0) {
      const href = loadMoreElement.attr("href") || "";
      const nextPageMatch = href.match(/\/page\/(\d+)\//);
      if (nextPageMatch) {
        nextPage = parseInt(nextPageMatch[1]);
        hasMore = true;
      } else {
        hasMore = true;
        nextPage = page + 1;
      }
    }

    const result: AllMobileGamesResponse = {
      games,
      hasMore,
      nextPage: hasMore ? nextPage : null,
      currentPage: page,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in mobile games scraping route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
