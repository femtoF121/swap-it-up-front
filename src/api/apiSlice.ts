import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/User`, credentials: "include" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getInfo: builder.query<any, void>({
      query: () => "/GetInfo",
    }),
  }),
});

export const { useLoginMutation, useLazyGetInfoQuery } = apiSlice;
