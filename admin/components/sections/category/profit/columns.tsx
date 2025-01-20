'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import { EditProfitPopup } from './editPopup';

export type ProfitMargin = {
  _id: string;
  name: string;
  margin: string;
};

export const profitMarginColumns: ColumnDef<ProfitMargin>[] = [
  {
    accessorKey: 'name',
    header: 'Category',
  },
  {
    accessorKey: 'margin',
    header: 'Margin (%)',
    cell: ({ row }) => {
      return `${row.original.margin}%`;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditProfitPopup
            initialData={{
              id: category._id,
              margin: category.margin,
              name: category.name,
            }}
          >
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 hover:bg-muted"
              title="Edit margin"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit margin</span>
            </Button>
          </EditProfitPopup>
        </div>
      );
    },
  },
];
