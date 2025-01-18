'use client';

import AddDropDown from '@/components/sections/discount/addDropDown';
import { columns } from '@/components/sections/discount/columns';
import { DataTable } from '@/components/sections/discount/data-table';
import { useGetDiscountsQuery } from '@/features/api/discountSlice';
import { Loader2 } from 'lucide-react';

export default function DiscountPage() {
  const { data: discounts, isLoading } = useGetDiscountsQuery({});

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">
          Discount Management {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : ''}
        </h1>
        <AddDropDown />
      </div>
      <DataTable columns={columns} data={discounts || []} />
    </div>
  );
}
