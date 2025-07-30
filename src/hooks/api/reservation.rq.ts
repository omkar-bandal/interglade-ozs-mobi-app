import {ErrorModel} from '@models/api.model';
import {ReservationService} from '@services/reservation/reservation.service';
import {useMutation, useQuery, UseQueryResult} from '@tanstack/react-query';

export const useGetAllReservations = (): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllReservations'],
    queryFn: () => ReservationService.getAllReservations(),
  });
};

export const useGetMyReservations = (
  userId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMyReservations', userId],
    queryFn: () => ReservationService.getMyReservations(userId),
  });
};

export const useGetReservationById = (
  reservationId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationById', reservationId],
    queryFn: () => ReservationService.getReservationById(reservationId),
    enabled: !!reservationId,
  });
};

export const useCreateReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createReservation'],
    mutationFn: reservation =>
      ReservationService.createReservation(reservation),
  });
};

export const useUpdateReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateReservation'],
    mutationFn: ({reservation, reservationId}) =>
      ReservationService.updateReservation(reservation, reservationId),
  });
};

export const useDeleteReservation = () => {
  //const queryClient = useQueryClient();
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['deleteReservation'],
    mutationFn: reservationId =>
      ReservationService.deleteReservation(reservationId),
  });
};

export const useGetReservationByServiceId = (
  serviceId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationByServiceId', serviceId],
    queryFn: () => ReservationService.getReservationByServiceId(serviceId),
    enabled: !!serviceId,
  });
};

export const useGetReservationByUserId = (
  userId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationByUserId', userId],
    queryFn: () => ReservationService.getReservationByUserId(userId),
    enabled: !!userId,
  });
};

export const useGetReservationByUserIdAndStatus = (
  userId: string,
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationByUserIdAndStatus', userId, status],
    queryFn: () =>
      ReservationService.getReservationByUserIdAndStatus(userId, status),
    enabled: !!userId && !!status,
  });
};

export const useGetReservationByProviderId = (
  providerId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationByProviderId', providerId],
    queryFn: () => ReservationService.getReservationByProviderId(providerId),
    enabled: !!providerId,
  });
};

export const useGetReservationByProviderIdAndStatus = (
  providerId: string,
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationByProviderIdAndStatus', providerId, status],
    queryFn: () =>
      ReservationService.getReservationByProviderIdAndStatus(
        providerId,
        status,
      ),
    enabled: !!providerId && !!status,
  });
};

export const useGetReservationByStatus = (
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getReservationByStatus', status],
    queryFn: () => ReservationService.getReservationByStatus(status),
    enabled: !!status,
  });
};
