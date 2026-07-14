import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import { AllTrailers, AllTrailersResponse } from "@/types/trailerTypes";

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
        ? `${process.env.SCRAPE_TARGET}/videos/`
        : `${process.env.SCRAPE_TARGET}/videos/page/${page}/`;

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

    const videos: AllTrailers[] = [];

    $("div#archive-entries article.video-box-post").each((_, element) => {
      const article = $(element);
      const linkElement = article.find("a").first();
      const link = linkElement.attr("href") || "";
      const slug = link.split("/").filter(Boolean).pop() || "";

      const title = linkElement.find("h2").text().trim() || "";

      const imgElement = article.find(".pic img");
      const imageUrl = imgElement.attr("src") || "";

      const durationElement = article.find(".pic span");
      const duration = durationElement.text().trim() || "";

      const spanElement = article.find("span").last();
      const spanText = spanElement.text().trim();

      let author = "";
      let date = "";

      const authorMatch = spanText.match(
        /[\u0600-\u06FF\s]+?(?=\s*[\u0600-\u06FF]+\s+\d{1,2}م\s+[\u0600-\u06FF]+\s+\d{4})/,
      );
      if (authorMatch) {
        author = authorMatch[0].trim();
      }

      const dateMatch = spanText.match(
        /[\u0600-\u06FF]+\s+\d{1,2}م\s+[\u0600-\u06FF]+\s+\d{4}/,
      );
      if (dateMatch) {
        date = dateMatch[0].trim();
      }

      videos.push({
        title,
        imageUrl,
        duration,
        slug,
        author,
        date,
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

    const result: AllTrailersResponse = {
      videos,
      hasMore,
      nextPage: hasMore ? nextPage : null,
      currentPage: page,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in videos scraping route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
