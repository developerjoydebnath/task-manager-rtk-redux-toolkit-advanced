import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portfolio-server-pied-one.vercel.app/api/v3/',
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
