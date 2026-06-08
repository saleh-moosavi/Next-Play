import {
  CurrentGame,
  DownloadLink,
  GameVersion,
  MetaData,
  MetaInfo,
  SimilarGame,
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
    $(".post-content p, .post-content h2").each((_, element) => {
      const text = $(element).text().trim();
      fullDescription += text + "\n\n";
    });

    fullDescription = fullDescription.slice(
      0,
      fullDescription.indexOf("اگر به این سبک بازی‌ها") ||
        fullDescription.indexOf("در ادامه برای دانلود بازی"),
    );
    fullDescription = fullDescription.replace(
      /^دانلود بازی.*?برای[^\n]*\n/,
      "",
    );

    fullDescription = fullDescription.replace(/^نسخه.*?اضافه شد[^\n]*\n/, "");

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

    const gameScreenshots: string[] = [];
    $(".gallery-item .gallery-icon a").each((_, element) => {
      const imgUrl = $(element).attr("href");
      if (imgUrl && imgUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
        gameScreenshots.push(imgUrl);
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

    const gameVersions: GameVersion[] = [];
    $(".buttondl-tab .tab-title .tab").each((index, tabElement) => {
      const $tab = $(tabElement);
      const $tabLink = $tab.find("a.buttondl");

      const versionTitle = $tabLink
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()
        .trim();

      const versionSize = $tabLink.find("span").text().trim();

      const tabId = $tab.attr("data-tab");
      const tabContent = $(
        `.buttondl-tab .tab-content > div[data-tabc="${tabId}"]`,
      );

      const links: DownloadLink[] = [];

      tabContent.find("ul").each((_, ulElement) => {
        const $ul = $(ulElement);

        const children = $ul.contents();

        children.each((_, child) => {
          const $child = $(child);

          if ($child.is("b")) {
            const bText = $child.attr("data-title") || $child.text().trim();
            if (bText) {
              links.push({
                noLink: true,
                text: bText,
                url: undefined,
                size: "",
              });
            }
          }

          if ($child.is("li")) {
            $child.find("a").each((_, linkElement) => {
              const $link = $(linkElement);
              const linkText = $link
                .contents()
                .filter(function () {
                  return this.type === "text";
                })
                .text()
                .trim();
              const linkUrl = $link.attr("href");
              const linkSize = $link.find("span").text().trim();

              if (linkUrl) {
                links.push({
                  noLink: false,
                  text: linkText || $link.text().replace(linkSize, "").trim(),
                  url: linkUrl,
                  size: linkSize,
                });
              }
            });
          }
        });
      });

      if (links.length > 0 && versionTitle) {
        gameVersions.push({
          title: versionTitle,
          size: versionSize,
          links: links,
        });
      }
    });

    let minOS = "";
    $(`h3:contains("حداقل سیستم مورد نیاز")`)
      .nextUntil("h3")
      .each((_, element) => {
        if ($(element).is("p")) {
          minOS = $(element).text();
        }
      });

    let recommendOS = "";
    $(`h3:contains("سیستم پیشنهادی")`)
      .nextUntil("h3")
      .each((_, element) => {
        if ($(element).is("p")) {
          recommendOS = $(element).text();
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
      downloadLinks: gameVersions,
      recommendOS,
      minOS,
      metaInfo,
      rating,
      viewCount,
      date,
      commentCount,
      imageUrl,
      gameScreenshots,
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
