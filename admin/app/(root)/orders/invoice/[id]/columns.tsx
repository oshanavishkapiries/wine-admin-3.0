'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Product {
  product: any;
  quantity: number;
  isPack?: boolean;
  packSize?: number;
}

const packPrice = (data: any) => {
  return data?.isPack
    ? (data?.product?.pack?.find(
      (pack: any) => pack.packSize === data?.packSize
    )?.packPrice ?? 0)
    : 0;
};

const discountPrice = (data: any) => {
  if (data.isPack) {
    if (!(data.product.packDiscount > 0)) return 0;

    return (
      packPrice(data) - (packPrice(data) * data.product.packDiscount) / 100
    );
  }

  if (!(data.product.unitDiscount > 0)) return 0;

  return (
    data.product.unitPrice -
    (data.product.unitPrice * data.product.unitDiscount) / 100
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => `${row.original.quantity}`,
  },
  {
    accessorKey: 'item',
    header: 'Item',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.product.name}</span>
        <span>{row.original?.product?.size?.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'isPack',
    header: 'Type',
    cell: ({ row }) => `${row.original.isPack ? 'Pack' : 'Bottle'}`,
  },
  {
    accessorKey: 'price',
    header: 'per price',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-2">
          <span className={discountPrice(data) > 0 ? 'line-through' : ''}>
            $
            {data.isPack
              ? packPrice(data).toFixed(2)
              : data.product.unitPrice.toFixed(2)}
          </span>
          <span>
            {discountPrice(data) == 0
              ? null
              : `$${discountPrice(data).toFixed(2)}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'deliveryType',
    header: 'Total',
    cell: ({ row }) => {
      const data = row.original;
      const total =
        (discountPrice(data) > 0
          ? discountPrice(data)
          : data.isPack
            ? packPrice(data)
            : data.product.unitPrice) * data.quantity;
      return `$${total.toFixed(2)}`;
    },
  },
];
