'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import {
  useDeleteDiscountMutation,
  useGetDiscountsQuery,
  useUpdateDiscountStateMutation,
} from '@/features/api/discountSlice';
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
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import Promocode from './promocode';
import CategoryDiscount from './category';
import { Discount } from '@/types';


export const columns: ColumnDef<Discount>[] = [
  {
    accessorKey: 'discountName',
    header: 'Discount Name',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate).toLocaleDateString();
      const endDate = new Date(row.original.endDate).toLocaleDateString();
      return `${startDate} - ${endDate}`;
    },
  },
  {
    accessorKey: 'discountType',
    header: 'Type',
    cell: ({ row }) => `${row.original.discountType}`,
  },
  {
    accessorKey: 'unitDiscount',
    header: 'Unit Discount',
    cell: ({ row }) => `${row.original.unitDiscount}%`,
  },

  {
    accessorKey: 'packDiscount',
    header: 'Pack Discount',
    cell: ({ row }) => `${row.original.packDiscount}%`,
  },
  {
    accessorKey: 'details',
    header: 'Details',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const discount = row.original;
      const [updateState] = useUpdateDiscountStateMutation();
      const [deleteDiscount] = useDeleteDiscountMutation();
      const { refetch: refetchDiscounts } = useGetDiscountsQuery({});
      const [isActive, setIsActive] = useState(discount.isActive);
      const router = useRouter();

      const handleStateChange = async (checked: boolean) => {
        try {
          await updateState({ id: discount._id, isActive: checked }).unwrap();
          toast.success(
            `Discount ${checked ? 'activated' : 'deactivated'} successfully`
          );
          setIsActive(checked);
          await refetchDiscounts();
          router.refresh();
        } catch (error) {
          console.log(error);
          toast.error('Failed to update discount state');
        }
      };

      const handleDelete = async () => {
        try {
          await deleteDiscount(discount._id).unwrap();
          toast.success('Discount deleted successfully');
          await refetchDiscounts();
          router.refresh();
        } catch (error) {
          console.log(error);
          toast.error('Failed to delete discount');
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={handleStateChange}
            className="data-[state=checked]:bg-primary"
          />

          {discount.discountType === 'promotion' && (
            <Promocode
              mode="edit"
              title="Edit Promo Code"
              description="Edit promotional code details"
              defaultValues={{
                discountName: discount.discountName,
                code: discount.code,
                unitDiscount: discount.unitDiscount,
                packDiscount: discount.packDiscount,
                startDate: discount.startDate,
                endDate: discount.endDate,
              }}
            >
              <Edit className="h-4 w-4" />
            </Promocode>
          )}

          {discount.discountType === 'category' && (
            <CategoryDiscount
              mode="edit"
              title="Edit Category Discount"
              description="Edit category-based discount details"
              defaultValues={{
                discountName: discount.discountName,
                categoryId: discount.categoryId,
                unitDiscount: discount.unitDiscount,
                packDiscount: discount.packDiscount,
                startDate: discount.startDate,
                endDate: discount.endDate,
              }}
            >
              <Edit className="h-4 w-4" />
            </CategoryDiscount>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 hover:bg-muted text-destructive hover:text-destructive"
                title="Delete discount"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete discount</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  discount &quot;{discount.discountName}&quot; and remove it from our
                  servers.
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
