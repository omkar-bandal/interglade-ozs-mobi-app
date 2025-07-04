import {supabase} from '@lib/supabase/supabase';
import {SearchFilters} from './search.model';

export class SearchService {
  static search(filters: SearchFilters) {
    let query;

    if (filters.type === 'services') {
      query = supabase.from('services').select(`
                    *,
                    category:categories_services!services_category_id_fkey_new(name),
                    subcategory:subcategories_services!services_subcategory_id_fkey(name),
                    provider:profiles(*)
                `);
    } else {
      query = supabase.from('sales').select(`
                    *,
                    category:categories_ventes(name),
                    subcategory:subcategories_ventes(name),
                    seller:profiles(*)
                `);
    }

    SearchService.applyFilters(query, filters);
    SearchService.applySorting(query, filters.sortBy);

    return query;
  }

  static applyFilters(query: any, filters: SearchFilters) {
    if (filters.category?.id) {
      query = query.eq('category_id', filters.category.id);
      console.log('Applied category filter:', filters.category.id);
    }

    if (filters.subcategory?.id) {
      query = query.eq('subcategory_id', filters.subcategory.id);
      console.log('Applied subcategory filter:', filters.subcategory.id);
    }

    if (filters.location) {
      query = query.eq('location', filters.location);
      console.log('Applied location filter:', filters.location);
    }

    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`);
      console.log('Applied search filter:', filters.search);
    }

    return query;
  }

  static applySorting(query: any, sortBy?: string) {
    if (sortBy === 'price-asc') {
      query = query.order('price', {ascending: true});
    } else if (sortBy === 'price-desc') {
      query = query.order('price', {ascending: false});
    } else if (sortBy === 'rating') {
      query = query.order('rating', {ascending: false});
    } else if (sortBy === 'newest') {
      query = query.order('created_at', {ascending: false});
    }

    return query;
  }
}
