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
  status: 'PENDING' | 'DELIVERED' | 'CANCELLED';
  statusMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
