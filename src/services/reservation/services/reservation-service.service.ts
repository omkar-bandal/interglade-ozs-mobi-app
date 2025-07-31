import {supabase} from '@lib/supabase/supabase';

export class ReservationService {
  static getAllServiceReservations() {
    return supabase
      .from('reservations_services')
      .select('*')
      .order('created_at', {ascending: false});
  }

  static getMyServiceReservations(userId: string) {
    return supabase
      .from('reservations_services')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', {ascending: false});
  }

  static getServiceReservationById(reservationId: string) {
    return supabase
      .from('reservations_services')
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

  static createServiceReservation(reservation: any): any {
    return supabase.from('reservations_services').insert(reservation);
  }

  static updateServiceReservation(
    reservation: any,
    reservationId: string,
  ): any {
    console.log('reservation', reservation);
    return supabase
      .from('reservations_services')
      .update(reservation)
      .eq('id', reservationId);
  }

  static deleteServiceReservation(reservationId: string): any {
    return supabase
      .from('reservations_services')
      .delete()
      .eq('id', reservationId);
  }

  static getServiceReservationByServiceId(serviceId: string) {
    return supabase
      .from('reservations_services')
      .select('*')
      .eq('service_id', serviceId)
      .order('created_at', {ascending: false});
  }

  static getServiceReservationByUserId(userId: string) {
    return supabase
      .from('reservations_services')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', {ascending: false});
  }

  static getServiceReservationByProviderId(providerId: string) {
    return supabase
      .from('reservations_services')
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
        service:services!inner(
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
      .eq('service.provider_id', providerId)
      .order('created_at', {ascending: false});
  }

  static getServiceReservationByUserIdAndStatus(
    userId: string,
    status: string,
  ) {
    const query = supabase
      .from('reservations_services')
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
        services(
          id,
          title,
          description,
          price,
          category_id,
          subcategory_id,
          location,
          provider_id
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

  static getServiceReservationByProviderIdAndStatus(
    providerId: string,
    status: string,
  ) {
    const query = supabase
      .from('reservations_services')
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
        service:services!inner(
          id,
          title,
          description,
          price,
          category_id,
          subcategory_id,
          location,
          provider_id
        )
      `,
      )
      .eq('service.provider_id', providerId)
      .order('created_at', {ascending: false});

    if (status === 'past') {
      return query.in('status', ['cancelled', 'confirmed', 'completed']);
    }

    return query.eq('status', status);
  }

  static getServiceReservationByStatus(status: string) {
    return supabase
      .from('reservations_services')
      .select('*')
      .eq('status', status)
      .order('created_at', {ascending: false});
  }
}
