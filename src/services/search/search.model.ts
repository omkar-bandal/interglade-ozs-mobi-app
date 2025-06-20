export interface SearchFilters {
  type: 'services' | 'sales';
  search?: string;
  category?: {id: number};
  subcategory?: {id: number};
  location?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
