//External Lib Import
import { createApi } from '@reduxjs/toolkit/query/react';

//Internal Lib Import
import basefetchBaseQuery from './baseQuery';

export const dashboardService = createApi({
  reducerPath: 'dashboard',
  tagTypes: ['dashboardSummary'],
  baseQuery: basefetchBaseQuery('dashboard'),
  endpoints: (builder) => ({
    dashboardSummary: builder.query({
      query: () => ({
        url: 'dashboardSummary',
        method: 'GET',
      }),
      providesTags: ['dashboardSummary'],
    }),
  }),
});

export const { useDashboardSummaryQuery, useLazyDashboardSummaryQuery } = dashboardService;
