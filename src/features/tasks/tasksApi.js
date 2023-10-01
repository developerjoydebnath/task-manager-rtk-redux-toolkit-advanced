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
          if (data?.data?._id) {
            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                const newData = { ...arg.data, _id: data.data._id };
                draft.push(newData); // to add the new data to the bottom
                // draft.unshift(newData); // to add the new data to the top
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

          if (data?.data?._id) {
            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                const editedTaskIndex = draft.findIndex((c) => c._id == arg.id);
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
        // const result = dispatch(
        //   apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
        //     const deletedTaskIndex = draft.findIndex((c) => c._id == arg.id);
        //     draft.splice(deletedTaskIndex, 1);
        //   }),
        // );
        // optimistic cache update end
        try {
          const data = await queryFulfilled;
          if (data?.data?._id) {
            dispatch(
              apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                console.log(JSON.stringify(draft));
                console.log(data.data);
                const deletedTaskIndex = draft.findIndex((c) => c._id == arg.id);
                console.log(deletedTaskIndex);
                draft.splice(deletedTaskIndex, 1);
                console.log(JSON.stringify(draft));
                return draft;
              }),
            );
          }
        } catch (err) {
          console.log(err);
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
