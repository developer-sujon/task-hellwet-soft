//Internal Lib Import
import basefetchBaseQuery from './baseQuery';

export const profileService = basefetchBaseQuery.injectEndpoints({
  endpoints: (builder) => ({
    profileDetails: builder.query({
      query: () => ({
        url: 'profileDetails',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
  }),
});
export const { useProfileDetailsQuery } = profileService;
