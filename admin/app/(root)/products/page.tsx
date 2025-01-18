'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { columns, Product } from '@/components/sections/product/columns';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/sections/product/data-table';
import { useProductListQuery } from '@/features/api/productSlice';
import { getProductsData } from '@/utils/productUtils';
import { Loader2 } from 'lucide-react';

const ProductPage = () => {
  const router = useRouter();

  const { data: products , isLoading } = useProductListQuery({
    page: 1,
    limit: 10,
    search: '',
    categoryId: '',
  });

  

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold uppercase flex items-center gap-2">
          Product Management{' '}
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </h1>
        <Button onClick={() => router.push('products/product-add')}>
          Add Product
        </Button>
      </div>
      <DataTable columns={columns} data={getProductsData(products)} />
    </div>
  );
};

export default ProductPage;
