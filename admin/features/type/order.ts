import type { Types } from 'mongoose';

export interface Product {
  product: Types.ObjectId;
  quantity: number;
}

export interface Order {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: Product[];
  totalAmount: number;
  mobileNumber: string;
  userComments?: string;
  paymentMethod: 'Cash' | 'Card';
  shippingAddress: Types.ObjectId;
  paymentId?: Types.ObjectId;
  paymentStatus: 'pending' | 'paid' | 'failed';
  editable: boolean;
  deliveryType: 'Delivery' | 'Pickup';
  deliveryDate?: Date;
  status: 'PENDING' | 'DELIVERED' | 'CANCELLED';
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
  status?: 'PENDING' | 'DELIVERED' | 'CANCELLED' | null;
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
