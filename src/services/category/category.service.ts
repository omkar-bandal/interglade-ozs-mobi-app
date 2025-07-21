import {supabase} from '@lib/supabase/supabase';

export class CategoryService {

  static getAllSalesCategories(): any {
    return supabase.from('categories_ventes').select('*').order('id');
  }

  static getAllServiceCategories(): any {
    return supabase.from('categories_services').select('*').order('id');
  }

  static getCategoriesByType(type: string): any {
    const tableName =
      type === 'service' ? 'categories_services' : 'categories_ventes';
    return supabase.from(tableName).select('*').order('id');
  }

  static getSubCategoriesByCategroryId(categoryId: number, type: string): any {
    const tableName =
      type === 'service' ? 'subcategories_services' : 'subcategories_ventes';
    return supabase
      .from(tableName)
      .select('*')
      .eq('category_id', categoryId)
      .order('id');
  }

  static getPredefineItemsBySubCategroryId(subCategoryId: number): any {
    return supabase
      .from('predefined_items')
      .select('*')
      .eq('subcategory_id', subCategoryId)
      .order('name');
  }

  static getPredefineServicesBySubCategroryId(subCategoryId: number): any {
    return supabase
      .from('predefined_services')
      .select('*')
      .eq('subcategory_id', subCategoryId)
      .order('name');
  }
}
