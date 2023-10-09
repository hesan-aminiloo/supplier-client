export interface Pagination {
  page: number;
}

export interface PaginationResponse {
  current_page: number;
  from: number | null;
  to: number | null;
  last_page: number;
  next_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
