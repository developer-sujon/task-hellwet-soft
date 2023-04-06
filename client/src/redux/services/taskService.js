//Internal Lib Import
import { apiService } from './baseQuery';
import { dashboardService } from './dashboardService';

export const taskService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    taskList: builder.query({
      query: () => ({
        url: 'task/taskList',
        method: 'GET',
      }),
    }),
    taskCreate: builder.mutation({
      query: (postBody) => ({
        url: 'task/taskCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('taskList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    taskUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `task/taskUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        const patchTask = dispatch(
          apiService.util.updateQueryData('taskList', undefined, (draft) => {
            const findIndex = draft.data.findIndex((role) => role.id === id);
            draft.data[findIndex].title = postBody.title;
            draft.data[findIndex].status = postBody.status;
            draft.data[findIndex].dueDate = postBody.dueDate;
            draft.data[findIndex].descriptions = postBody.descriptions;
          })
        );

        try {
          await queryFulfilled;
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          patchTask.undo();
        }
      },
    }),
    taskDelete: builder.mutation({
      query: (id) => ({
        url: `task/taskDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchTask = dispatch(
          apiService.util.updateQueryData('taskList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchTask.undo();
        }
      },
    }),
  }),
});

export const { useTaskCreateMutation, useTaskListQuery, useTaskUpdateMutation, useTaskDeleteMutation } = taskService;
