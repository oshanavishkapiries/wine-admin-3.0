import type { Types } from 'mongoose';

export interface Product {
  product: Types.ObjectId;
  quantity: number;
}

export interface Order {
  _id?: Types.ObjectId;
  user: any;
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
  status: 'pending' | 'delivered' | 'cancelled';
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

export interface UpdateOrderStatusParams {
  orderId: string;
  status: Order['status'];
  statusMessage?: string;
}
