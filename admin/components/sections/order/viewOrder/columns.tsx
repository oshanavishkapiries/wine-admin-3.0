'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Product {
  product: any;
  quantity: number;
  isPack?: boolean;
  packSize?: number;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => `${row.original?.quantity}`,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.original?.product?.name}`,
  },
  {
    accessorKey: 'isPack',
    header: 'Type',
    cell: ({ row }) => `${row.original?.isPack ? 'Pack' : 'Bottle'}`,
  },
  {
    accessorKey: 'price',
    header: 'per price',
    // cell: ({ row }) => `${row.original.product.unitPrice}`,
    cell: ({ row }) => {
      const data = row.original;
      console.log(data);

      const packPrice = data?.isPack
        ? (data?.product?.pack?.find(
            (pack: any) => pack?.packSize === data?.packSize
          )?.packPrice ?? 0)
        : 0;

      console.log(packPrice);

      const discountPrice = () => {
        if (data.isPack) {
          if (!(data.product.packDiscount > 0)) return 0;

          return packPrice - (packPrice * data.product.packDiscount) / 100;
        }

        if (!(data.product.unitDiscount > 0)) return 0;

        return (
          data.product.unitPrice -
          (data.product.unitPrice * data.product.unitDiscount) / 100
        );
      };

      return (
        <div className="flex flex-col items-center gap-2">
          <span className={discountPrice() > 0 ? 'line-through' : ''}>
            $
            {data.isPack
              ? packPrice?.toFixed(2)
              : data?.product?.unitPrice?.toFixed(2)}
          </span>
          <span>
            {discountPrice() == 0 ? null : `$${discountPrice().toFixed(2)}`}
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
      console.log(data);

      const packPrice = data?.isPack
        ? (data?.product?.pack?.find(
            (pack: any) => pack.packSize === data?.packSize
          )?.packPrice ?? 0)
        : 0;

      console.log(packPrice);

      const discountPrice = () => {
        if (data.isPack) {
          if (!(data.product.packDiscount > 0)) return 0;

          return packPrice - (packPrice * data.product.packDiscount) / 100;
        }

        if (!(data.product.unitDiscount > 0)) return 0;

        return (
          data.product.unitPrice -
          (data.product.unitPrice * data.product.unitDiscount) / 100
        );
      };

      const total =
        (discountPrice() > 0
          ? discountPrice()
          : data.isPack
            ? packPrice
            : data.product.unitPrice) * data.quantity;
      return `$${total.toFixed(2)}`;
    },
  },
];
