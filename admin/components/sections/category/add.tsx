'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useAddSubCategoryMutation,
  useUpdateSubCategoryNameMutation,
} from '@/features/api/categorySlice';
import InputForm from '@/components/form/InputForm';
import DropDownForm from '@/components/form/DropDownForm';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { getCategoryOptions } from '@/utils/categoryUtils';

const formSchema = z.object({
  categoryId: z.string({
    required_error: 'Please select a category',
  }),
  name: z.string().min(2, {
    message: 'Subcategory name must be at least 2 characters.',
  }),
});

type FormData = z.infer<typeof formSchema>;

interface AddSubcategoryProps {
  children: React.ReactNode;
  mode?: 'add' | 'edit';
  initialData?: {
    categoryId?: string;
    name?: string;
    id?: string;
  };
}

export function AddSubcategory({
  children,
  mode = 'add',
  initialData,
}: AddSubcategoryProps) {
  const [open, setOpen] = useState(false);
  const [addSubCategory] = useAddSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryNameMutation();
  const { data: metaData, refetch } = useGetMetaQuery({});

  const categoryOptions = getCategoryOptions(metaData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      name: initialData?.name || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (mode === 'add') {
        await addSubCategory({
          id: data.categoryId,
          subCategoryName: data.name,
        }).unwrap();
        refetch();
        toast.success('Subcategory added successfully');
      } else {
        if (initialData?.id) {
          await updateSubCategory({
            id: initialData.id,
            name: data.name,
          }).unwrap();
          refetch();
          toast.success('Subcategory updated successfully');
        }
      }
      reset();
      setOpen(false);
    } catch (error) {
      console.log('error: ', error);
      toast.error(
        mode === 'add'
          ? 'Failed to add subcategory'
          : 'Failed to update subcategory'
      );
    }
  };

  const handleCategorySelect = (value: string) => {
    setValue('categoryId', value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Subcategory' : 'Edit Subcategory'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'add' && (
            <DropDownForm
              label="Category"
              options={categoryOptions}
              onSelect={handleCategorySelect}
              defaultValue={initialData?.categoryId}
              required
              error={errors.categoryId?.message}
            />
          )}

          <InputForm
            label="Subcategory Name"
            placeholder="Enter subcategory name"
            required
            register={register('name')}
            error={errors.name?.message}
          />

          <Button type="submit" className="w-full">
            {mode === 'add' ? 'Add Subcategory' : 'Update Subcategory'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
