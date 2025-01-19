'use client';

import { AddSubcategory } from '@/components/sections/category/subcategory/add';
import { columns } from '@/components/sections/category/subcategory/columns';
import { DataTable } from '@/components/sections/category/subcategory/data-table';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getSubCategory } from '@/utils/categoryUtils';

export default function CategoryPage() {
  const { data: metaData, isLoading } = useGetMetaQuery({});

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        {/* left side  */}
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Sub Category</h1>
            <AddSubcategory>
              <Button>+</Button>
            </AddSubcategory>
          </div>
          <DataTable columns={columns} data={getSubCategory(metaData)} />
        </div>
        {/* right side  */}
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl font-bold uppercase">Profite Margin</h1>
            <Button>+</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
