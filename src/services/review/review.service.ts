import {supabase} from '@lib/supabase/supabase';

export class ReviewService {
  static getAllReviews() {
    return supabase.from('reviews').select('*');
  }

  static getReviewById(id: string) {
    return supabase.from('reviews').select('*').eq('id', id);
  }

  static createReview(review: any): any {
    console.log('Creating review:asdsa', review);
    return supabase.from('reviews').insert(review);
  }

  static updateReview(id: string, review: any): any {
    return supabase.from('reviews').update(review).eq('id', id);
  }

  static deleteReview(id: string): any {
    return supabase.from('reviews').delete().eq('id', id);
  }

  static getReviewsByReservationId(reservationId: string): any {
    return supabase
      .from('reviews')
      .select('*')
      .eq('reservation_id', reservationId);
  }
}
