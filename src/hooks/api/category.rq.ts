import {ErrorModel} from '@models/api.model';
import {CategoryService} from '@services/category/category.service';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

export function useGetAllSalesCategories(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllSalesCategories'],
    queryFn: () => CategoryService.getAllSalesCategories(),
  });
}

export function useGetAllServiceCategories(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllServiceCategories'],
    queryFn: () => CategoryService.getAllServiceCategories(),
  });
}

export function useGetCategoriesByType(
  type: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getCategoriesByType', type],
    queryFn: () => CategoryService.getCategoriesByType(type),
  });
}

export function useGetAllSubCategoriesByID(
  categoryId: number,
  type: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllSubCategoriesByID', categoryId],
    queryFn: () =>
      CategoryService.getSubCategoriesByCategroryId(categoryId, type),
    enabled: !!categoryId,
  });
}

export function useGetPredefineItemsBySubCategroryId(
  subCategoryId: number,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getPredefineItemsBySubCategroryId', subCategoryId],
    queryFn: () =>
      CategoryService.getPredefineItemsBySubCategroryId(subCategoryId),
    enabled: !!subCategoryId,
  });
}

export function useGetPredefineServicesBySubCategroryId(
  subCategoryId: number,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getPredefineServicesBySubCategroryId', subCategoryId],
    queryFn: () =>
      CategoryService.getPredefineServicesBySubCategroryId(subCategoryId),
    enabled: !!subCategoryId,
  });
}
