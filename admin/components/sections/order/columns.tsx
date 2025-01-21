'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, ScrollText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductDeletePopup from './product-delete-popup';
import { Order } from '@/types/order';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'userName',
    header: 'User Name',
    cell: ({ row }) =>
      `${row.original.user.firstName} ${row.original.user.lastName}`,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => `${row.original.mobileNumber}`,
  },
  {
    accessorKey: 'deliveryType',
    header: 'Delivery type',
    cell: ({ row }) => `${row.original.deliveryType}`,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => 
      row.original.products.reduce((acc, { quantity }) => acc + quantity, 0),
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    cell: ({ row }) => `$${row.original.totalAmount.toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => `${row.original.status}`,
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
            onClick={() => router.push(`/products/edit/${product._id}`)}
            title="Edit product"
          >
            <ScrollText className="h-4 w-4" />
            <span className="sr-only">Edit product</span>
          </Button>

          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted"
            onClick={() => router.push(`/products/view/${product._id}`)}
            title="View product"
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View product</span>
          </Button>

          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted"
            onClick={() => router.push(`/products/edit/${product._id}`)}
            title="Edit product"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit product</span>
          </Button>

          {/* <ProductDeletePopup product={product} /> */}
        </div>
      );
    },
  },
];
