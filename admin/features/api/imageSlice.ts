import { apiSlice } from "./apiSlice";

export const imageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

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

export const { useUploadImageMutation } = imageSlice;
