import {supabase} from '@lib/supabase/supabase';

export class SalesService {
  static getAllSales(): any {
    return supabase
      .from('sales')
      .select('*')
      .order('created_at', {ascending: false});
  }

  static getAllSalesExpectUser(userId: string) {
    return supabase
      .from('sales')
      .select(
        `
          id,
          title,
          description,
          price,
          photos,
          profiles(
            first_name,
            last_name,
            email,
            profile_picture_url
          )`,
      )
      .not('seller_id', 'eq', userId)
      .order('created_at', {ascending: false});
  }

  static getMySales(userId: string): any {
    return supabase
      .from('sales')
      .select('*')
      .eq('seller_id', userId)
      .order('created_at', {ascending: false});
  }

  static getSaleById(saleId: string): any {
    return supabase.from('sales').select('*').eq('id', saleId).single();
  }

  static createSale(sale: any): any {
    return supabase.from('sales').insert(sale);
  }

  static updateSale(sale: any, saleId: string): any {
    return supabase.from('sales').update(sale).eq('id', saleId);
  }

  static deleteSale(saleId: string): any {
    return supabase.from('sales').delete().eq('id', saleId);
  }
}
