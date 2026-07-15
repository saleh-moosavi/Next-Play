export interface MobileGameInfo {
  price: string;
  developer: string;
  genre: string;
  version: string;
  os: string;
  ageRating: string;
}

export interface MobileCurrentGame {
  title: string;
  metaDescription: string | null;
  fullDescription: string;
  englishDescription?: string;

  imageUrl: string | undefined;
  gameScreenshots: string[];

  rating: number | null;
  viewCount: string | undefined;
  commentCount: string | undefined;
  date: string | undefined;

  downloadLinks: MobileGameVersion[];
  metaInfo: MobileMetaInfo;

  minOS: string;
  recommendOS: string;

  mobileInfo: MobileGameInfo;

  isOffline?: boolean;
  hasDataFile?: boolean;
  installGuide?: string;
}

export interface MobileGameVersion {
  title: string;
  size: string;
  links: MobileDownloadLink[];
}

export interface MobileDownloadLink {
  text: string;
  url: string | undefined;
  size: string;
  isDirect?: boolean;
  serverLocation?: string;
}

export interface MobileMetaInfo {
  lastUpdate?: string;
  size?: string;
  password?: string;
  source?: string;
}

export interface MobileSimilarGame {
  title: string;
  url: string | undefined;
  imageUrl: string | undefined;
  rating?: number;
  downloadCount?: string;
}

export interface MobileGameResponse {
  success: boolean;
  data?: {
    currentGame: MobileCurrentGame;
    similarGames: MobileSimilarGame[];
  };
  error?: string;
}

export interface AllMobileGame {
  title: string;
  iconUrl: string;
  slug: string;
  date: string;
  ratingPercent: number;
  link: string;
}

export interface AllMobileGamesResponse {
  games: AllMobileGame[];
  hasMore: boolean;
  nextPage: number | null;
  currentPage: number;
}
