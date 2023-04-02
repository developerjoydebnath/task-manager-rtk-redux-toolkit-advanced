import { apiSlice } from '../api/apiSlice';

export const teamMembersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => '/team',
    }),
  }),
});

export const { useGetTeamMembersQuery } = teamMembersApi;
