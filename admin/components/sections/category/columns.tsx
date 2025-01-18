'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteSubCategoryMutation } from '@/features/api/categorySlice';
import { toast } from 'sonner';
import { CategoryPopup } from './categoryPopup';
import { useRouter } from 'next/navigation';
import { useGetMetaQuery } from '@/features/api/metaSlice';
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

export type Category = {
  id: string;
  SubCategory: string;
  Category: string;
  ProfitMargin: string;
  categoryId: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'SubCategory',
    header: 'Sub Category',
  },
  {
    accessorKey: 'Category',
    header: 'Category',
  },
  {
    accessorKey: 'ProfitMargin',
    header: 'Profit Margin',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const category = row.original;
      const [deleteSubCategory] = useDeleteSubCategoryMutation();
      const router = useRouter();
      const { refetch: refetchMeta } = useGetMetaQuery({});

      const handleDelete = async () => {
        try {
          await deleteSubCategory({ id: category.id }).unwrap();
          toast.success('Category deleted successfully');
          // Refresh meta data
          await refetchMeta();
          router.refresh();
        } catch (error) {
          console.log(error);
          toast.error('Failed to delete category');
        }
      };

      return (
        <div className="flex items-center gap-2">
          <CategoryPopup
            mode="edit"
            title="Edit Category"
            description="Edit category details"
            defaultValues={{
              categoryId: category.categoryId,
              subCategoryName: category.SubCategory,
              margin: parseInt(category.ProfitMargin),
              id: category.id,
            }}
          >
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 hover:bg-muted"
              title="Edit category"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit category</span>
            </Button>
          </CategoryPopup>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 hover:bg-muted text-destructive hover:text-destructive"
                title="Delete category"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete category</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  category "{category.SubCategory}" and remove it from our servers.
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
