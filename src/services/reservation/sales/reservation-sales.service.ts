import {supabase} from '@lib/supabase/supabase';

export class ReservationSalesService {
  static getAllSalesReservations() {
    return supabase
      .from('reservations_ventes')
      .select('*')
      .order('created_at', {ascending: false});
  }

  static getMySalesReservations(userId: string) {
    return supabase
      .from('reservations_ventes')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', {ascending: false});
  }

  static getSalesReservationById(reservationId: string) {
    return supabase
      .from('reservations_ventes')
      .select(
        `
        id,
        status,
        created_at,
        updated_at,
        service:services(
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
        )
      `,
      )
      .eq('id', reservationId)
      .maybeSingle();
  }

  static createSalesReservation(reservation: any): any {
    return supabase.from('reservations_ventes').insert(reservation);
  }

  static updateSalesReservation(reservation: any, reservationId: string): any {
    return supabase
      .from('reservations_ventes')
      .update(reservation)
      .eq('id', reservationId);
  }

  static deleteSalesReservation(reservationId: string): any {
    return supabase
      .from('reservations_ventes')
      .delete()
      .eq('id', reservationId);
  }

  static getSalesReservationByServiceId(serviceId: string) {
    return supabase
      .from('reservations_ventes')
      .select('*')
      .eq('service_id', serviceId)
      .order('created_at', {ascending: false});
  }

  static getSalesReservationByUserId(userId: string) {
    return supabase
      .from('reservations_ventes')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', {ascending: false});
  }

  static getSalesReservationByProviderId(providerId: string) {
    return supabase
      .from('reservations_ventes')
      .select(
        `
        id,
        status,
        date,
        time_slot,
        total_amount,
        created_at,
        updated_at,
        date_time_end,
        address,
        instructions,
        viewed,
        sale:sales!inner(
          id,
          title,
          description,
          price,
          category_id,
          subcategory_id,
          location,
          provider:profiles(
            id,
            first_name,
            last_name,
            email,
            profile_picture_url
          )
        )
      `,
      )
      .eq('sale.seller_id', providerId)
      .order('created_at', {ascending: false});
  }

  static getSalesReservationByUserIdAndStatus(userId: string, status: string) {
    const query = supabase
      .from('reservations_ventes')
      .select(
        `
        id,
        status,
        date,
        client_id,
        time_slot,
        total_amount,
        created_at,
        updated_at,
        date_time_end,
        address,
        instructions,
        viewed,
        sales(
          id,
          title,
          description,
          price,
          category_id,
          subcategory_id,
          location,
          provider:profiles(
            first_name,
            last_name,
            email,
            profile_picture_url
          )
        )
      `,
      )
      .eq('client_id', userId)
      .order('created_at', {ascending: false});

    if (status === 'past') {
      return query.in('status', ['cancelled', 'confirmed', 'completed']);
    }

    return query.eq('status', status);
  }

  static getSalesReservationByProviderIdAndStatus(
    providerId: string,
    status: string,
  ) {
    const query = supabase
      .from('reservations_ventes')
      .select(
        `
        id,
        status,
        date,
        time_slot,
        total_amount,
        created_at,
        updated_at,
        date_time_end,
        address,
        instructions,
        viewed,
        sale:sales!inner(
          id,
          title,
          description,
          price,
          category_id,
          subcategory_id,
          location,
          seller_id
        )
      `,
      )
      .eq('sale.seller_id', providerId)
      .order('created_at', {ascending: false});

    if (status === 'past') {
      return query.in('status', ['cancelled', 'confirmed', 'completed']);
    }

    return query.eq('status', status);
  }

  static getSalesReservationByStatus(status: string) {
    return supabase
      .from('reservations_ventes')
      .select('*')
      .eq('status', status)
      .order('created_at', {ascending: false});
  }
}
