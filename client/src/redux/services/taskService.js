//Internal Lib Import
import basefetchBaseQuery from './baseQuery';

export const taskService = basefetchBaseQuery.injectEndpoints({
  endpoints: (builder) => ({
    taskCreate: builder.mutation({
      query: (postBody) => ({
        url: 'task/taskCreate',
        method: 'POST',
        body: postBody,
      }),
      invalidatesTags: ['Task'],
    }),
    taskList: builder.query({
      query: () => ({
        url: 'task/taskList',
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    taskdropDown: builder.query({
      query: () => ({
        url: 'TaskdropDown',
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    taskPaginate: builder.query({
      query: ({ pageNumber, perPage, order, searchKey }) => ({
        url: `TaskPaginate/${pageNumber + '/' + perPage + '/' + order + '/' + searchKey}`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    taskDetails: builder.mutation({
      query: (id) => ({
        url: `task/taskDetails/${id}`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    taskUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `task/taskUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),
      invalidatesTags: ['Task'],
    }),
    taskDelete: builder.mutation({
      query: (id) => ({
        url: `task/taskDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useTaskCreateMutation,
  useTaskListQuery,
  useTaskdropDownQuery,
  useTaskPaginateQuery,
  useTaskDetailsMutation,
  useTaskUpdateMutation,
  useTaskDeleteMutation,
} = taskService;
