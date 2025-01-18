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
import { PromoCodeProps } from '@/types';

const promoCodeSchema = z.object({
  discountName: z.string().min(1, 'Discount name is required'),
  code: z.string().min(1, 'Promo code is required'),
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

type PromoCodeFormValues = z.infer<typeof promoCodeSchema>;

export function Promocode({
  children,
  mode = 'add',
  title = 'Add Promo Code',
  description = 'Add a new promotional code discount.',
  defaultValues,
}: PromoCodeProps) {
  const [open, setOpen] = useState(false);
  const { refetch: refetchDiscounts } = useGetDiscountsQuery({});
  const [addDiscount] = useAddDiscountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PromoCodeFormValues>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      discountName: defaultValues?.discountName || '',
      code: defaultValues?.code || '',
      unitDiscount: defaultValues?.unitDiscount || 0,
      packDiscount: defaultValues?.packDiscount || 0,
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
    },
  });

  const onSubmit = async (data: PromoCodeFormValues) => {
    try {
      const response = await addDiscount({
        discountName: data.discountName,
        discountType: 'promotion',
        code: data.code,
        unitDiscount: data.unitDiscount,
        packDiscount: data.packDiscount,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: true,
      });
      console.log(response);
      toast.success(
        `Promo code ${mode === 'add' ? 'added' : 'updated'} successfully`
      );
      await refetchDiscounts();
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to save promo code');
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

            <InputForm
              label="Promo Code"
              placeholder="Enter promo code"
              register={register('code')}
              error={errors.code?.message}
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
                  ? 'Add Promo Code'
                  : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Promocode;
