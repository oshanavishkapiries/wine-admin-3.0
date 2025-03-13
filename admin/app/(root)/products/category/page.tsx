'use client';

import { AddSubcategory } from '@/components/sections/category/add';
import { subCategoryColumns } from '@/components/sections/category/columns';
import { DataTableSubCategory } from '@/components/sections/category/data-table';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getCategoryOptions, getSubCategory } from '@/utils/categoryUtils';
import Dropdown from '@/components/form/DropDownForm';
import { useState, useEffect } from 'react';

export default function CategoryPage() {
  const { data: metaData } = useGetMetaQuery({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);

  const categoryOptions = [
    { value: '', label: 'All' },
    ...(getCategoryOptions(metaData) || []),
  ];

  useEffect(() => {
    const allSubCategories = getSubCategory(metaData) || [];

    if (selectedCategory) {
      setFilteredSubCategories(
        allSubCategories.filter((item) => item.categoryId === selectedCategory)
      );
    } else {
      setFilteredSubCategories(allSubCategories);
    }
  }, [selectedCategory, metaData]);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Category</h1>
            <div className="flex flex-row gap-4">
              <Dropdown
                label=""
                options={categoryOptions}
                onSelect={(value) => setSelectedCategory(value)}
                buttonVariant="outline"
                className="w-full"
              />
              <AddSubcategory>
                <Button>+ Add Sub Category</Button>
              </AddSubcategory>
            </div>
          </div>

          <DataTableSubCategory
            columns={subCategoryColumns}
            data={filteredSubCategories}
          />
        </div>
      </div>
    </div>
  );
}
