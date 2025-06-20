import {ErrorModel} from '@models/api.model';
import {SalesService} from '@services/sales/sales.service';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export function useGetAllSales(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllSalse'],
    queryFn: () => SalesService.getAllSales(),
  });
}

export function useGetMySales(userId: string): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMySales', userId],
    queryFn: () => SalesService.getMySales(userId),
  });
}

export function useGetSaleByID(
  saleId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMySales', saleId],
    queryFn: () => SalesService.getSaleById(saleId),
    enabled: !!saleId,
  });
}

export function useCreateSale(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createSale'],
    mutationFn: sale => SalesService.createSale(sale),
  });
}

export function useUpdateSale(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['updateSale'],
    mutationFn: ({sale, saleId}) => SalesService.updateSale(sale, saleId),
  });
}

export function useDeleteSale(): UseMutationResult<
  any,
  ErrorModel,
  {saleId: string},
  unknown
> {
  return useMutation<any, ErrorModel, {saleId: string}, unknown>({
    mutationKey: ['deleteSale'],
    mutationFn: ({saleId}) => SalesService.deleteSale(saleId),
  });
}
