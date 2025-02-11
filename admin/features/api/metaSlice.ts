import { apiSlice } from "./apiSlice";

export const metaSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMeta: builder.query({
      query: () => ({
        url: "meta-data/all",
        method: "GET",
      }),
      providesTags: ['metaData'],
    }),
  }),
});

export const { useGetMetaQuery } = metaSlice;
