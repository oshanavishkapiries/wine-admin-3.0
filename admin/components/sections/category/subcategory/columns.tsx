'use client';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import DeletePopup from './deletePopup';
import { AddSubcategory } from './add';

export type SubCategory = {
  _id: string;
  name: string;
  categoryId: string;
};

export const columns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const subCategory = row.original;

      return (
        <div className="flex items-center gap-2">
          <AddSubcategory
            mode="edit"
            initialData={{
              id: subCategory._id,
              name: subCategory.name,
              categoryId: subCategory.categoryId,
            }}
          >
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 hover:bg-muted"
              title="Edit sub-category"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit sub-category</span>
            </Button>
          </AddSubcategory>

          <DeletePopup subCategoryId={subCategory._id} />
        </div>
      );
    },
  },
];
