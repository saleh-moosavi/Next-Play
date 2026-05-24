export interface Slide {
  imgUrl: string;
  thumbnailUrl: string;
  title: string;
  link: string;
  description: string;
}

export interface Video {
  imageUrl: string;
  title: string;
  link: string;
  duration: string;
}

export interface Game {
  iconClass: string;
  title: string;
  link: string;
  updateBadge: string;
  thumbnail: string;
  author: string;
  date: string;
  views: string;
  details: Record<string, string>;
  description: string;
}

export interface News {
  title: string;
  link: string;
  date: string;
  imageUrl: string;
  excerpt: string;
}

export interface ComingSoon {
  imageUrl: string;
  daysLeft: number;
  releaseText: string;
  title: string;
  platforms: string;
  releaseDate: string;
}

export interface MobileGame {
  iconUrl: string;
  link: string;
  ratingPercent: number;
  title: string;
  platform: string;
  date: string;
}

export interface ScrapedData {
  slides: Slide[];
  videos: Video[];
  games: Game[];
  news: News[];
  comingSoon: ComingSoon[];
  mobileGames: MobileGame[];
  scrapedAt: string;
}
