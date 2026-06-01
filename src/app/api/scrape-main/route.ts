import {
  ComingSoon,
  Game,
  MobileGame,
  News,
  IranGameNews,
  ScrapedData,
  Slide,
  Video,
} from "@/types/mainPageTypes";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const targetUrl = process.env.SCRAPE_TARGET;
    if (!targetUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "SCRAPE_TARGET environment variable is not set",
        },
        { status: 500 },
      );
    }

    const baseUrl = targetUrl.replace(/\/$/, "");
    const pageUrl = page === 1 ? baseUrl : `${baseUrl}/page/${page}/`;

    const response = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const slides: Slide[] = [];
    $(".slider-post").each((_, element) => {
      const $article = $(element);

      const imgUrl =
        $article.find("img.attachment-full").first().attr("src") || "";
      const thumbnailUrl = $article.find("header a img").attr("src") || "";
      const title = $article.find("header h2 a").text().trim();
      const link = $article.find("header h2 a").attr("href") || "";
      const description = $article.find("header p").text().trim();

      slides.push({
        imgUrl,
        thumbnailUrl,
        title,
        link,
        description,
      });
    });

    const videos: Video[] = [];
    $(".video-box .video-box-post").each((_, element) => {
      const $video = $(element);

      const imageUrl = $video.find(".pic img").attr("src") || "";
      const title = $video.find("h2").text().trim();
      const link = $video.find("a").first().attr("href") || "";
      const duration = $video.find(".pic span").text().trim();

      videos.push({
        imageUrl,
        title,
        link,
        duration,
      });
    });

    const games: Game[] = [];
    $(".posts article.post").each((_, element) => {
      const $game = $(element);

      const iconClass = $game.attr("class")?.match(/icon-[^\s]+/)?.[0] || "";
      const title = $game.find("header h2 a").text().trim();
      const link = $game.find("header h2 a").attr("href") || "";
      const updateBadge = $game.find("header b").text().trim() || "";
      const thumbnail = $game.find(".game-thumb").attr("src") || "";
      const author = $game
        .find("span i.icon-user-male-black-shape")
        .parent()
        .text()
        .trim();
      const date = $game.find("span i.icon-days").parent().text().trim();
      const views = $game
        .find("span i.icon-eye-close-up")
        .parent()
        .text()
        .trim();

      const listItems: Record<string, string> = {};
      $game.find("ul li").each((_, li) => {
        const text = $(li).text().trim();
        const colonIndex = text.indexOf(":");

        if (colonIndex !== -1) {
          const key = text.substring(0, colonIndex).trim();
          const value = text.substring(colonIndex + 1).trim();
          listItems[key] = value;
        } else if (text) {
          listItems[`field_${Object.keys(listItems).length}`] = text;
        }
      });

      const description = $game.find("p").last().text().trim();

      games.push({
        iconClass,
        title,
        link,
        updateBadge,
        thumbnail,
        author,
        date,
        views,
        details: listItems,
        description,
      });
    });

    const news: News[] = [];
    $(".sidebar-box.animate article").each((_, element) => {
      const $news = $(element);

      const title = $news.find("h2 a").text().trim();
      const link = $news.find("h2 a").attr("href") || "";
      const date =
        $news.find("h2 a time").text().trim() ||
        $news.find("time").text().trim();
      const imageUrl = $news.find("img").attr("src") || "";

      let excerpt = $news
        .find("h2 a")
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      excerpt = excerpt.replace(date, "").trim();

      news.push({
        title,
        link,
        date,
        imageUrl,
        excerpt,
      });
    });

    const comingSoon: ComingSoon[] = [];
    $(".sidebar-box.comming article").each((_, element) => {
      const $item = $(element);

      const imageUrl = $item.find("img").attr("src") || "";
      const daysLeftText = $item.find(".commingsoon span").text().trim();
      const daysLeft = parseInt(daysLeftText, 10) || 0;
      const releaseText = $item
        .find(".commingsoon")
        .text()
        .trim()
        .replace(daysLeftText, "")
        .trim();
      const title = $item
        .find("h2 span")
        .first()
        .contents()
        .first()
        .text()
        .trim();
      const platforms = $item.find("h2 span span").text().trim();
      const releaseDate = $item.find("time").text().trim();

      comingSoon.push({
        imageUrl,
        daysLeft,
        releaseText,
        title,
        platforms,
        releaseDate,
      });
    });

    const mobileGames: MobileGame[] = [];
    $(".mobile-game-box .mobile-game-post").each((_, element) => {
      const $game = $(element);

      const iconUrl = $game.find("a img").attr("src") || "";
      const link = $game.find("a").first().attr("href") || "";
      const rating = $game.find(".star .rate").attr("style") || "";
      const ratingPercent = rating.match(/width:\s*(\d+)%;?/)?.[1] || "0";
      const title = $game.find("header h2 a").text().trim();
      const platform = $game.find(".paltforms i").attr("class") || "";
      const date = $game.find("footer time").text().trim();

      mobileGames.push({
        iconUrl,
        link,
        ratingPercent: parseInt(ratingPercent, 10),
        title,
        platform,
        date,
      });
    });

    const iranGameNews: IranGameNews[] = [];
    $(".sidebar-box.posts ul li").each((_, element) => {
      const $li = $(element);
      const $link = $li.find("a");

      const link = $link.attr("href") || "";

      const title = $link.clone().children().remove().end().text().trim();

      const date = $link.find("span").text().trim();

      const imageUrl = $link.find("img").attr("src") || "";

      if (title && link) {
        iranGameNews.push({
          title,
          link,
          date,
          imageUrl,
        });
      }
    });

    const pagination = {
      pageNumbers: 0,
      lastPage: 0,
    };

    const lastPageLink = $(".wp-pagenavi .last").attr("href");
    if (lastPageLink) {
      const match = lastPageLink.match(/\/page\/(\d+)\//);
      if (match) {
        pagination.lastPage = parseInt(match[1]);
      }
    }

    const pageNumbers = $(".wp-pagenavi .page, .wp-pagenavi .current")
      .map((_, el) => parseInt($(el).text()))
      .get()
      .filter((n) => !isNaN(n));

    if (pageNumbers.length > 0) {
      pagination.pageNumbers = Math.max(...pageNumbers);
    }

    const scrapedData: ScrapedData = {
      slides,
      videos,
      games,
      news,
      comingSoon,
      mobileGames,
      iranGameNews,
      scrapedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: scrapedData,
      pagination,
    });
  } catch (error: unknown) {
    console.error("Scraping error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
