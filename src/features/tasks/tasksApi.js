import { apiSlice } from '../api/apiSlice';

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    addTask: builder.mutation({
      query: ({ data }) => ({
        url: `/tasks`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          if (data?.data?.id) {
            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                draft.push(data?.data);
              }),
            );
            // update messages cache pessimistically end
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    editTaskStatus: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    editTask: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          if (data?.data?.id) {
            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                const editedTaskIndex = draft.findIndex((c) => c.id == arg.id);
                draft.splice(editedTaskIndex, 1, data?.data);
              }),
            );
            // update messages cache pessimistically end
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const result = dispatch(
          apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
            const deletedTaskIndex = draft.findIndex((c) => c.id == arg.id);
            draft.splice(deletedTaskIndex, 1);
          }),
        );
        // optimistic cache update end
        try {
          const data = await queryFulfilled;
          return data;
        } catch (err) {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskStatusMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTaskQuery,
} = tasksApi;
