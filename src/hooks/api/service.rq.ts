import {ErrorModel} from '@models/api.model';
import {ServiceService} from '@services/service/service.service';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export function useGetAllServices(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllServices'],
    queryFn: () => ServiceService.getAllServices(),
  });
}

export function useGetAllServicesExpectUser(
  userId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllServicesExpectUser', userId],
    queryFn: () => ServiceService.getAllServicesExpectUser(userId),
  });
}

export function useGetMyServices(
  userId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMyServices', userId],
    queryFn: () => ServiceService.getMyServices(userId),
  });
}

export function useGetServiceById(
  serviceId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getServiceById', serviceId],
    queryFn: () => ServiceService.getServiceById(serviceId),
    enabled: !!serviceId,
  });
}

export function useCreateService(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createService'],
    mutationFn: service => ServiceService.createService(service),
  });
}

export function useUpdateService(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateService'],
    mutationFn: ({service, serviceId}) =>
      ServiceService.updateService(service, serviceId),
  });
}

export function useDeleteService(): UseMutationResult<
  any,
  ErrorModel,
  {serviceId: string},
  unknown
> {
  return useMutation<any, ErrorModel, {serviceId: string}, unknown>({
    mutationKey: ['deleteService'],
    mutationFn: ({serviceId}) => ServiceService.deleteService(serviceId),
  });
}
