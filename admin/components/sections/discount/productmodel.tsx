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
import { useGetAllProductsQuery } from '@/features/api/productSlice';
import MultiselectForm from '@/components/form/MultiselectForm';
import { ProductDiscountProps } from '@/types';
import { Option } from '@/components/ui/multiselect';

//import { useGetMetaQuery } from '@/features/api/metaSlice';
//import { getCategoryOptions } from '@/utils/categoryUtils';

const productDiscountSchema = z.object({
  discountName: z.string().min(1, 'Discount name is required'),
  productId: z.array(z.string()).min(1, 'At least one product is required'),
  unitDiscount: z
    .number()
    .min(0, 'Unit discount must be at least 0')
    .max(100, 'Unit discount cannot exceed 100'),
  packDiscount: z
    .number()
    .min(0, 'Pack discount must be at least 0')
    .max(100, 'Pack discount cannot exceed 100')
    .optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

type ProductDiscountFormValues = z.infer<typeof productDiscountSchema>;

export function ProductDiscount({
  children,
  mode = 'add',
  title = 'Add Product Discount',
  description = 'Add a new product-based discount.',
  defaultValues,
}: ProductDiscountProps) {
  const [open, setOpen] = useState(false);
  const { refetch: refetchDiscounts } = useGetDiscountsQuery({});
  const [addDiscount] = useAddDiscountMutation();
  const { data: products } = useGetAllProductsQuery({
    page: 1,
    limit: 100,
  });

  const productOptions = products?.map((product: any) => ({
    label: product.name,
    value: product._id,
  })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductDiscountFormValues>({
    resolver: zodResolver(productDiscountSchema),
    defaultValues: {
      discountName: defaultValues?.discountName || '',
      productId: defaultValues?.productId?.map((item: any) => item._id) || [],
      unitDiscount: defaultValues?.unitDiscount || 0,
      packDiscount: defaultValues?.packDiscount || 0,
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
    },
  });

  const [selectedProducts, setSelectedProducts] = useState<Option[]>(
    defaultValues?.productId?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || []
  );

  const onSubmit = async (data: ProductDiscountFormValues) => {
    try {
      await addDiscount({
        discountName: data.discountName,
        discountType: 'product',
        productId: data.productId,
        unitDiscount: data.unitDiscount,
        packDiscount: data.packDiscount || 0,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: true,
      }).unwrap();

      toast.success(
        `Product discount ${mode === 'add' ? 'added' : 'updated'} successfully`
      );
      await refetchDiscounts();
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product discount');
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
              label="Products"
              options={productOptions}
              onSelect={(value) => {
                setSelectedProducts(value);
                reset({
                  ...defaultValues,
                  productId: value.map((item) => item.value),
                });
              }}
              defaultValue={selectedProducts}
              error={errors.productId?.message}
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
                  ? 'Add Product Discount'
                  : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDiscount;
