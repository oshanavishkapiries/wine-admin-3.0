import { apiSlice } from './apiSlice';

type Status = "" | "pending" | "delivered" | "cancelled";

export interface Product {
  product: any;
  quantity: number;
  isPack?: boolean;
  packSize?: number;
}

export interface Order {
  _id: string;
  user: any;
  products: Product[];
  totalAmount: number;
  mobileNumber: string;
  userComments?: string;
  paymentMethod: 'Cash' | 'Card';
  shippingAddress?: any;
  paymentId?: any;
  paymentStatus: 'pending' | 'paid' | 'failed';
  editable: boolean;
  deliveryType: 'Delivery' | 'Pickup';
  deliveryDate?: Date;
  status: Status;
  statusMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrdersResponse {
  docs: Order[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface GetAllOrdersParams {
  page: number;
  limit: number;
  status?: Status;
}

export interface OrderStatusUpdate {
  orderId: string;
  data: {
    status: string;
  };
}

export interface UpdateOrderData {
  orderId: string;
  updates: Partial<Order>;
}
export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orderStatus: builder.mutation<Order, OrderStatusUpdate>({
      query: ({ orderId, data }) => ({
        url: `orders/orders/${orderId}/status`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
    getAllOrders: builder.query<OrdersResponse, GetAllOrdersParams>({
      query: ({ page, limit, status }) => ({
        url: `/orders/orders?page=${page}&limit=${limit}&status=${status}`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => ({
        url: `/orders/orders/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { order: Order }) => response.order,
      // providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<Order, UpdateOrderData>({
      query: ({ orderId, updates }) => ({
        url: `orders/${orderId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useOrderStatusMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = orderApi;
