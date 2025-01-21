'use client';

import { useGetAllOrdersQuery } from '@/features/api/orderSlice';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Dropdown from '@/components/form/DropDownForm';
import { OrderStatus } from '@/types/enum';
import { columns } from '@/components/sections/order/columns';
import { DataTable } from '@/components/sections/order/data-table';
import { getOrdersData, getTotalPages } from '@/utils/orderUtils';

const ordersPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<OrderStatus | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const { data: orderData, isLoading } = useGetAllOrdersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: selectedOrderStatus,
  });
  console.log(orderData);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">
          Order Management
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 w-[350px]">
            {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            /> */}
          </div>
          <Dropdown
            label=""
            options={Object.values(OrderStatus).map((category) => ({
              label: category,
              value: category,
            }))}
            onSelect={(value) => {
              setSelectedOrderStatus(value as OrderStatus);
            }}
            buttonVariant="outline"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={getOrdersData(orderData) || []}
        pageCount={getTotalPages(orderData, pagination.pageSize)}
        onPaginationChange={setPagination}
      />
    </div>
  );
};

export default ordersPage;
