import * as cheerio from "cheerio";
import { TrailerData } from "@/types/trailerTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trailerName = searchParams.get("title");

    if (!trailerName) {
      return NextResponse.json(
        { error: "Trailer parameter is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.SCRAPE_TARGET}/videos/${trailerName}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page: ${response.status}` },
        { status: response.status },
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const result: TrailerData = {
      title: "",
      mainUrl: "",
      qualities: {},
    };

    const titleElement = $("header h1");
    if (titleElement.length > 0) {
      result.title = titleElement.text().trim();
    }

    const posterElement = $("video.vjs-tech").attr("poster");
    if (posterElement) {
      result.mainUrl = posterElement;
    } else {
      const scriptContent = $("script").filter((_, el) => {
        return $(el).html()?.includes("Par30InitVideoPlayer") || false;
      });

      if (scriptContent.length > 0) {
        const scriptText = scriptContent.html() || "";
        const posterMatch = scriptText.match(/poster":"([^"]+)"/);
        if (posterMatch && posterMatch[1]) {
          result.mainUrl = posterMatch[1];
        }
      }
    }

    if (!result.mainUrl) {
      const firstSource = $("video.vjs-tech").attr("src");
      if (firstSource) {
        result.mainUrl = firstSource;
      }
    }

    $(".dl-box-video a").each((_, element) => {
      const link = $(element);
      const href = link.attr("href");
      const text = link.text().trim();

      if (href) {
        if (text.includes("360") || text.includes("360p")) {
          result.qualities.q360 = href;
        } else if (text.includes("720") || text.includes("720p")) {
          result.qualities.q720 = href;
        } else if (text.includes("1080") || text.includes("1080p")) {
          result.qualities.q1080 = href;
        }
      }
    });

    if (Object.keys(result.qualities).length === 0) {
      const scriptContent = $("script").filter((_, el) => {
        return $(el).html()?.includes("Par30InitVideoPlayer") || false;
      });

      if (scriptContent.length > 0) {
        const scriptText = scriptContent.html() || "";

        const sourcesMatch = scriptText.match(/sources":(\[.*?\])/);
        if (sourcesMatch && sourcesMatch[1]) {
          try {
            const sources = JSON.parse(sourcesMatch[1]);
            sources.forEach((source: any) => {
              if (source.res === "360") {
                result.qualities.q360 = source.src;
              } else if (source.res === "720") {
                result.qualities.q720 = source.src;
              } else if (source.res === "1080") {
                result.qualities.q1080 = source.src;
              }
            });
          } catch (e) {
            console.error("Error parsing sources JSON:", e);
          }
        }
      }
    }

    if (Object.keys(result.qualities).length === 0) {
      const videoSrc = $("video.vjs-tech").attr("src");
      if (videoSrc) {
        if (videoSrc.includes("SD") || videoSrc.includes("360")) {
          result.qualities.q360 = videoSrc;
        } else if (videoSrc.includes("HD") || videoSrc.includes("720")) {
          result.qualities.q720 = videoSrc;
        } else if (videoSrc.includes("Full-HD") || videoSrc.includes("1080")) {
          result.qualities.q1080 = videoSrc;
        } else {
          result.qualities.q720 = videoSrc;
        }
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in scraping route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
