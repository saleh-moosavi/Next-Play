import {
  MobileCurrentGame,
  MobileDownloadLink,
  MobileGameVersion,
  MobileMetaData,
  MobileMetaInfo,
  MobileSimilarGame,
  MobileGameInfo,
} from "@/types/mobileGameTypes";
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

    // ==================== استخراج اطلاعات ====================

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

    const imageUrl = $("section.single img.wp-post-image").attr("src");
    const title = $("h1")
      .text()
      .replace(/^دانلود بازی\s+/, "")
      .trim();
    const englishDescription = $(".english-info p").text();

    // توضیحات کامل
    let fullDescription = "";
    $(".post-content p, .post-content h2").each((_, element) => {
      const text = $(element).text().trim();
      if (text.length > 0) {
        fullDescription += text + "\n\n";
      }
    });

    fullDescription = fullDescription.slice(
      0,
      fullDescription.indexOf("اگر به این سبک بازی‌ها") ||
        fullDescription.indexOf("در ادامه برای دانلود بازی") ||
        fullDescription.indexOf("اگر نرم افزار مدیریت دانلود ندارید") ||
        fullDescription.indexOf("تصاویری از محیط بازی") ||
        fullDescription.length,
    );
    fullDescription = fullDescription.replace(
      /^دانلود بازی.*?برای[^\n]*\n/,
      "",
    );
    fullDescription = fullDescription.replace(/^نسخه.*?اضافه شد[^\n]*\n/, "");
    fullDescription = fullDescription.trim();

    // اطلاعات اختصاصی موبایل
    const mobileInfo: MobileGameInfo = {
      price: "",
      developer: "",
      genre: "",
      version: "",
      os: "",
      ageRating: "",
    };

    $(".info ul li").each((_, element) => {
      const text = $(element).text().trim();
      if (text.includes("قیمت:")) {
        mobileInfo.price = text.replace("قیمت:", "").trim();
      } else if (text.includes("سازنده:")) {
        mobileInfo.developer = text.replace("سازنده:", "").trim();
      } else if (text.includes("سبک :")) {
        mobileInfo.genre = text.replace("سبک :", "").trim();
      } else if (text.includes("نسخه :")) {
        mobileInfo.version = text.replace("نسخه :", "").trim();
      } else if (text.includes("سیستم عامل:")) {
        mobileInfo.os = text.replace("سیستم عامل:", "").trim();
      } else if (text.includes("رده سنی:")) {
        mobileInfo.ageRating = text.replace("رده سنی:", "").trim();
      }
    });

    // متا اطلاعات
    const metaInfo: MobileMetaInfo = {};
    $(".infodl li").each((_, element) => {
      const text = $(element).text();
      if (text.includes("تاریخ به روزرسانی:")) {
        metaInfo.lastUpdate = text.replace("تاریخ به روزرسانی:", "").trim();
      } else if (text.includes("حجم :")) {
        metaInfo.size = text.replace("حجم :", "").trim();
      } else if (text.includes("رمز فایل :")) {
        metaInfo.password = text.replace("رمز فایل :", "").trim();
      } else if (text.includes("منبع :")) {
        metaInfo.source = text.replace("منبع :", "").trim();
      }
    });

    // اسکرین شات‌ها
    const gameScreenshots: string[] = [];
    $(".gallery-item .gallery-icon a").each((_, element) => {
      const imgUrl = $(element).attr("href");
      if (imgUrl && imgUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
        gameScreenshots.push(imgUrl);
      }
    });

    // نسخه‌ها و لینک‌های دانلود
    const gameVersions: MobileGameVersion[] = [];

    $(".buttondl-tab .tab-title .tab").each((_, tabElement) => {
      const $tab = $(tabElement);
      const $tabLink = $tab.find("a.buttondl");

      const versionTitle = $tabLink
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()
        .trim();

      const versionSizeText = $tabLink.find("span").text().trim();
      const versionSize = versionSizeText.replace("حجم فایل ها :", "").trim();

      const tabId = $tab.attr("data-tab");
      const tabContent = $(
        `.buttondl-tab .tab-content > div[data-tabc="${tabId}"]`,
      );

      const links: MobileDownloadLink[] = [];

      tabContent.find("ul").each((_, ulElement) => {
        const $ul = $(ulElement);
        const children = $ul.contents();

        children.each((_, child) => {
          const $child = $(child);

          if ($child.is("b")) {
            const bText = $child.attr("data-title") || $child.text().trim();
            if (bText) {
              links.push({
                text: bText,
                url: undefined,
                size: "",
                isDirect: false,
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
              const linkSizeText = $link.find("span").text().trim();
              const linkSize = linkSizeText.replace("حجم فایل:", "").trim();

              if (linkUrl) {
                links.push({
                  text: linkText || "دانلود",
                  url: linkUrl,
                  size: linkSize,
                  isDirect: true,
                  serverLocation: linkUrl.includes("android.pgupgame.com")
                    ? "ایران"
                    : "خارج",
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
    let recommendOS = "";
    let installGuide = "";

    const helpTabContent = $('.box-single .tab-content > div[data-tabc="2"]');
    const osMatch = helpTabContent
      .html()
      ?.match(/نسخه اندروید مورد نیاز :\s*<strong>(.*?)<\/strong>/);
    if (osMatch && osMatch[1]) {
      minOS = osMatch[1].trim();
      recommendOS = minOS;
    }

    const installMatch = helpTabContent
      .html()
      ?.match(/طریقه نصب(.*?)(?=<h3|$)/);
    if (installMatch) {
      installGuide = installMatch[1].trim();
    }

    // امتیاز
    let rating: number | null = null;
    const ratingValue = $(".rate_star").attr("r");
    if (ratingValue) {
      rating = parseFloat(ratingValue);
    }

    // تشخیص آفلاین بودن
    const isOffline =
      fullDescription.includes("آفلاین") ||
      fullDescription.includes("Offline") ||
      $(".tags a").text().includes("آفلاین");

    // بازی‌های مشابه
    const similarGames: MobileSimilarGame[] = [];
    $(".relate .mobile-game-post").each((_, element) => {
      const $game = $(element);
      const $link = $game.find("a:first");
      const $title = $game.find("header h2 a");
      const $img = $game.find("img");
      const url = $link.attr("href");

      // استخراج امتیاز از ستاره‌ها
      const starWidth = $game.find(".rate").attr("style") || "";
      const ratingMatch = starWidth.match(/(\d+)%/);
      const gameRating = ratingMatch
        ? parseInt(ratingMatch[1]) / 20
        : undefined;

      let slug = "";
      if (url) {
        const match = url.match(/par30games\.net\/(\d+\/[^\/]+)/);
        if (match) {
          slug = match[1];
        }
      }

      similarGames.push({
        title: $title.text(),
        url: slug || url,
        imageUrl: $img.attr("src"),
        rating: gameRating,
      });
    });

    // متا دیتا
    const meta: MobileMetaData = {
      url: $('link[rel="canonical"]').attr("href"),
      publishedTime: $('meta[property="article:published_time"]').attr(
        "content",
      ),
      categories,
      gameId: gameUrl.split("/")[0],
    };

    // ساخت آبجکت نهایی
    const currentGame: MobileCurrentGame = {
      title,
      metaDescription: $('meta[name="description"]').attr("content") || null,
      fullDescription,
      englishDescription: englishDescription || undefined,
      imageUrl,
      gameScreenshots,
      rating,
      viewCount,
      commentCount,
      date,
      downloadLinks: gameVersions,
      metaInfo,
      minOS,
      recommendOS,
      mobileInfo,
      isOffline,
      hasDataFile:
        fullDescription.includes("دیتا") || fullDescription.includes("obb"),
      installGuide,
    };

    return NextResponse.json({
      success: true,
      data: {
        currentGame,
        similarGames,
        meta,
      },
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
