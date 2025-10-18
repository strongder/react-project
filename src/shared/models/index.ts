export interface SearchRequest {
  page?: number;
  size?: number;
  filters?: Record<string, string>;
  sortBy?: string | null;
  sortDir?: "asc" | "desc";
}

export interface SearchResponse<T> {
  data: T[];
  pagignation: PaginationType
}

export type PaginationType = {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

export const initSearch: SearchRequest = {
  page: 1,
  size: 10,
  filters: {},
  sortBy: null,
  sortDir: "asc",
};
