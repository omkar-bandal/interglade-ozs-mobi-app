import {ErrorModel} from '@models/api.model';
import {SearchFilters} from '@services/search/search.model';
import {SearchService} from '@services/search/search.service';
import {useQuery} from '@tanstack/react-query';

export const useSearch = (filters: SearchFilters) => {
  return useQuery<any, ErrorModel>({
    queryKey: ['search', filters],
    queryFn: () => SearchService.search(filters),
    enabled: !!filters.type,
    refetchOnWindowFocus: false,
  });
};
