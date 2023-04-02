//Internal Lib Import
import basefetchBaseQuery from './baseQuery';

export const dashboardService = basefetchBaseQuery.injectEndpoints({
  endpoints: (builder) => ({
    dashboardSummary: builder.query({
      query: () => ({
        url: 'dashboard/dashboardSummary',
        method: 'GET',
      }),
    }),
  }),
});

export const { useDashboardSummaryQuery } = dashboardService;
