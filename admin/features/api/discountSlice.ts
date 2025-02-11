import { apiSlice } from "./apiSlice";

interface UpdateDiscountStateData {
  id: string;
  isActive: boolean;
}

type DiscountType = 'category' | 'product' | 'all' | 'promotion';

interface PromoCodeFormValues {
  discountName: string;
  discountType: DiscountType;
  code?: string;
  categoryId?: string[];
  productId?: string[];
  unitDiscount: number;
  packDiscount: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

export const discountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiscounts: builder.query({
      query: () => ({
        url: "/discount",
        method: "GET",
      }),
    }),
    updateDiscountState: builder.mutation<void, UpdateDiscountStateData>({
      query: ({ id, isActive }) => ({
        url: `/discount/${id}/${isActive ? 'activate' : 'deactivate'}`,
        method: "PUT",
      }),
    }),
    deleteDiscount: builder.mutation<void, string>({
      query: (id) => ({
        url: `/discount/${id}`,
        method: "DELETE",
      }),
    }),
    addDiscount: builder.mutation<void, PromoCodeFormValues>({
      query: (data) => ({
        url: `/discount`,
        method: "POST",
        body: data,
      }),
    }),
    updateDiscount: builder.mutation<void, { id: string | undefined; data: PromoCodeFormValues }>({
      query: ({ id, data }) => ({
        url: `/discount/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDiscountsQuery,
  useUpdateDiscountStateMutation,
  useDeleteDiscountMutation,
  useAddDiscountMutation,
  useUpdateDiscountMutation,
} = discountSlice;
