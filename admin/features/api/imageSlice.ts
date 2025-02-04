import { apiSlice } from "./apiSlice";

export const imageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    uploadImage: builder.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: "/images/upload-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Images"],
      transformResponse: (response: any) => response.data,
    }),
    getImage: builder.query({
      query: () => ({
        url: "/images/get-images",
        method: "GET",
      }),
      providesTags: ["Images"],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useUploadImageMutation, useGetImageQuery } = imageSlice;
