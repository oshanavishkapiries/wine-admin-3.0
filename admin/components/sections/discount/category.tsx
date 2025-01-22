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
import { toast } from 'sonner';
import InputForm from '@/components/form/InputForm';
import { z } from 'zod';
import {
  useAddDiscountMutation,
  useGetDiscountsQuery,
} from '@/features/api/discountSlice';

import { useGetMetaQuery } from '@/features/api/metaSlice';
import MultiselectForm from '@/components/form/MultiselectForm';
import { getCategoryOptions } from '@/utils/categoryUtils';
import { CategoryDiscountProps } from '@/types';
import { Option } from '@/components/ui/multiselect';

const categoryDiscountSchema = z.object({
  discountName: z.string().min(1, 'Discount name is required'),
  categoryId: z.array(z.string()).min(1, 'At least one category is required'),
  unitDiscount: z
    .number()
    .min(0, 'Unit discount must be at least 0')
    .max(100, 'Unit discount cannot exceed 100'),
  packDiscount: z
    .number()
    .min(0, 'Pack discount must be at least 0')
    .max(100, 'Pack discount cannot exceed 100'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

type CategoryDiscountFormValues = z.infer<typeof categoryDiscountSchema>;



export function CategoryDiscount({
  children,
  mode = 'add',
  title = 'Add Category Discount',
  description = 'Add a new category-based discount.',
  defaultValues,
}: CategoryDiscountProps) {
  const [open, setOpen] = useState(false);
  const { refetch: refetchDiscounts } = useGetDiscountsQuery({});
  const [addDiscount] = useAddDiscountMutation();
  const { data: metaData } = useGetMetaQuery({});

  const categoryOptions = getCategoryOptions(metaData);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryDiscountFormValues>({
    resolver: zodResolver(categoryDiscountSchema),
    defaultValues: {
      discountName: defaultValues?.discountName || '',
      categoryId: defaultValues?.categoryId?.map((item) => item._id) || [],
      unitDiscount: defaultValues?.unitDiscount || 0,
      packDiscount: defaultValues?.packDiscount || 0,
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
    },
  });

  const [selectedCategories, setSelectedCategories] = useState<Option[]>(
    defaultValues?.categoryId?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || []
  );




  const onSubmit = async (data: CategoryDiscountFormValues) => {
    console.log('data', data);

    try {
      const response = await addDiscount({
        discountName: data.discountName,
        discountType: 'category',
        categoryId: data.categoryId,
        unitDiscount: data.unitDiscount,
        packDiscount: data.packDiscount,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: true,
      });
      console.log(response);
      toast.success(
        `Category discount ${mode === 'add' ? 'added' : 'updated'} successfully`
      );
      await refetchDiscounts();
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to save category discount');
    }
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
            <InputForm
              label="Discount Name"
              placeholder="Enter discount name"
              register={register('discountName')}
              error={errors.discountName?.message}
              required
            />

            <MultiselectForm
              label="Categories"
              options={categoryOptions}
              onSelect={(value) => {
                setSelectedCategories(value);
                reset({
                  ...defaultValues,
                  categoryId: value.map((item) => item.value),
                });
              }}
              defaultValue={selectedCategories}
              error={errors.categoryId?.message}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="Unit Discount (%)"
                type="number"
                placeholder="0"
                register={register('unitDiscount', { valueAsNumber: true })}
                error={errors.unitDiscount?.message}
                required
              />

              <InputForm
                label="Pack Discount (%)"
                type="number"
                placeholder="0"
                register={register('packDiscount', { valueAsNumber: true })}
                error={errors.packDiscount?.message}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="Start Date"
                type="date"
                register={register('startDate')}
                error={errors.startDate?.message}
                required
              />

              <InputForm
                label="End Date"
                type="date"
                register={register('endDate')}
                error={errors.endDate?.message}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : mode === 'add'
                  ? 'Add Category Discount'
                  : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryDiscount;

