'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductDeletePopup from './product-delete-popup';

export type Product = {
  _id: string;
  name: string;
  qtyOnHand: number;
  unitPrice: number;
  categories: {
    name: string;
  };
  size: {
    name: string;
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => `${row.original?.categories?.name}`,
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => `${row.original?.size?.name}`,
  },
  {
    accessorKey: 'qtyOnHand',
    header: 'Quantity',
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => `$${row.original?.unitPrice?.toFixed(2)}`,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original;
      const router = useRouter();

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted"
            onClick={() => router.push(`/products/view/${product._id}`)}
            title="View product"
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View product</span>
          </Button>

          <a href={`/products/edit-${product._id}`}>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 hover:bg-muted"
              title="Edit product"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit product</span>
            </Button>
          </a>

          <ProductDeletePopup product={product} />
        </div>
      );
    },
  },
];
