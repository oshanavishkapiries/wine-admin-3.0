'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFormValues, categorySchema } from '@/lib/validations/category';
import { toast } from 'sonner';
import InputForm from '@/components/form/InputForm';

import { useGetMetaQuery } from '@/features/api/metaSlice';
import {
  useAddSubCategoryMutation,
  useUpdateCategoryMarginMutation,
  useUpdateSubCategoryNameMutation,
} from '@/features/api/categorySlice';
import Dropdown from '@/components/form/DropDownForm';
import { CategoryPopupProps } from '@/types';

export function CategoryPopup({
  children,
  mode = 'add',
  title = 'Add Category',
  description = 'Add a new category to your collection.',
  defaultValues,
}: CategoryPopupProps) {
  const [open, setOpen] = useState(false);
  const { data: metaData, refetch: refetchMeta } = useGetMetaQuery({});

  // API mutations
  const [addSubCategory] = useAddSubCategoryMutation();
  const [updateSubCategoryName] = useUpdateSubCategoryNameMutation();
  const [updateCategoryMargin] = useUpdateCategoryMarginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: defaultValues?.categoryId || '',
      subCategoryName: defaultValues?.subCategoryName || '',
      margin: defaultValues?.margin || 0,
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (mode === 'add') {
        await addSubCategory({
          id: data.categoryId,
          subCategoryName: data.subCategoryName,
        }).unwrap();

        if (data.margin) {
          await updateCategoryMargin({
            id: data.categoryId,
            margin: data.margin,
          }).unwrap();
        }

        toast.success('Category added successfully');
      } else {
        if (defaultValues?.subCategoryName !== data.subCategoryName) {
          await updateSubCategoryName({
            id: defaultValues?.id!,
            name: data.subCategoryName,
          }).unwrap();
        }

        if (defaultValues?.margin !== data.margin) {
          await updateCategoryMargin({
            id: data.categoryId,
            margin: data.margin,
          }).unwrap();
        }

        toast.success('Category updated successfully');
      }

      // Refresh meta data
      await refetchMeta();
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to save changes');
    }
  };

  const getCategoryOptions = () => {
    const categories: any[] = metaData?.data?.wineCategories || [];
    return categories.map((category: any) => ({
      label: category.name,
      value: category._id,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Dropdown
              disabled={mode === 'edit'}
              label="Category"
              options={getCategoryOptions()}
              onSelect={(value) => setValue('categoryId', value)}
              error={errors.categoryId?.message}
              defaultValue={defaultValues?.categoryId}
              required
            />

            <InputForm
              label="Sub Category Name"
              placeholder="Enter sub category name"
              type="text"
              register={register('subCategoryName')}
              error={errors.subCategoryName?.message}
              required
            />

            <InputForm
              label="Profit Margin (%)"
              placeholder="Enter profit margin"
              type="number"
              register={register('margin', { valueAsNumber: true })}
              error={errors.margin?.message}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : mode === 'add' ? 'Add Category' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryPopup;