export interface SearchResult {
  title: string;
  url: string;
  imageUrl: string | undefined;
  author: string;
  date: string;
  views: string;
  excerpt: string;
  type: "game" | "news" | "trailer" | "mobile" | "unknown";
  details?: {
    releaseDate?: string;
    genre?: string;
    size?: string;
    language?: string;
  };
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchResponse {
  success: boolean;
  data: SearchResult[];
  pagination: PaginationInfo;
  totalResults: number;
  searchTerm: string;
  error?: string;
  message?: string;
}
