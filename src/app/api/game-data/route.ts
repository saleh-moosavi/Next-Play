import {
  CurrentGame,
  DownloadLink,
  MetaData,
  MetaInfo,
  SimilarGame,
  SystemRequirement,
} from "@/types/gamePageTypes";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const gameUrl = searchParams.get("url");

    if (!gameUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "لطفاً پارامتر url را وارد کنید",
        },
        { status: 400 },
      );
    }

    const response = await fetch(process.env.SCRAPE_TARGET + "/" + gameUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت صفحه: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // ==================== Start Scraping Data ====================
    const categories: string[] = [];
    $(".breadcrumb span a").each((_, element) => {
      categories.push($(element).text());
    });

    const headerText = $(".pic span").text();
    const dateMatch = headerText.match(/(\d+\s+\w+\s+\d+)/);
    const commentMatch = headerText.match(/(\d+)\s*دیدگاه/);
    const viewMatch = headerText.match(/(\d+)\s*بازدید/);
    const date = dateMatch ? dateMatch[1] : undefined;
    const commentCount = commentMatch ? commentMatch[1] : undefined;
    const viewCount = viewMatch ? viewMatch[1] : undefined;

    const imageUrl = $(".pic .thumby").attr("src");

    const rawTitle = $("h1").text();
    const title = rawTitle.replace(/^دانلود بازی\s+/, "").trim();

    const englishDescription = $(".english-info p").text();

    let fullDescription = "";
    $(".post-content p").each((_, element) => {
      const text = $(element).text().trim();
      if (
        text &&
        !text.includes("در ادامه برای دانلود") &&
        !text.includes("همراه باشید") &&
        !text.includes("حداقل سیستم مورد نیاز") &&
        !text.includes("سیستم پیشنهادی") &&
        !text.includes("تصاویری از محیط بازی")
      ) {
        fullDescription += text + "\n\n";
      }
    });
    fullDescription = fullDescription.trim();

    const metaInfo: MetaInfo = {};
    $(".infodl li").each((_, element) => {
      const text = $(element).text();

      if (text.includes("تاریخ به روزرسانی:")) {
        metaInfo.lastUpdate = text.replace("تاریخ به روزرسانی:", "").trim();
      } else if (text.includes("حجم :")) {
        metaInfo.size = text.replace("حجم :", "").trim();
      } else if (text.includes("رمز فایل :")) {
        metaInfo.password = text.replace("رمز فایل :", "").trim();
      }
    });

    const links: DownloadLink[] = [];
    $(".buttondl-tab .tab-content a").each((_, element) => {
      const $link = $(element);
      links.push({
        text: $link.text(),
        url: $link.attr("href"),
        size: $link.find("span").text(),
      });
    });

    const minOS: SystemRequirement = {};
    $(`h3:contains("حداقل سیستم مورد نیاز")`)
      .nextUntil("h3")
      .each((_, element) => {
        if ($(element).is("p")) {
          const text = $(element).text();

          if (text.includes("OS:")) minOS.os = text.replace("OS:", "").trim();
          if (text.includes("Processor:"))
            minOS.processor = text.replace("Processor:", "").trim();
          if (text.includes("Memory:"))
            minOS.memory = text.replace("Memory:", "").trim();
          if (text.includes("Graphics:"))
            minOS.graphics = text.replace("Graphics:", "").trim();
          if (text.includes("DirectX:"))
            minOS.directX = text.replace("DirectX:", "").trim();
          if (text.includes("Storage:"))
            minOS.storage = text.replace("Storage:", "").trim();
        }
      });

    const recommendOS: SystemRequirement = {};
    $(`h3:contains("سیستم پیشنهادی")`)
      .nextUntil("h3")
      .each((_, element) => {
        if ($(element).is("p")) {
          const text = $(element).text();

          if (text.includes("OS:"))
            recommendOS.os = text.replace("OS:", "").trim();
          if (text.includes("Processor:"))
            recommendOS.processor = text.replace("Processor:", "").trim();
          if (text.includes("Memory:"))
            recommendOS.memory = text.replace("Memory:", "").trim();
          if (text.includes("Graphics:"))
            recommendOS.graphics = text.replace("Graphics:", "").trim();
          if (text.includes("DirectX:"))
            recommendOS.directX = text.replace("DirectX:", "").trim();
          if (text.includes("Storage:"))
            recommendOS.storage = text.replace("Storage:", "").trim();
        }
      });

    const ratingValue = $(".rate_star").attr("r");
    const rating = ratingValue ? parseFloat(ratingValue) : null;

    const games: SimilarGame[] = [];
    $(".relate-post-game").each((_, element) => {
      const $game = $(element);
      const $link = $game.find("a:first");
      const $title = $game.find("header h2");
      const $img = $game.find("img");
      const url = $link.attr("href");

      let slug = "";
      if (url) {
        const match = url.match(/par30games\.net\/(\d+\/[^\/]+)/);
        if (match) {
          slug = match[1];
        }
      }

      games.push({
        title: $title.text(),
        url: slug || url,
        imageUrl: $img.attr("src"),
      });
    });

    const currentGame: CurrentGame = {
      title,
      metaDescription: $('meta[name="description"]').attr("content"),
      fullDescription,
      englishDescription: englishDescription || undefined,
      downloadLinks: links,
      recommendOS,
      minOS,
      metaInfo,
      rating,
      viewCount,
      date,
      commentCount,
      imageUrl,
    };

    const similarGames = games;

    const meta: MetaData = {
      url: $('link[rel="canonical"]').attr("href"),
      publishedTime: $('meta[property="article:published_time"]').attr(
        "content",
      ),
      categories,
    };

    return NextResponse.json({
      success: true,
      currentGame,
      similarGames,
      meta,
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
