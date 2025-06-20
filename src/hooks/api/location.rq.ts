import {ErrorModel} from '@models/api.model';
import {LocationService} from '@services/location/location.service';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

export function useGetGoggleMapAPIKey(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getGoggleMapAPIKey'],
    queryFn: () => LocationService.getGoogleMapAPIKey(),
  });
}
