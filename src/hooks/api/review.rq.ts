import {ErrorModel} from '@models/api.model';
import {ReviewService} from '@services/review/review.service';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export function useGetAllReviews(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllReviews'],
    queryFn: () => ReviewService.getAllReviews(),
  });
}

export function useGetReviewById(
  reviewId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReviewById', reviewId],
    queryFn: () => ReviewService.getReviewById(reviewId),
  });
}

export function useGetReviewsByReservationId(
  reservationId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReviewsByReservationId', reservationId],
    queryFn: () => ReviewService.getReviewsByReservationId(reservationId),
  });
}

export function useCreateReview(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createReview'],
    mutationFn: newReview => ReviewService.createReview(newReview),
  });
}

export function useUpdateReview(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateReview'],
    mutationFn: updatedReview =>
      ReviewService.updateReview(updatedReview.id, updatedReview),
  });
}

export function useDeleteReview(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['deleteReview'],
    mutationFn: id => ReviewService.deleteReview(id),
  });
}
