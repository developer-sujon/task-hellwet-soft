//Internal Lib Import
import { apiService } from './baseQuery';

export const profileService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    profileDetails: builder.query({
      query: () => ({
        url: 'profile/profileDetails',
        method: 'GET',
      }),
    }),
  }),
});
export const { useProfileDetailsQuery } = profileService;
