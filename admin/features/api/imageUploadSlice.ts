import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const imageUploadApi = createApi({
  reducerPath: "imageUploadApi",
  baseQuery,
  tagTypes: ['Images'],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/images/upload-image",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: 'Images' }],
    }),
    updateImage: builder.mutation({
      query: (data) => ({
        url: "/images/update-image",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: 'Images' }],
    }),
  }),
});

export const { useUploadImageMutation, useUpdateImageMutation } =
  imageUploadApi;
