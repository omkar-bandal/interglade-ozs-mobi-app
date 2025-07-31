import {ErrorModel} from '@models/api.model';
import {ReservationService} from '@services/reservation/services/reservation-service.service';
import {useMutation, useQuery, UseQueryResult} from '@tanstack/react-query';

export const useGetAllServiceReservations = (): UseQueryResult<
  any,
  ErrorModel
> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllServiceReservations'],
    queryFn: () => ReservationService.getAllServiceReservations(),
  });
};

export const useGetMyServiceReservations = (
  userId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMyServiceReservations', userId],
    queryFn: () => ReservationService.getMyServiceReservations(userId),
  });
};

export const useGetServiceReservationById = (
  reservationId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceReservationById', reservationId],
    queryFn: () => ReservationService.getServiceReservationById(reservationId),
    enabled: !!reservationId,
  });
};

export const useCreateServiceReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createServiceReservation'],
    mutationFn: reservation =>
      ReservationService.createServiceReservation(reservation),
  });
};

export const useUpdateServiceReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateServiceReservation'],
    mutationFn: ({reservation, reservationId}) =>
      ReservationService.updateServiceReservation(reservation, reservationId),
  });
};

export const useDeleteServiceReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['deleteServiceReservation'],
    mutationFn: reservationId =>
      ReservationService.deleteServiceReservation(reservationId),
  });
};

export const useGetServiceReservationByServiceId = (
  serviceId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceReservationByServiceId', serviceId],
    queryFn: () =>
      ReservationService.getServiceReservationByServiceId(serviceId),
    enabled: !!serviceId,
  });
};

export const useGetServiceReservationByUserId = (
  userId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceReservationByUserId', userId],
    queryFn: () => ReservationService.getServiceReservationByUserId(userId),
    enabled: !!userId,
  });
};

export const useGetServiceReservationByUserIdAndStatus = (
  userId: string,
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceReservationByUserIdAndStatus', userId, status],
    queryFn: () =>
      ReservationService.getServiceReservationByUserIdAndStatus(userId, status),
    enabled: !!userId && !!status,
  });
};

export const useGetServiceReservationByProviderId = (
  providerId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceReservationByProviderId', providerId],
    queryFn: () =>
      ReservationService.getServiceReservationByProviderId(providerId),
    enabled: !!providerId,
  });
};

export const useGetServiceReservationByProviderIdAndStatus = (
  providerId: string,
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: [
      'getServiceReservationByProviderIdAndStatus',
      providerId,
      status,
    ],
    queryFn: () =>
      ReservationService.getServiceReservationByProviderIdAndStatus(
        providerId,
        status,
      ),
    enabled: !!providerId && !!status,
  });
};

export const useGetServiceReservationByStatus = (
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceReservationByStatus', status],
    queryFn: () => ReservationService.getServiceReservationByStatus(status),
    enabled: !!status,
  });
};
