import { SearchResult } from "@/types/searchPageTypes";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchedText = searchParams.get("text");
    const page = searchParams.get("page") || "1";

    if (!searchedText) {
      return NextResponse.json(
        {
          success: false,
          error: "لطفاً پارامتر text را وارد کنید",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      process.env.SCRAPE_TARGET +
        `/page/${page}/?s=${encodeURIComponent(searchedText)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت صفحه: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const results: SearchResult[] = [];

    $("article.post").each((_, element) => {
      const $article = $(element);

      const $titleLink = $article.find("header h2 a");
      const title = $titleLink.text().trim();
      const url = $titleLink.attr("href");

      const $image = $article.find("img.game-thumb, img.wp-post-image");
      const imageUrl = $image.attr("src");

      const $span = $article.find("span");
      const spanText = $span.text();

      const authorMatch = spanText.match(/<em>(.*?)<\/em>/);
      const author = authorMatch
        ? authorMatch[1]
        : $span.find("em").text().trim() || "ناشناس";

      const dateMatch = spanText.match(/(\d{1,2}\s+\w+\s+\d{4})/);
      const date = dateMatch
        ? dateMatch[1]
        : $span.text().match(/(\d{1,2}\s+\w+\s+\d{4})/)?.[1] || "";

      const viewsMatch = spanText.match(/([\d,]+)\s*بازدید/);
      const views = viewsMatch ? viewsMatch[1].replace(/,/g, "") : "0";

      const $excerpt = $article.find("p");
      let excerpt = "";
      if ($excerpt.length > 0) {
        $excerpt.each((_, p) => {
          const text = $(p).text().trim();
          if (text.length > 20 && !text.includes("دانلود بازی")) {
            excerpt = text;
            return false;
          }
        });
      }
      if (!excerpt) {
        excerpt = $article.find("p:first").text().trim();
      }
      if (excerpt.length > 200) {
        excerpt = excerpt.substring(0, 200) + "...";
      }

      let type: SearchResult["type"] = "unknown";

      if ($article.find("i.pst-icn.icon-newspaper").length > 0) {
        type = "news";
      } else if (
        $article.find("i.pst-icn.icon-video-player, i.pst-icn.icon-clapper")
          .length > 0
      ) {
        type = "trailer";
      } else if ($article.find("i.pst-icn.icon-mobile-game").length > 0) {
        type = "mobile";
      } else if (
        $article.hasClass("icon-playstation") ||
        $article.hasClass("icon-steam") ||
        $article.hasClass("icon-xbox")
      ) {
        type = "game";
      } else {
        const hasGameDetails = $article.find("ul li").length > 0;
        if (hasGameDetails) {
          type = "game";
        } else {
          type = "unknown";
        }
      }

      const details: SearchResult["details"] = {};
      $article.find("ul li").each((_, li) => {
        const text = $(li).text().trim();
        if (text.includes("تاریخ انتشار")) {
          details.releaseDate = text.replace("تاریخ انتشار :", "").trim();
        } else if (text.includes("سبک")) {
          details.genre = text.replace("سبک :", "").trim();
        } else if (text.includes("حجم")) {
          details.size = text.replace("حجم :", "").trim();
        } else if (text.includes("زبان")) {
          details.language = text.replace("زبان :", "").trim();
        }
      });

      if (Object.keys(details).length > 0 && type === "unknown") {
        type = "game";
      }

      results.push({
        title,
        url: url || "",
        imageUrl,
        author,
        date,
        views,
        excerpt,
        type,
        details: Object.keys(details).length > 0 ? details : undefined,
      });
    });

    const pagination = {
      currentPage: parseInt(page),
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    const $pagenavi = $(".pagenavi .wp-pagenavi");
    if ($pagenavi.length > 0) {
      const $lastLink = $pagenavi.find("a.last");
      if ($lastLink.length > 0) {
        const lastHref = $lastLink.attr("href");
        const lastPageMatch = lastHref?.match(/\/page\/(\d+)\//);
        if (lastPageMatch) {
          pagination.totalPages = parseInt(lastPageMatch[1]);
        }
      }

      const $nextLink = $pagenavi.find("a.nextpostslink");
      pagination.hasNextPage = $nextLink.length > 0;

      const $prevLink = $pagenavi.find("a.previouspostslink");
      pagination.hasPreviousPage = $prevLink.length > 0;
    }

    if (results.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination,
        message: "نتیجه‌ای برای جستجوی شما یافت نشد",
      });
    }

    return NextResponse.json({
      success: true,
      data: results,
      pagination,
      totalResults: results.length,
      searchTerm: searchedText,
    });
  } catch (error) {
    console.error("خطا در پردازش درخواست:", error);

    const errorMessage =
      error instanceof Error ? error.message : "خطای ناشناخته رخ داده است";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
