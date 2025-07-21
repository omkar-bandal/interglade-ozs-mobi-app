import {supabase} from '@lib/supabase/supabase';

export class AddressService {
  static createAddress(address: any): any {
    return supabase.from('address').insert(address);
  }

  static updateAddress(address: any, addressId: string): any {
    return supabase.from('address').update(address).eq('id', addressId);
  }

  static deleteAddress(addressId: string): any {
    return supabase.from('address').delete().eq('id', addressId);
  }

  static getAllAddress(): any {
    return supabase.from('address').select('*');
  }

  static getAddressById(addressId: string): any {
    return supabase.from('address').select('*').eq('id', addressId).single();
  }
}
