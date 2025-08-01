import {ErrorModel} from '@models/api.model';
import {AddressService} from '@services/address/address.service';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export function useGetAllAddresses(
  userId: string,
  isFocused: boolean = true,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllAddresses', userId],
    queryFn: () => AddressService.getAllAddressesByUserId(userId),
    subscribed: isFocused,
  });
}

export function useGetAddressById(
  addressId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAddressById', addressId],
    queryFn: () => AddressService.getAddressById(addressId),
    enabled: !!addressId,
  });
}

export function useCreateAddress(
  userId: string,
): UseMutationResult<any, ErrorModel, any, unknown> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createAddress'],
    mutationFn: addressData =>
      AddressService.createAddress(userId, addressData),
  });
}

export function useUpdateAddress(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateAddress'],
    mutationFn: addressData =>
      AddressService.updateAddress(addressData.id, addressData),
  });
}

export function useDeleteAddress(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['deleteAddress'],
    mutationFn: addressId => AddressService.deleteAddress(addressId),
  });
}

// import {ErrorModel} from '@models/api.model';
// import {AddressService} from '@services/address/address.service';
// import {
//   useMutation,
//   UseMutationResult,
//   useQuery,
//   UseQueryResult,
// } from '@tanstack/react-query';

// export function useCreateAddress(): UseMutationResult<
//   any,
//   ErrorModel,
//   any,
//   unknown
// > {
//   return useMutation<any, ErrorModel, any, unknown>({
//     mutationKey: ['createSale'],
//     mutationFn: address => AddressService.createAddress(address),
//   });
// }

// export function useUpdateAddress(): UseMutationResult<
//   any,
//   ErrorModel,
//   any,
//   unknown
// > {
//   return useMutation<any, ErrorModel, any, unknown>({
//     mutationKey: ['updateAddress'],
//     mutationFn: ({address, addressId}) =>
//       AddressService.updateAddress(address, addressId),
//   });
// }

// export function useGetAllAddress(): UseQueryResult<any, ErrorModel> {
//   return useQuery<any, ErrorModel>({
//     queryKey: ['getAllAddresss'],
//     queryFn: () => AddressService.getAllAddress(),
//   });
// }

// export function useGetAddressById(
//   addressId: string,
// ): UseQueryResult<any, ErrorModel> {
//   return useQuery<any, ErrorModel>({
//     queryKey: ['getAddressById', addressId],
//     queryFn: () => AddressService.getAddressById(addressId),
//     enabled: !!addressId,
//   });
// }

// export function useDeleteAddress(): UseMutationResult<
//   any,
//   ErrorModel,
//   string,
//   unknown
// > {
//   return useMutation<any, ErrorModel, string, unknown>({
//     mutationKey: ['deleteAddress'],
//     mutationFn: addressId => AddressService.deleteAddress(addressId),
//   });
// }
