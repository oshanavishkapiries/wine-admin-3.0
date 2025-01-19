'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { columns } from '@/components/sections/product/columns';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/sections/product/data-table';
import { useProductListQuery } from '@/features/api/productSlice';
import { getProductsData, getTotalPages } from '@/utils/productUtils';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getCategoryOptions } from '@/utils/categoryUtils';
import Dropdown from '@/components/form/DropDownForm';

const ProductPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const { data: metaData } = useGetMetaQuery({});
  const { data: products, isLoading } = useProductListQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search,
    categoryId: selectedCategory,
  });

  const categoryOptions = getCategoryOptions(metaData);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">
          Product Management
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 w-[350px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Dropdown
            disabled={!metaData}
            className="w-[250px]"
            label=""
            options={categoryOptions}
            onSelect={(value) => {
              setSelectedCategory(value);
            }}
            buttonVariant="outline"
          />

          <Button onClick={() => router.push('products/product-add')}>
            Add Product
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={getProductsData(products || [])}
        pageCount={getTotalPages(products, pagination.pageSize)}
        onPaginationChange={setPagination}
      />
    </div>
  );
};

export default ProductPage;
