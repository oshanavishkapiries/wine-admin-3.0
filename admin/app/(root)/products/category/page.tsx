'use client';

import CategoryPopup from '@/components/sections/category/categoryPopup';
import { columns } from '@/components/sections/category/columns';
import { DataTable } from '@/components/sections/category/data-table';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getCategoryData } from '@/utils/categoryUtils';
import { Loader2 } from 'lucide-react';


export default function CategoryPage() {
  const { data: metaData , isLoading } = useGetMetaQuery({});
  const categoryData = getCategoryData(metaData);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">Category Management {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : ''}</h1>
        <CategoryPopup mode="add">
          <Button>Add Category</Button>
        </CategoryPopup>
      </div>
      <DataTable columns={columns} data={categoryData || []} />
    </div>
  );
}
