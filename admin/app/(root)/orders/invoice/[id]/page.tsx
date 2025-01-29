'use client';

import { notFound } from 'next/navigation';
import { useGetOrderByIdQuery } from '@/features/api/orderSlice';
import Error from 'next/error';
import OrderInvoiceClient from './order-invoice-client';

export default function OrderInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(params.id);
  const order = orderData;

  console.log(order);

  if (isLoading) return <div>Loading ....</div>;

  if (!order) return notFound();

  if (isError) return <Error statusCode={400} />;

  return <OrderInvoiceClient order={order} />;
}
