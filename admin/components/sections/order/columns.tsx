'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, ScrollText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Order } from '@/types/order';
import ViewOrder from './viewOrder/order-view-popup';
import { useState } from 'react';
import { OrderViewDialog } from './editOrder/select-with-search';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'userName',
    header: 'User Name',
    cell: ({ row }) =>
      `${row.original?.user?.firstName} ${row.original?.user?.lastName}`,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => `${row.original?.mobileNumber}`,
  },
  {
    accessorKey: 'deliveryType',
    header: 'Delivery type',
    cell: ({ row }) => `${row.original?.deliveryType}`,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => (
      <div className="flex flex-col items-center gap-2">
        <div>
          <span className="text-muted-foreground">B: </span>
          <span>
            {row.original.products.reduce(
              (acc, { quantity, isPack }) => (isPack ? acc : acc + quantity),
              0
            )}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">P: </span>
          <span>
            {row.original.products.reduce(
              (acc, { quantity, isPack }) => (!isPack ? acc : acc + quantity),
              0
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    cell: ({ row }) => `$${row.original?.totalAmount?.toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === 'PENDING'
          ? 'bg-yellow-100 text-yellow-800'
          : status === 'DELIVERED'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';

      return <span className={`px-2 py-1 rounded-md ${color}`}>{status}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const order = row.original;
      const router = useRouter();

      const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
      const [dialogOpen, setDialogOpen] = useState(false);

      const handelEdit = (order: any) => {
        setSelectedOrder(order);
        setDialogOpen(true);
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted"
            onClick={() => router.push(`/orders/invoice/${order._id}`)}
            title="Edit product"
          >
            <ScrollText className="h-4 w-4" />
            <span className="sr-only">Edit product</span>
          </Button>

          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted"
            onClick={() => handelEdit(row.original)}
            title="Edit product"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit product</span>
          </Button>

          <ViewOrder order={order} />

          <OrderViewDialog
            order={selectedOrder}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        </div>
      );
    },
  },
];
