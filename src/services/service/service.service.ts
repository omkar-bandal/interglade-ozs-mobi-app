import {supabase} from '@lib/supabase/supabase';

export class ServiceService {
  static getAllServices() {
    return supabase
      .from('services')
      .select('*')
      .order('created_at', {ascending: false});
  }

  static getAllServicesExpectUser(userId: string) {
    return supabase
      .from('services')
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
      .not('provider_id', 'eq', userId)
      .order('created_at', {ascending: false});
  }

  static getMyServices(userId: string) {
    return supabase
      .from('services')
      .select('*')
      .eq('provider_id', userId)
      .order('created_at', {ascending: false});
  }

  static getServiceById(serviceId: string) {
    return supabase
      .from('services')
      .select(
        `
      id,
      title,
      description,
      price,
      availability,
      photos,
      location,
      category:categories_services(
        id,
        name
      ),
      subcategory:subcategories_services(
        id,
        name
      ),
      provider:profiles(
        first_name,
        last_name,
        email,
        profile_picture_url
      )
      `,
      )
      .eq('id', serviceId)
      .maybeSingle();
  }

  static createService(service: any): any {
    return supabase.from('services').insert(service);
  }

  static updateService(service: any, serviceId: string): any {
    return supabase.from('services').update(service).eq('id', serviceId);
  }

  static deleteService(serviceId: string): any {
    return supabase.from('services').delete().eq('id', serviceId);
  }
}
