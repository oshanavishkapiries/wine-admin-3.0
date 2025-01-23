'use client';

import { AddSubcategory } from '@/components/sections/category/add';
import { subCategoryColumns } from '@/components/sections/category/columns';
import { DataTableSubCategory } from '@/components/sections/category/data-table';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getSubCategory } from '@/utils/categoryUtils';

export default function CategoryPage() {
  const { data: metaData } = useGetMetaQuery({});
  console.log('metaData: ', metaData);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Category</h1>
            <AddSubcategory>
              <Button>+ Add Sub Category</Button>
            </AddSubcategory>
          </div>
          <DataTableSubCategory
            columns={subCategoryColumns}
            data={getSubCategory(metaData) || []}
          />
        </div>
      </div>
    </div>
  );
}
