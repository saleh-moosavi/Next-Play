import * as cheerio from "cheerio";
import { NewsData } from "@/types/newsTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const articleSlug = searchParams.get("slug");

    if (!articleSlug) {
      return NextResponse.json(
        { error: "Article slug parameter is required" },
        { status: 400 },
      );
    }

    const url = `${process.env.SCRAPE_TARGET}/${articleSlug}`;

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

    const result: NewsData = {
      title: "",
      coverImage: "",
      author: "",
      date: "",
      views: "",
      comments: "",
      content: "",
      authorAvatar: "",
      categories: [],
    };

    const headerElement = $("header[itemscope]");

    const coverImageElement = headerElement.find("img.wp-post-image");
    if (coverImageElement.length > 0) {
      result.coverImage = coverImageElement.attr("src") || "";
    }

    const titleElement = headerElement.find("h1[itemprop='name']");
    if (titleElement.length > 0) {
      result.title = titleElement.text().trim();
    }

    const authorElement = headerElement.find(".pic span");
    if (authorElement.length > 0) {
      const text = authorElement.text().trim();

      result.author = text.split("\t")[0];

      const dateMatch = text.match(/\d+\s+[\u0600-\u06FF]+\s+\d{4}/);
      if (dateMatch) {
        result.date = dateMatch[0];
      }

      const commentsMatch = text.match(/(\d+)\s+دیدگاه/);
      if (commentsMatch) {
        result.comments = commentsMatch[1];
      }

      const viewsMatch = text.match(/([\d,]+)\s+بازدید/);
      if (viewsMatch) {
        result.views = viewsMatch[1];
      }
    }

    const avatarElement = headerElement.find("img.avatar");
    if (avatarElement.length > 0) {
      result.authorAvatar = avatarElement.attr("src") || "";
    }

    const contentElement = $(".post-content[itemprop='description']");
    if (contentElement.length > 0) {
      result.content = contentElement.html() || "";
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in article scraping route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
