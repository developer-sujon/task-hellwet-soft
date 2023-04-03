//External Lib Import
import { createApi } from '@reduxjs/toolkit/query/react';

//Internal Lib Import
import basefetchBaseQuery from './baseQuery';

export const taskService = createApi({
  reducerPath: 'task',
  tagTypes: ['task'],
  baseQuery: basefetchBaseQuery('task'),
  endpoints: (builder) => ({
    taskCreate: builder.mutation({
      query: (postBody) => ({
        url: 'taskCreate',
        method: 'POST',
        body: postBody,
      }),
      invalidatesTags: ['task'],
    }),
    taskList: builder.query({
      query: () => ({
        url: 'taskList',
        method: 'GET',
      }),
      providesTags: ['task'],
    }),
    taskUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `taskUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),
      invalidatesTags: ['task'],
    }),
    taskDelete: builder.mutation({
      query: (id) => ({
        url: `taskDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['task'],
    }),
  }),
});

export const { useTaskCreateMutation, useTaskListQuery, useTaskUpdateMutation, useTaskDeleteMutation } = taskService;
