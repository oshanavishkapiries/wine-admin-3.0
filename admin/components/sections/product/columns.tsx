"use client"

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Product = {
  _id: string;
  name: string;
  qtyOnHand: number;
  unitPrice: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'qtyOnHand',
    header: 'Quantity',
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => `$${row.original.unitPrice.toFixed(2)}`,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        try {
          // Add your delete API call here
          toast.success('Product deleted successfully');
          router.refresh();
        } catch (error) {
          console.log(error);
          toast.error('Failed to delete product');
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted"
            onClick={() => router.push(`/products/edit/${product._id}`)}
            title="Edit product"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit product</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 hover:bg-muted text-destructive hover:text-destructive"
                title="Delete product"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete product</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product "{product.name}" and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
