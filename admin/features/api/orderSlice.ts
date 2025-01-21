import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Order,
  OrdersResponse,
  OrderStatusUpdate,
  UpdateOrderData,
  GetAllOrdersParams,
} from '../type/order';
import { apiSlice } from './apiSlice';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orderStatus: builder.mutation<Order, OrderStatusUpdate>({
      query: ({ orderId, data }) => ({
        url: `orders/orders/${orderId}/status`,
        method: 'PUT',
        body: data,
      }),
    }),
    getAllOrders: builder.query<OrdersResponse, GetAllOrdersParams>({
      query: ({ page, limit }) => ({
        url: `/orders/orders?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => ({
        url: `/orders/orders/${id}`,
        method: 'GET',
      }),
    }),
    updateOrder: builder.mutation<Order, UpdateOrderData>({
      query: ({ orderId, updates }) => ({
        url: `orders/${orderId}`,
        method: 'PUT',
        body: updates,
      }),
    }),
  }),
});

export const {
  useOrderStatusMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = orderApi;
