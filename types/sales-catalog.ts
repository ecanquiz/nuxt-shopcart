// Types for the Sales Catalog API response

export interface CatalogItem {
  id: number;
  int_cod: string;
  name: string;
  status: number;
  photos: string; // comma-braced list string from API, e.g. "{url1,url2}"
  description: string;
  id_user_insert: number;
  id_user_update: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Rows {
  current_page: number;
  data: CatalogItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SalesCatalogResponse {
  rows: Rows;
  sort: string | null;
  direction: string | null;
  search: string | null;
}

// Optional helper: parse the photos field into an array of URLs
export function parsePhotos(photos: string): string[] {
  // Removes surrounding braces and splits by comma, trimming whitespace
  const trimmed = photos.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) return [];
  const inner = trimmed.slice(1, -1);
  return inner
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}
