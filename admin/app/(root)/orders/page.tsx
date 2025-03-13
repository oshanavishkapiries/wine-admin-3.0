'use client';

import { columns } from '@/components/sections/order/columns';
import { DataTable } from '@/components/sections/order/data-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllOrdersQuery } from '@/features/api/orderSlice';
import { getOrdersData, getTotalPages } from '@/utils/orderUtils';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

type Status = '' | 'pending' | 'delivered' | 'cancelled';

const OrderPage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  });
  const [status, setStatus] = useState<Status>('pending');
  const [search, setSearch] = useState<string | null>(null);

  // const handleSearch = () => {
  //   if (searchRef.current) {
  //     const searchValue = searchRef.current.value;
  //     setSearch(searchValue === '' ? null : searchValue);
  //   }
  // };

  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: status,
    search: search,
  });

  console.log(orders);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">
          Order Management
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </h1>

        <div className="flex gap-2 flex-row-reverse">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search orders..." onChange={(e) => setSearch(e.target.value)} />
            {/* <Button type="submit" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button> */}
          </div>

          <Select
            defaultValue={status == '' ? 'all' : status}
            onValueChange={(value: string) =>
              setStatus(value === 'all' ? '' : (value as Status))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
