import {supabase} from '@lib/supabase/supabase';

export class AddressService {
  static getAllAddressesByUserId(userId: string): any {
    return supabase
      .from('address')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', {ascending: false});
  }

  static getAddressById(addressId: string): any {
    return supabase.from('address').select('*').eq('id', addressId).single();
  }

  static createAddress(userId: string, addressData: any): any {
    return supabase
      .from('address')
      .insert({
        ...addressData,
        profile_id: userId,
      })
      .select('*')
      .single();
  }

  static updateAddress(addressId: string, addressData: any): any {
    return supabase
      .from('address')
      .update(addressData)
      .eq('id', addressId)
      .select('*')
      .single();
  }

  static deleteAddress(addressId: string): any {
    return supabase
      .from('address')
      .delete()
      .eq('id', addressId)
      .select('*')
      .single();
  }
}

// import {supabase} from '@lib/supabase/supabase';

// export class AddressService {
//   static createAddress(address: any): any {
//     return supabase.from('address').insert(address);
//   }

//   static updateAddress(address: any, addressId: string): any {
//     return supabase.from('address').update(address).eq('id', addressId);
//   }

//   static deleteAddress(addressId: string): any {
//     return supabase.from('address').delete().eq('id', addressId);
//   }

//   static getAllAddress(): any {
//     return supabase.from('address').select('*');
//   }

//   static getAddressById(addressId: string): any {
//     return supabase.from('address').select('*').eq('id', addressId).single();
//   }
// }
