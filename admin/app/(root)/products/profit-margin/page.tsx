'use client';

import { profitMarginColumns } from '@/components/sections/category/profit/columns';
import { DataTableProfit } from '@/components/sections/category/profit/data-table';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getCategories } from '@/utils/categoryUtils';

export default function CategoryPage() {
  const { data: metaData } = useGetMetaQuery({});
  console.log('metaData: ', metaData);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Profite Margin</h1>
          </div>
          <DataTableProfit
            columns={profitMarginColumns}
            data={getCategories(metaData) || []}
          />
        </div>
      </div>
    </div>
  );
}
