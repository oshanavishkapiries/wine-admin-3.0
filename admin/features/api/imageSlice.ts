import { apiSlice } from "./apiSlice";

export const imageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query({
      query: (imageUrl) => ({
        url: `/images/${imageUrl}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),

    uploadImage: builder.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: "/images/upload-image",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetImageQuery, useUploadImageMutation } = imageSlice;
