import {supabase} from '@lib/supabase/supabase';

export class LocationService {
  static getGoogleMapAPIKey(): any {
    return supabase
      .from('secrets')
      .select('value')
      .eq('key', 'GOOGLE_MAPS_API_KEY')
      .single();
  }
}
