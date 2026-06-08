export interface DownloadLink {
  text: string;
  url: string | undefined;
  size: string;
}

export interface MetaInfo {
  lastUpdate?: string;
  size?: string;
  password?: string;
}

export interface CurrentGame {
  title: string;
  metaDescription: string | undefined;
  fullDescription: string;
  englishDescription?: string;
  minOS: string;
  recommendOS: string;
  downloadLinks: DownloadLink[];
  metaInfo: MetaInfo;
  rating: number | null;
  viewCount?: string;
  date?: string;
  commentCount?: string;
  imageUrl?: string;
  gameScreenshots: string[];
}

export interface SimilarGame {
  title: string;
  url: string | undefined;
  imageUrl: string | undefined;
}

export interface MetaData {
  url: string | undefined;
  publishedTime: string | undefined;
  categories: string[];
}

export interface GameDataResponse {
  success: boolean;
  currentGame: CurrentGame;
  similarGames: SimilarGame[];
  meta: MetaData;
  error?: string;
}
