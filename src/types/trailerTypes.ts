export interface TrailerData {
  title: string;
  mainUrl: string;
  qualities: {
    q360?: string;
    q720?: string;
    q1080?: string;
  };
}

export interface AllTrailers {
  title: string;
  imageUrl: string;
  duration: string;
  slug: string;
  author: string;
  date: string;
  link: string;
}

export interface AllTrailersResponse {
  videos: AllTrailers[];
  hasMore: boolean;
  nextPage: number | null;
  currentPage: number;
}
