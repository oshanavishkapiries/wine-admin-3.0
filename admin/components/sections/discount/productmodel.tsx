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
import InputForm from '@/components/form/InputForm';
import { z } from 'zod';

//import { useGetMetaQuery } from '@/features/api/metaSlice';
//import { getCategoryOptions } from '@/utils/categoryUtils';

import { ProductFormProps } from '@/types';

const productSchema = z.object({
  description: z.string().optional(),
  productId: z.array(z.string()).min(1, 'At least one category is required'),
  discountName: z.string().min(1, 'Discount name is required'),
  unitDiscount: z
    .number()
    .min(0, 'Unit discount must be at least 0')
    .optional(),
  packDiscount: z
    .number()
    .min(0, 'Pack discount must be at least 0')
    .optional(),
  startDate: z.string().min(1, 'Start date is required').optional(),
  endDate: z.string().min(1, 'End date is required').optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductModel({
  children,
  mode = 'add',
  title = 'Add Product',
  description = 'Add a new product.',
  defaultValues,
}: ProductFormProps) {
  const [open, setOpen] = useState(false);

  //const { data: metaData } = useGetMetaQuery({});

  //const categoryOptions = getCategoryOptions(metaData);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    //reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      discountName: defaultValues?.discountName || '',
      productId: defaultValues?.productId?.map((item) => item._id) || [],
      unitDiscount: defaultValues?.unitDiscount || 0,
      packDiscount: defaultValues?.packDiscount || 0,
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
    },
  });

  const onSubmit = async (data: ProductFormValues) => {

    console.log("data" , data)
    // try {
    //   const response = await addProduct({
    //     productName: data.productName,
    //     categoryId: data.categoryId,
    //     price: data.price,
    //     stock: data.stock,
    //     description: data.description,
    //   });
    //   console.log(response);
    //   toast.success(`Product ${mode === 'add' ? 'added' : 'updated'} successfully`);
    //   await refetchProducts();
    //   setOpen(false);
    //   reset();
    // } catch (error) {
    //   console.log(error);
    //   toast.error('Failed to save product');
    // }
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
                  ? 'Add Product'
                  : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModel;
