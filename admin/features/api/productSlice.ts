import { apiSlice } from './apiSlice';

interface Product {
  name: string;
  description: string;
  unitBuyingPrice: number;
  unitPrice: number;
  packSize: number;
  packBuyingPrice: number;
  packPrice: number;
  rating: number;
  qtyOnHand: number;
  isGreatForGift: boolean;
  categories: {
    name: string;
    subCategories: {
      name: string;
    };
  };

  regions: {
    region: string;
    subRegion: {
      name: string;
    }[];
  };
  subRegions: string[];
  dryness: {
    name: string;
  };
  country: {
    name: string;
  };
  vintage: {
    year: string;
  };
  abv: number;
  collectables: string[];
  image?: string;
  inStock: boolean;
  type: {
    name: string;
  }[];
  isPack: boolean;
  size: {
    name: string;
  };
}
interface ProductListParams {
  page: number;
  limit: number;
  categoryId?: string;
  search?: string;
}

interface ProductCreateData {
  data: Product;
}

interface ProductUpdateData {
  id: string;
  formData: FormData;
}

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productCreate: builder.mutation<Product, ProductCreateData>({
      query: (data) => ({
        url: '/products/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    getAllProducts: builder.query<Product[], ProductListParams>({
      query: () => ({
        url: `/products?page=1&limit=100000`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data.docs,
    }),

    productList: builder.query<any, ProductListParams>({
      query: ({ page, limit, categoryId, search }) => ({
        url: `/products?page=${page}&limit=${limit}&categoryId=${
          categoryId ?? ''
        }&search=${search ?? ''}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    getAProduct: builder.query<ProductCreateData, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    updateProduct: builder.mutation<Product, ProductUpdateData>({
      query: (data) => ({
        url: `/products/update/${data.id}`,
        method: 'PUT',
        body: data.formData,
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useProductCreateMutation,
  useProductListQuery,
  useGetAProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} = productSlice;
