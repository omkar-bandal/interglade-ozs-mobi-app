import {ErrorModel} from '@models/api.model';
import {ReservationSalesService} from '@services/reservation/sales/reservation-sales.service';
//import { ReservationSalesService } from '@services/reservation/sales/reservation-sales.service';
import {useMutation, useQuery, UseQueryResult} from '@tanstack/react-query';

export const useGetAllSalesReservations = (): UseQueryResult<
  any,
  ErrorModel
> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllSalesReservations'],
    queryFn: () => ReservationSalesService.getAllSalesReservations(),
  });
};

export const useGetMySalesReservations = (
  userId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMySalesReservations', userId],
    queryFn: () => ReservationSalesService.getMySalesReservations(userId),
  });
};

export const useGetSalesReservationById = (
  reservationId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationById', reservationId],
    queryFn: () =>
      ReservationSalesService.getSalesReservationById(reservationId),
    enabled: !!reservationId,
  });
};

export const useCreateSalesReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createSalesReservation'],
    mutationFn: reservation =>
      ReservationSalesService.createSalesReservation(reservation),
  });
};

export const useUpdateSalesReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateSalesReservation'],
    mutationFn: ({reservation, reservationId}) =>
      ReservationSalesService.updateSalesReservation(
        reservation,
        reservationId,
      ),
  });
};

export const useDeleteSalesReservation = () => {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['deleteSalesReservation'],
    mutationFn: reservationId =>
      ReservationSalesService.deleteSalesReservation(reservationId),
  });
};

export const useGetSalesReservationByServiceId = (
  serviceId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationByServiceId', serviceId],
    queryFn: () =>
      ReservationSalesService.getSalesReservationByServiceId(serviceId),
    enabled: !!serviceId,
  });
};

export const useGetSalesReservationByUserId = (
  userId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationByUserId', userId],
    queryFn: () => ReservationSalesService.getSalesReservationByUserId(userId),
    enabled: !!userId,
  });
};

export const useGetSalesReservationByUserIdAndStatus = (
  userId: string,
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationByUserIdAndStatus', userId, status],
    queryFn: () =>
      ReservationSalesService.getSalesReservationByUserIdAndStatus(
        userId,
        status,
      ),
    enabled: !!userId && !!status,
  });
};

export const useGetSalesReservationByProviderId = (
  providerId: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationByProviderId', providerId],
    queryFn: () =>
      ReservationSalesService.getSalesReservationByProviderId(providerId),
    enabled: !!providerId,
  });
};

export const useGetSalesReservationByProviderIdAndStatus = (
  providerId: string,
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationByProviderIdAndStatus', providerId, status],
    queryFn: () =>
      ReservationSalesService.getSalesReservationByProviderIdAndStatus(
        providerId,
        status,
      ),
    enabled: !!providerId && !!status,
  });
};

export const useGetSalesReservationByStatus = (
  status: string,
): UseQueryResult<any, ErrorModel> => {
  return useQuery<any, ErrorModel>({
    queryKey: ['getSalesReservationByStatus', status],
    queryFn: () => ReservationSalesService.getSalesReservationByStatus(status),
    enabled: !!status,
  });
};
