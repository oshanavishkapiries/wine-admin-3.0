'use client';

import { columns } from '@/components/sections/order/columns';
import { DataTable } from '@/components/sections/order/data-table';
import { useGetAllOrdersQuery } from '@/features/api/orderSlice';
import { getOrdersData, getTotalPages } from '@/utils/orderUtils';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

const OrderPage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  });

  const {
    data: orders,
    isLoading,
  } = useGetAllOrdersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  console.log(orders);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">
          Order Management
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </h1>

      </div>

      <DataTable
        columns={columns}
        data={getOrdersData(orders) || []}
        pageCount={getTotalPages(orders, pagination.pageSize)}
        onPaginationChange={setPagination}
      />
    </div>
  );
};

export default OrderPage;
